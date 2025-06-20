import { matchedData, validationResult } from "express-validator"
import prisma from "../../prisma/client.js"

async function listReservationHandler(request, response) {
    try {
        const tables = await prisma.restaurant.findUniqueOrThrow({
            where: {
                id: request.params.id
            },
            select: {
                tables: true
            }
        })

        if (tables) {
            const tableIDList = tables.tables.map((table) => {
                return table.id
            })

            const reservations = await prisma.table.findMany({
                where: {
                    id: {
                        in: tableIDList
                    }
                },
                select: {
                    reservationHistory: true
                }
            })

            var reservationList = []

            reservations.forEach((reservation) => {
                reservationList.push(...reservation.reservationHistory)
            })
            return response.status(200).send(reservationList)
        }
        return response.status(400).send({"msg": "No Tables in the restaurant"})
    } catch (error) {
        console.log(error)
        if(error.code == 'P2025'){
            return response.status(404).send({"msg": "RestaurantID does not exist"})
        }
        return response.status(500).send({"msg": "Something went wrong when finding tables in the restaurant. DB Problem"})
    }
}

async function updateStatusHandler(request, response) {
    const data = matchedData(request)

    const result = validationResult(request)

    if(!result.isEmpty()) return response.status(400).send({"msg": "Invalid Data.", "violations": result.mapped()})

    try {
        const updated = await prisma.reservation.update({
            where: {
                id: request.params.id
            },
            data: {
                status: data.status
            }
        })

        return response.status(200).send(updated)
    } catch (error) {
        console.log(error)
        if(error.code == 'P2025') return response.status(404).send({"msg": "Reservation not found with the requested ID."})
        return response.status(500).send({"msg": "Something went wrong when patching the reservation. DB Problem"})
    }
}

export { listReservationHandler, updateStatusHandler }