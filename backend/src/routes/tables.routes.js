import { Router } from "express";
import ownerVerfication from "../middlewares/ownerVerification.middleware.js";
import { addTableHandler } from "../controllers/tables.controller.js";
import {tableValidator} from "../middlewares/validators.middleware.js";

const router = Router()


router.use(ownerVerfication)
router.post("/restaurants/:id/tables", tableValidator, addTableHandler)


export default router