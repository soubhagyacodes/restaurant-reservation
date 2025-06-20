import { matchedData, validationResult } from "express-validator"
import prisma from "../../prisma/client.js"
import { findRestaurant } from "../services/restaurant.service.js"
import { createTable, deleteTable, findTable, findTablesofRest } from "../services/tables.service.js"

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
        return response.status(500).send({ "msg": "something went wrong when finding the restaurant." })
    }

    const data = matchedData(request)

    const result = validationResult(request)

    if (!result.isEmpty()) {
        return response.status(400).send({ "msg": "Invalid data", "violations": result.mapped() })
    }

    try {
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
        return response.status(500).send({ "msg": "something went wrong when verifying that the table number doesn't exist." })
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
        return response.status(500).send({ "msg": "Something went wrong while creating the table" })
    }
}

async function getTableHandler(request, response) {
    try {
        const restaurantFound = await findRestaurant(request.params.id)

        if (!restaurantFound) return response.status(400).send({ "msg": "Restaurant with given id not found." })
    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "something went wrong when finding the restaurant." })
    }

    try {
        const tables = await findTablesofRest(request.params.id)

        return response.status(200).send(tables[0].tables)
    } catch (error) {

        console.log(error)
        return response.status(500).send({ "msg": "something went wrong when finding the tables of the restaurant." })
    }
}

async function deleteTableHandler(request, response) {
    try {
        const foundTable = await findTable(request.params.id)

        if(!foundTable) return response.status(400).send({"msg": "table not found."})
    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "something went wrong when finding the table before deleting." })

    }

    try {
        const deletedTable = await deleteTable(request.params.id)

        return response.status(200).send(deletedTable)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ "msg": "something went wrong when deleting the table." })

    }
    
}

export { addTableHandler, getTableHandler, deleteTableHandler }

