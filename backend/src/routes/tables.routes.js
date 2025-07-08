import { Router } from "express";
import {ownerVerfication} from "../middlewares/userVerification.middleware.js";
import { addTableHandler, deleteTableHandler, getTableHandler, patchTableHandler } from "../controllers/tables.controller.js";
import {patchTableValidator, tableValidator} from "../middlewares/validators.middleware.js";

const router = Router()


// router.use(ownerVerfication)
router.post("/restaurants/:id/tables", ownerVerfication, tableValidator, addTableHandler)
router.get("/restaurants/:id/tables", ownerVerfication, getTableHandler)
router.delete("/tables/:id", ownerVerfication, deleteTableHandler)
router.patch("/tables/:id", ownerVerfication, patchTableValidator, patchTableHandler)

export default router