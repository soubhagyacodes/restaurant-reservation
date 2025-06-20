import { Router } from "express";   
import { customerVerification } from "../middlewares/userVerification.middleware.js";
import { reservationValidator } from "../middlewares/validators.middleware.js";
import { createReservationHandler, deleteReservationHandler, tableReservationsHandler, viewReservationHandler } from "../controllers/reservations.controller.js";

const router = Router()

// router.use(customerVerification)
router.post("/reservations", customerVerification, reservationValidator, createReservationHandler)
router.get("/reservations",customerVerification,  viewReservationHandler)
router.delete("/reservations/:id", customerVerification, deleteReservationHandler)
router.get("/reservations/table/:id", customerVerification, tableReservationsHandler) // Reservations of a table


export default router
