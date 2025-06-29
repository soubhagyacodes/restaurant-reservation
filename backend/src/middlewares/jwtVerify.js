import jwt from "jsonwebtoken";
import prisma from "../../prisma/client.js";
import 'dotenv/config'



function jwtVerify(request, response, next){
    return jwt.verify(request.cookies.jwt, process.env.JWT_SECRET, async function(err, decoded) {
        if(decoded){
            const found = await prisma.user.findUnique({
                where: {
                    email_role: {
                        email: decoded.email,
                        role: decoded.role
                    }
                }
            })

            if(!found){
                return response.status(401).send({"msg": "Unauthorized"})
            }

            request.user = decoded
            return next()  
        }

        return response.status(400).send({"msg": "You're Not Authorised, Login Again", "devError": "JWT unverified or doesn't exist"})
    });
}

export default jwtVerify