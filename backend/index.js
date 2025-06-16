import { PrismaClient } from './generated/prisma/index.js'
import express, { response } from "express"
import 'dotenv/config'
import bcrypt from "bcryptjs";
import { body, matchedData, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import jwtVerify from './middlewares/jwtVerify.js';

const prisma = new PrismaClient()

export const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())

// AUTHENTICATION
app.post("/api/register", 
    [
    body("name")
        .exists().withMessage("name is Missing")
        .isString().withMessage("name must be a string")
        .notEmpty().withMessage("name must not be empty")
        .trim(),

    body("email")
        .exists().withMessage("email is Missing")
        .isString().withMessage("email must be a string")
        .notEmpty().withMessage("email must not be empty")
        .isEmail().withMessage("email's passed value is not an email")
        .trim(),

    body("passwordHash")
        .exists().withMessage("password is missing")
        .isString().withMessage("password must be a string")
        .notEmpty().withMessage("password must not be empty")
        .isStrongPassword({minLength: 8, minLowercase: 2, minUppercase: 2, minNumbers: 2, minSymbols: 1}).withMessage("Password must be strong with 2{a-z} 2{A-Z} 2{0-9} 2{!@#$%^&*()_+;'} and minimum length of 8"),

    body("role")
        .exists().withMessage("role is Missing")
        .isString().withMessage("role must be a string")
        .notEmpty().withMessage("role must not be empty")
        .trim()
        .custom(value => {
            const upperValue = value.toUpperCase()
            if(upperValue === "OWNER" || upperValue === "CUSTOMER")
                return true
            else{
                throw false
            }
        }).withMessage("role must be an owner or a customer")
        .toUpperCase(),
    ],
    async (request, response) => {
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
        const hashedPass = await bcrypt.hash(rawData.passwordHash, 10);

        const data = {
            ...rawData,
            passwordHash: hashedPass,
        }

        await prisma.user.create({
            data: data
        })
        console.log(`User Registered ${JSON.stringify(data)}`)
        return response.status(200).send({"status": "Registered"})
    } 
    catch (e) {
        return response.status(400).send({"status": "Something's Wrong", "error": e.message})
    }

});

app.post("/api/login", 
    [
        body("email")
            .exists().withMessage("email is Missing")
            .isString().withMessage("email must be a string")
            .notEmpty().withMessage("email must not be empty")
            .isEmail().withMessage("email's passed value is not an email"),
        body("password")
            .exists().withMessage("password is missing")
            .isString().withMessage("password must be a string")
    ]
    ,async (request, response) => {
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

            const comparePass = await bcrypt.compare(data.password, foundUser.passwordHash) 
            if(comparePass){
                const payload = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    role: foundUser.role
                }
                var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

                return response.cookie("jwt", token, {
                    maxAge: (60*60*5) * 1000, 
                    httpOnly: true,
                }).status(200).send({"msg": "Logged in."})
            }

            return response.status(400).send({"msg": "wrong password"})
        } 
        catch (e) {
            console.log(e)
            return response.status(400).send({"msg": "something went wrong. try again."})
        }
})

app.use(jwtVerify)

app.get("/api/me", (req, res) => {
    return res.status(200).send({
        name: req.user.name,
        email: req.user.email
    })
})


app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
})
