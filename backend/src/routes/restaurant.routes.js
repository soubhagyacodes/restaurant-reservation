import { Router } from "express";
import {ownerVerfication} from "../middlewares/userVerification.middleware.js";
import { createRestaurantHandler, getRestaurantByIDHandler, restaurantsOfUserHandler, putRestaurantByIDHandler, deleteRestaurantByIDHandler } from "../controllers/restaurant.controller.js";
import { restaurantValidator } from "../middlewares/validators.middleware.js";

const router = Router()

// router.use(ownerVerfication)
router.post("/restaurants", ownerVerfication, restaurantValidator, createRestaurantHandler)
router.get("/restaurants/:id", ownerVerfication, getRestaurantByIDHandler)
router.get("/my-restaurants", ownerVerfication, restaurantsOfUserHandler)
router.put("/restaurants/:id",ownerVerfication, restaurantValidator, putRestaurantByIDHandler)
router.delete("/restaurants/:id",ownerVerfication, restaurantValidator, deleteRestaurantByIDHandler)



export default router