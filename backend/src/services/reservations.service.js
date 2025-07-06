import prisma from "../../prisma/client.js"

async function createReservation(data){
    const reservation = await prisma.reservation.create({
        data
    })

    return reservation
}

async function getUserReservations(userid){
    // {
    //     id: string,
    //     reservationTime: string,
    //     duration: number,
    //     status: string,
    //     tableReserved: {
    //        id: string,
    //        tableNumber: number,
    //        seats: number,
    //        ofRestaurant: {
    //           id: string,
    //           name: string,
    //           location: string
    //        }
    //     }
    // }
    const reservations = await prisma.reservation.findMany({
        where: {
            userId: userid
        },
        include: {
            tableReserved: {
                include: {
                    ofRestaurant: {
                        omit: {
                            description: true,
                            ownerId: true,
                        }
                    }
                },
                omit: {
                    restaurantId: true,
                    isAvailable: true,
                }
            }
        },
        omit: {
            tableId: true,
            userId: true,
        },
        orderBy: [{
            reservationTime: "asc"
        }, {
            status: "asc"
        }]
    })

    return reservations
}

async function cancelReservation(id){
    const reservation = await prisma.reservation.update({
        where: {
            id
        },
        data: {
            status: "CANCELLED"
        },
    })

    return reservation
}

export {createReservation, getUserReservations, cancelReservation}

