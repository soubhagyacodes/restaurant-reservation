import { Router } from "express";
import ownerVerfication from "../middlewares/ownerVerification.middleware.js";
import { createRestaurantHandler, getRestaurantByIDHandler, restaurantsOfUserHandler, putRestaurantByIDHandler, deleteRestaurantByIDHandler } from "../controllers/restaurant.controller.js";
import { restaurantValidator } from "../middlewares/validators.middleware.js";

const router = Router()

router.use(ownerVerfication)
router.post("/restaurants", restaurantValidator, createRestaurantHandler)
router.get("/restaurants/:id", getRestaurantByIDHandler)
router.get("/my-restaurants", restaurantsOfUserHandler)
router.put("/restaurants/:id",restaurantValidator, putRestaurantByIDHandler)
router.delete("/restaurants/:id",restaurantValidator, deleteRestaurantByIDHandler)



export default router