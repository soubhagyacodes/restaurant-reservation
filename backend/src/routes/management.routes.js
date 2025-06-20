import { Router } from "express";
import { ownerVerfication } from "../middlewares/userVerification.middleware.js";
import { listReservationHandler, updateStatusHandler } from "../controllers/management.controller.js";
import { statusValidator } from "../middlewares/validators.middleware.js";

const router = Router()


router.get("/restaurant/:id/reservations", ownerVerfication, listReservationHandler)
router.patch("/reservations/:id", ownerVerfication, statusValidator, updateStatusHandler)


export default router