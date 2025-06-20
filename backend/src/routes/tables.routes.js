import { Router } from "express";
import {ownerVerfication} from "../middlewares/userVerification.middleware.js";
import { addTableHandler, deleteTableHandler, getTableHandler } from "../controllers/tables.controller.js";
import {tableValidator} from "../middlewares/validators.middleware.js";

const router = Router()


// router.use(ownerVerfication)
router.post("/restaurants/:id/tables", ownerVerfication, tableValidator, addTableHandler)
router.get("/restaurants/:id/tables", ownerVerfication, getTableHandler)
router.delete("/tables/:id", ownerVerfication, deleteTableHandler)


export default router