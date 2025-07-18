import { matchedData, validationResult } from "express-validator"
import { createRestaurant, findOwnerRestaurant, findRestaurant, updateRestaurant } from "../services/restaurant.service.js"
import prisma from "../../prisma/client.js"

async function createRestaurantHandler(request, response) {
    const data = matchedData(request)

    /*
        name: string,
        location: string,
        description: string?
    */

    const result = validationResult(request)

    if (!result.isEmpty()) {
        return response.status(400).send({ "msg": "Invalid data", "violations": result.mapped() })
    }

    try {
        const newRestaurant = await createRestaurant({ ...data, ownerId: request.user.id })

        return response.status(200).send(newRestaurant)

    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "Something went wrong while creating the Restaurant" })
    }
}


async function getRestaurantByIDHandler(request, response) {
    try {
        const restaurantFound = await findRestaurant(request.params.id)

        if (restaurantFound) return response.status(200).send(restaurantFound)

        return response.status(404).send({ "msg": "Restaurant Not Found" })
    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "Something went wrong when finding the restaurant" })
    }
}

async function getOwnerRestaurantByIDHandler(request, response) {
    try {
        const restaurantData = await findOwnerRestaurant(request.params.id)

        if (restaurantData) return response.status(200).send(restaurantData)

        return response.status(404).send({ "msg": "Restaurant Not Found" })
    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "Something went wrong when finding the restaurant for owner" })
    }
}



async function restaurantsOfUserHandler(request, response) {
    try {
        const restaurantsFound = await prisma.restaurant.findMany({
            where: {
                ownerId: request.user.id
            },
            include: {
                _count: true,
                tables: {
                    select: {
                        isAvailable: true,
                        reservationHistory: {
                            select: {
                                reservationTime: true,
                                status: true
                            }
                        }
                    }
                },
            }
        })

        if (restaurantsFound) return response.status(200).send(restaurantsFound)

        return response.status(404).send({ "msg": "Restaurants Not Found" })
    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "Something went wrong when finding the restaurants of the user" })
    }
}

async function putRestaurantByIDHandler(request, response){
    const data = matchedData(request)

    /*
        name: string,
        location: string,
        description: string?
    */

    const result = validationResult(request)

    if (!result.isEmpty()) {
        return response.status(400).send({ "msg": "Invalid Data", "violations": result.mapped() })
    }

    try {
        const updatedRestaurant = await updateRestaurant(request.params.id, data)

        return response.status(200).send(updatedRestaurant)

    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "Something went wrong while updating the restaurant" })
    }
}

async function deleteRestaurantByIDHandler(request, response){
    try {
        const deleted = await prisma.restaurant.delete({
            where:{
                id: request.params.id
            }
        })
        return response.status(200).send({"msg": "Successfully removed the Restaurant", "restaurant": deleted})
    } catch (error) {
        if(error.code === "P2025"){

            return response.status(400).send({"msg": "Restaurant Not Found"})
        }
        return response.status(500).send({"msg": "Something went wrong while deleting the restaurant"})
        
    }
    
}

async function getAllRestaurantHandler(request, response){
    try {
        const restaurants = await prisma.restaurant.findMany({
            where:{
            },
            include: {
                tables: true
            },
            orderBy: {
                tables: {
                    _count: 'desc'
                }
            }
        })
        return response.status(200).send(restaurants)
    } catch (error) {
        console.log(error)
        return response.status(500).send({"msg": "Something went wrong while getting all the restaurants"})   
    }
    
}


export { createRestaurantHandler, getRestaurantByIDHandler, restaurantsOfUserHandler, putRestaurantByIDHandler, deleteRestaurantByIDHandler, getAllRestaurantHandler, getOwnerRestaurantByIDHandler }