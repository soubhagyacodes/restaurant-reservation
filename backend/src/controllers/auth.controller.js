import { matchedData, validationResult } from 'express-validator';
import { comparePassword, generateJWT, registerUser } from '../services/auth.service.js';
import prisma from '../../prisma/client.js';

const registerController = async (request, response) => {
        const result = validationResult(request)

        if(!result.isEmpty()){
            return response.status(400).send({"status": "Data not accurate", "violations": result.mapped()})
        }

        const rawData = matchedData(request);

        /* 
            name: string;
            email: string;
            passwordHash: string;
            role: "CUSTOMER" || "OWNER"
        */ 

   try {
       const existing = await prisma.user.findFirst({ where: {AND:[{ email: rawData.email }, {NOT: {passwordHash: null}}]} });
       if (existing) throw new Error("UserExists");
       
        const user = await registerUser(rawData)
        console.log(`User Registered ${JSON.stringify(user)}`)
        return response.status(200).send({"status": "Registered", "user": user})
    } 
    catch (e) {
        return response.status(500).send({"status": "Something's Wrong", "error": e.message})
    }

}

const loginController = async (request, response) => {
        const result = validationResult(request)

        if(!result.isEmpty()){
            return response.status(400).send({"status": "Data not accurate", "violations": result.mapped()})
        }

        try {
            const data = matchedData(request)

            const foundUser = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            })

            if(!foundUser){
                return response.status(404).send({"msg": "email not registered"})
            }

            const comparePass = await comparePassword(data.password, foundUser.passwordHash)
            const compareRole = data.role == foundUser.role ? true : false
            if(comparePass && compareRole){

                const { id, name, role, email} = foundUser

                const payload = {
                    id,
                    name,
                    email,
                    role
                }
                var token = generateJWT(payload)

                return response.cookie("jwt", token, {
                    maxAge: (60*60*5) * 1000, 
                    httpOnly: true,
                }).status(200).send({"msg": "Logged in."})
            }

            return response.status(400).send({"msg": "wrong password or role"})
        } 
        catch (e) {
            console.log(e)
            return response.status(500).send({"msg": "something went wrong. try again."})
        }
}

export { registerController, loginController }