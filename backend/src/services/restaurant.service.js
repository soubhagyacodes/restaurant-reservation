import prisma from '../../prisma/client.js'

async function createRestaurant(data) {
    const restaurant = await prisma.restaurant.create({
        data: data
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
        }
    })

    return restaurantFound
}


export { createRestaurant, updateRestaurant, findRestaurant }