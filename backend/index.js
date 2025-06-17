import express from "express"
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import jwtVerify from './src/middlewares/jwtVerify.js';
import authRoutes from './src/routes/auth.routes.js'

export const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())

// AUTHENTICATION

app.use("/api/auth", authRoutes)

// Protected Routes
app.use(jwtVerify)

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
