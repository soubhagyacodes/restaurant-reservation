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

async function findTable(tableId){
    const found = await prisma.table.findUnique({
        where: {
            id: tableId
        }
    })

    return found
}

async function findTablesofRest(restaurantId){
    const foundTables = await prisma.restaurant.findMany({
        where: {
            id: restaurantId
        },
        select: { tables: true }
    })

    return foundTables
}

async function deleteTable(tableID){
    const deleted = await prisma.table.delete({
        where: {
            id: tableID
        }
    })

    return deleted
}

export { createTable, findTablesofRest,findTable, deleteTable }