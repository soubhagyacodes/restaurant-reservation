import jwt from "jsonwebtoken";
import prisma from "../../prisma/client.js";
import 'dotenv/config'



function jwtVerify(request, response, next){
    return jwt.verify(request.cookies.jwt, process.env.JWT_SECRET, async function(err, decoded) {
        if(decoded){
            const found = await prisma.user.findUnique({
                where: {
                    email: decoded.email
                }
            })

            if(!found){
                return response.status(401).send({"msg": "Unauthorized"})
            }

            request.user = decoded
            return next()  
        }

        return response.status(400).send({"msg": "You're Not Authorised, Login Again"})
    });
}

export default jwtVerify