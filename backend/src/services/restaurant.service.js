import prisma from '../../prisma/client.js'

async function createRestaurant(data) {
    const restaurant = await prisma.restaurant.create({
        data: data,
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
            }
        }
    })

    return restaurant
}

async function updateRestaurant(id, data) {
    const updatedrestaurant = await prisma.restaurant.update({
        where: {
            id: id
        },
        data: data
    })

    return updatedrestaurant
}

async function findRestaurant(id) {
    const restaurantFound = await prisma.restaurant.findUnique({
        where: {
            id
        },
        include: {
            _count: true,
            owner: true,
            tables: {
                include: {
                    _count: true,
                },
                orderBy: {
                    tableNumber: "asc"
                }
            },
        
        },
        omit: {
            ownerId: true
        }
    })

    return restaurantFound
}

async function findOwnerRestaurant(id){
    const restaurantData = await prisma.restaurant.findUnique({
        where: {
            id
        },
        include: {
            _count: true,
            tables: {
                include: {
                    _count: true,
                    reservationHistory: {
                        include: {
                            reservationBy: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    _count: {
                                        select: {
                                            reservations: true
                                        }
                                    }
                                }
                            },
                        },
                        omit: {
                            userId: true
                        }
                    }
                },
                orderBy: {
                    tableNumber: "asc"
                }
            },
        },
        
    })

    return restaurantData
}


export { createRestaurant, updateRestaurant, findRestaurant, findOwnerRestaurant }