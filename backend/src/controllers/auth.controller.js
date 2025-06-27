import { matchedData, validationResult } from 'express-validator';
import { comparePassword, generateJWT, registerUser } from '../services/auth.service.js';
import prisma from '../../prisma/client.js';

const registerController = async (request, response) => {
        const result = validationResult(request)

        if(!result.isEmpty()){
            return response.status(400).send({"msg": "Data not Accurate", "violations": result.mapped()})
        }

        const rawData = matchedData(request);

        /* 
            name: string;
            email: string;
            passwordHash: string;
            role: "CUSTOMER" || "OWNER"
        */ 

   try {
       const existing = await prisma.user.findFirst({ where: {AND:[{ email: rawData.email }, {NOT: {passwordHash: null}}, {role: rawData.role}]} });
       if (existing) throw new Error("UserExists");
       
        const user = await registerUser(rawData)
        console.log(`User Registered ${JSON.stringify(user)}`)
        return response.status(200).send({"msg": "Registered", "user": user})
    } 
    catch (e) {
        if(e.message === "UserExists"){
            return response.status(400).send({"msg": "The User Already Exists."})
        }
        return response.status(500).send({"msg": "Something's Wrong", "error": e.message})
    }

}

const loginController = async (request, response) => {
        const result = validationResult(request)

        if(!result.isEmpty()){
            return response.status(400).send({"msg": "Data not Accurate", "violations": result.mapped()})
        }

        try {
            const data = matchedData(request)

            const foundUser = await prisma.user.findUnique({
                where: {
                    email_role: {
                        email: data.email,
                        role: data.role
                    }
                }
            })

            if(!foundUser){
                return response.status(404).send({"msg": "Email not Registered"})
            }

            if(!foundUser.passwordHash){
                return response.status(404).send({"msg": "You registered as a Google user. Continue with Google."})
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
                }).status(200).send({"msg": "Logged In."})
            }

            return response.status(400).send({"msg": "Wrong Password or Wrong Role"})
        } 
        catch (e) {
            console.log(e)
            return response.status(500).send({"msg": "Something Went Wrong. Try Again."})
        }
}

export { registerController, loginController }