import { matchedData, validationResult } from "express-validator"
import prisma from "../../prisma/client.js"
import { cancelReservation, createReservation, getUserReservations } from "../services/reservations.service.js"

async function createReservationHandler(request, response){
//   reservationTime DateTime @default(now())
//   duration        Int
//   status          Status (NOT TO BE GIVEN BY THE USER)

//   userId  String (NOT TO BE GIVEN BY THE USER)
//   tableId String 

    const data = matchedData(request)
    const result = validationResult(request)

    if(!result.isEmpty()) return response.status(400).send({"msg": "Invalid Data.", "violations": result.mapped()})

    try {
        const tableFound = await prisma.table.findUnique({
            where: {
                id: data.tableId
            }
        })

        if(!tableFound) return response.status(400).send({"msg": "Requested Table doesn't Exist"})
        if(!tableFound.isAvailable) return response.status(400).send({"msg": "Requested Table is not Available."})
    } catch (error) {
        console.log(error)
        return response.status(400).send({"msg": "Something Went Wrong when finding the requested table."})
    }

    // CONDITIONNNN: Check if any previous reservations exist on that table at the requested duration. ---------
    const newStartDate = new Date(data.reservationTime)
    const newEndDate = new Date(newStartDate.getTime() + (1000 * 60 * 60) * parseInt(data.duration))
    try {
        const overlaps = await prisma.$queryRaw`
            SELECT * FROM "Reservation"
            WHERE "tableId" = ${data.tableId} 
            AND NOT (
                (${newEndDate.toISOString()}::timestamp <= "reservationTime")
                OR
                (${newStartDate.toISOString()}::timestamp >= ("reservationTime" + INTERVAL '1 hour' * "duration"))
            )
            AND NOT "status" = 'CANCELLED';`
        if(overlaps.length > 0){
            return response.status(400).send({"msg": "Reservations already exist on the requested table in the requested timeslot."})
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send({"msg": "Something went wrong when finding for conflicts of reservation."})
    }

    try {
        const furbishedData = {
            ...data,
            status: "PENDING",
            userId: request.user.id
        }

        const reservation = await createReservation(furbishedData)

        return response.status(200).send(reservation)
    } catch (error) {
        if(error.code == 'P2002') return response.status(400).send({"msg": "Reservation already exists at the same time and of same duration."})
        return response.status(500).send({"msg": "Something went wrong when creating the reservation."})

    }
}



async function viewReservationHandler(request, response){
    try {
        const reservations = await getUserReservations(request.user.id)

        return response.status(200).send(reservations)
    } catch (error) {
        console.log(error)
        return response.status(500).send({"msg": "Something went wrong when viewing the user reservations."})

    }
}


async function cancelReservationHandler(request, response){
    try {
        const cancelledReservation = await cancelReservation(request.params.id)
        return response.status(200).send(cancelledReservation)
    } catch (error) {
        if(error.code === "P2025"){

            return response.status(400).send({"msg": "Reservation Not Found"})
        }
        return response.status(500).send({"msg": "Something went wrong while cancelling the reservation"})
        
    }
}

async function tableReservationsHandler(request, response){
    const tableID = request.params.id

    try {
        const reservations = await prisma.table.findUnique({
            where: {
                id: tableID
            },
            select: {
                reservationHistory: true
            }
        })

        if(reservations){
            return response.status(200).send(reservations.reservationHistory)
        }
        
        return response.status(400).send({"msg": "Table does not exist with the TableID"})

    } catch (error) {
        console.log(error)
        return response.status(500).send({"msg": "Something went wrong while finding the reservations of the table."})

    }
}


export {createReservationHandler, viewReservationHandler, cancelReservationHandler, tableReservationsHandler}