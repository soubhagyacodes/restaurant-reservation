import prisma from "../../prisma/client.js"

async function createReservation(data){
    const reservation = await prisma.reservation.create({
        data
    })

    return reservation
}

async function getUserReservations(userid){
    const reservations = await prisma.user.findMany({
        where: {
            id: userid
        },

        select: {
            reservations: true
        }
    })

    return reservations[0].reservations
}

async function deleteReservation(id){
    const reservation = await prisma.reservation.delete({
        where: {
            id
        }
    })

    return reservation
}

export {createReservation, getUserReservations, deleteReservation}

