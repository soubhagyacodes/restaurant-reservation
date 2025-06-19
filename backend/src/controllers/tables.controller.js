import { matchedData, validationResult } from "express-validator"
import prisma from "../../prisma/client.js"
import { findRestaurant } from "../services/restaurant.service.js"
import { createTable } from "../services/tables.service.js"

async function addTableHandler(request, response) {
    //   tableNumber Int (should be unique)
    //   seats       Int
    //   isAvailable Boolean
    //   restaurantId String
    try {
        const restaurantFound = await findRestaurant(request.params.id)

        if (!restaurantFound) return response.status(400).send({ "msg": "Restaurant with given id not found." })
    } catch (error) {
        console.log(error)
        return response.status(400).send({ "msg": "something went wrong when finding the restaurant." })
    }

    const data = matchedData(request)

    const result = validationResult(request)

    if (!result.isEmpty()) {
        return response.status(400).send({ "msg": "Invalid data", "violations": result.mapped() })
    }

    try {
        console.log(data)
        const tableExists = await prisma.restaurant.findFirst({
            where: {
                tables: {
                    some: {
                        tableNumber: parseInt(data.tableNumber)
                    }
                }
            }
        })

        if (tableExists) return response.status(400).send({ "msg": "this table number already exists in the restaurant." })
    } catch (error) {
        console.log(error)
        return response.status(400).send({ "msg": "something went wrong when verifying that the table number doesn't exist." })
    }
    /*
        tableNumber Int (should be unique)
        seats       Int
        isAvailable Boolean
    */

    try {
        const newTable = await createTable(request.params.id, data)

        return response.status(200).send(newTable)

    } catch (error) {
        console.log(error)
        return response.status(400).send({ "msg": "Something went wrong while creating the table" })
    }
}

export { addTableHandler }