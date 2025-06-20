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

export const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());

// AUTHENTICATION
app.use("/api/auth", authRoutes)

// ------- Protected Routes -----------
app.use(jwtVerify)

// Restaurant
app.use("/api", restaurantRoutes)

// Tables
app.use("/api", tableRoutes)

// Reservations
app.use("/api", reservationRoutes)




app.get("/api/auth/me", (req, res) => {
    const { name, email } = req.user

    return res.status(200).send({
        name,
        email
    })
})


app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
})
