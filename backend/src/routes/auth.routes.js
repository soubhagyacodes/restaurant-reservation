import { Router} from 'express';
import 'dotenv/config'
import { loginValidator, registerValidator } from "../middlewares/validators.middleware.js";
import { loginController, registerController } from "../controllers/auth.controller.js";
import passport from 'passport';
import { generateJWT } from '../services/auth.service.js';


const router = Router()

router.post("/register", registerValidator, registerController)
router.post("/login", loginValidator , loginController)
router.get("/google", passport.authenticate("google", { session: false, scope: ['profile', 'email'] }))
router.get("/google/callback", passport.authenticate("google", { session: false}), (request, response) => {
    const user = request.user

    const token = generateJWT(user)
    return response.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).redirect(`${process.env.CLIENT_URL_PROD}/restaurants`)
})



export default router