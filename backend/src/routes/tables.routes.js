import { Router } from "express";
import ownerVerfication from "../middlewares/ownerVerification.middleware.js";
import { addTableHandler, deleteTableHandler, getTableHandler } from "../controllers/tables.controller.js";
import {tableValidator} from "../middlewares/validators.middleware.js";

const router = Router()


router.use(ownerVerfication)
router.post("/restaurants/:id/tables", tableValidator, addTableHandler)
router.get("/restaurants/:id/tables", getTableHandler)
router.delete("/tables/:id", deleteTableHandler)


export default router