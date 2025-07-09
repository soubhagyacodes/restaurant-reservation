import express from "express"
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import jwtVerify from './src/middlewares/jwtVerify.js';
import authRoutes from './src/routes/auth.routes.js'
import passport from "passport";
import './src/services/oauth-strategy.js'
import restaurantRoutes from './src/routes/restaurant.routes.js'
import tableRoutes from './src/routes/tables.routes.js'
import reservationRoutes from './src/routes/reservations.routes.js'
import managementRoutes from './src/routes/management.routes.js'
import cors from 'cors'
import { sendMail } from "./src/services/mail.service.js";
import { mailValidator } from "./src/middlewares/validators.middleware.js";
import { matchedData, validationResult } from "express-validator";


const app = express()
const port = process.env.PORT || 3000

const isProd = process.env.NODE_ENV === "production";

app.use(cors({
    origin: isProd ? process.env.CLIENT_URL_PROD : "http://localhost:5173",
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());

// AUTHENTICATION
app.use("/api/auth", authRoutes)

// ----------------------------------- PROTECTED -----------------------------------------------------------------
app.use(jwtVerify)

// Restaurant
app.use("/api", restaurantRoutes)

// Tables
app.use("/api", tableRoutes)

// Reservations
app.use("/api", reservationRoutes)

// Management of Reservations
app.use("/api", managementRoutes)




app.get("/api/auth/me", (req, res) => {
    const { id, name, email, role } = req.user

    return res.status(200).send({
        id,
        name,
        email,
        role
    })
})

app.post("/mail", mailValidator ,  async (req, res) => {
    const { email } = req.user

    const data = matchedData(req)
    const result = validationResult(req)

    if(result.array().length != 0){
        return res.status(400).send({"msg": "Data Not Accurate", "violations": result.array()})
    }

    try {
        await sendMail(email, data)
        return res.status(200).send({"msg": "Mail Sent Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({"msg": "Something went wrong when sending the mail"})
    }
})


app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
})
