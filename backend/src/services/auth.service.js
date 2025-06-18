import prisma from "../../prisma/client.js";
import bcrypt from "bcryptjs";
import 'dotenv/config'
import jwt from "jsonwebtoken"

async function registerUser(rawDataObject){

    const hashedPass = await bcrypt.hash(rawDataObject.passwordHash, 10);

    const data = {
        ...rawDataObject,
        passwordHash: hashedPass,
    }

    const newUser = await prisma.user.upsert({
        where: {email: rawDataObject.email},
        update: {passwordHash: hashedPass},
        create: data
    })

    const { id, name, role, email} = newUser

    return {
        id,
        name, 
        role,
        email
    }
}

async function comparePassword(password, hashedPassword){
    const comparePass = await bcrypt.compare(password, hashedPassword)

    return comparePass
}

function generateJWT(payload){
    var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return token
}

export { registerUser, comparePassword, generateJWT }