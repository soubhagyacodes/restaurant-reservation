import { Router } from 'express';
import 'dotenv/config'
import { loginValidator, registerValidator } from "../middlewares/validators.middleware.js";
import { loginController, registerController } from "../controllers/auth.controller.js";

const router = Router()

router.post("/register", registerValidator, registerController)
router.post("/login", loginValidator , loginController)

export default router