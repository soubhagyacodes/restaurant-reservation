import { Router } from "express";   
import { customerVerification, ownerVerfication } from "../middlewares/userVerification.middleware.js";
import { reservationValidator } from "../middlewares/validators.middleware.js";
import { cancelReservationHandler, createReservationHandler, tableReservationsHandler, viewReservationHandler } from "../controllers/reservations.controller.js";

const router = Router()

// router.use(customerVerification)
router.post("/reservations", customerVerification, reservationValidator, createReservationHandler)
router.get("/reservations",customerVerification,  viewReservationHandler)
router.get("/reservations/:id", customerVerification,  cancelReservationHandler) // Cancel Reservation
router.get("/reservations/table/:id", ownerVerfication, tableReservationsHandler) // Reservations of a table


export default router
