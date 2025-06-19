import prisma from "../../prisma/client.js"

async function createTable(restaurantId, data) {
    //   tableNumber Int (should be unique)
    //   seats       Int
    //   isAvailable Boolean
    //   restaurantId String
    const finalData = {
        ...data,
        restaurantId
    }

    const table = await prisma.table.create({
        data: finalData
    })
    return table

}

export { createTable }