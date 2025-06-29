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


export const app = express()
const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173',
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


app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
})
