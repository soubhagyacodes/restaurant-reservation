import jwt from "jsonwebtoken";
import { PrismaClient } from '../generated/prisma/index.js'
import 'dotenv/config'


const prisma = new PrismaClient()

function jwtVerify(request, response, next){
    return jwt.verify(request.cookies.jwt, process.env.JWT_SECRET, async function(err, decoded) {
        if(decoded){

            request.user = decoded
            return next()  
        }

        console.log(err)
        return response.status(400).send({"msg": "Perhaps JWT expired, Login Again"})
    });
}

export default jwtVerify