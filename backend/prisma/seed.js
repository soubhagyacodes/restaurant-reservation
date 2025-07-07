import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // --- Users ---
  await prisma.user.createMany({
    data: [
      { id: 'owner-1', name: 'Rahul Sharma', email: 'rahul@resto.com', passwordHash: null, role: 'OWNER' },
      { id: 'owner-2', name: 'Anjali Mehta', email: 'anjali@resto.com', passwordHash: null, role: 'OWNER' },
      { id: 'owner-3', name: 'Vikram Singh', email: 'vikram@resto.com', passwordHash: null, role: 'OWNER' },
      { id: 'cust-1', name: 'Priya Verma', email: 'priya@gmail.com', passwordHash: null, role: 'CUSTOMER' },
      { id: 'cust-2', name: 'Aman Gupta', email: 'aman@gmail.com', passwordHash: null, role: 'CUSTOMER' },
      { id: 'cust-3', name: 'Neha Rai', email: 'neha@gmail.com', passwordHash: null, role: 'CUSTOMER' }
    ]
  });

  // --- Restaurants ---
  await prisma.restaurant.createMany({
    data: [
      { id: 'rest-1', name: 'Zaika Ghar', location: 'Delhi', description: 'Authentic Mughlai flavors served with love and heritage. Enjoy royal biryani and kebabs in an ambient setting.', ownerId: 'owner-1' },
      { id: 'rest-2', name: 'Swadisht Bhojanalay', location: 'Lucknow', description: 'Traditional Awadhi thalis and warm hospitality in vintage decor.', ownerId: 'owner-1' },
      { id: 'rest-3', name: 'Masala Junction', location: 'Pune', description: 'Fusion Indian cuisine with urban vibes, dosa tacos to butter chicken pizza.', ownerId: 'owner-2' },
      { id: 'rest-4', name: 'Amrit Rasoi', location: 'Jaipur', description: 'Vegetarian Rajasthani dishes served with a folk touch.', ownerId: 'owner-2' },
      { id: 'rest-5', name: 'Coastal Curry House', location: 'Chennai', description: 'Seafood specials from the Konkan coast to Malabar flavors.', ownerId: 'owner-3' },
      { id: 'rest-6', name: 'Biryani Darbar', location: 'Hyderabad', description: 'Dum-cooked Nawabi biryanis in a modern heritage setup.', ownerId: 'owner-3' }
    ]
  });

  // --- Tables (5–6 each) ---
  await prisma.table.createMany({
    data: [
      // Zaika Ghar
      { id: 'table-1', tableNumber: 1, seats: 4, isAvailable: true, restaurantId: 'rest-1' },
      { id: 'table-2', tableNumber: 2, seats: 2, isAvailable: false, restaurantId: 'rest-1' },
      { id: 'table-3', tableNumber: 3, seats: 5, isAvailable: true, restaurantId: 'rest-1' },
      { id: 'table-4', tableNumber: 4, seats: 3, isAvailable: true, restaurantId: 'rest-1' },
      { id: 'table-5', tableNumber: 5, seats: 4, isAvailable: false, restaurantId: 'rest-1' },

      // Swadisht Bhojanalay
      { id: 'table-6', tableNumber: 1, seats: 2, isAvailable: true, restaurantId: 'rest-2' },
      { id: 'table-7', tableNumber: 2, seats: 4, isAvailable: false, restaurantId: 'rest-2' },
      { id: 'table-8', tableNumber: 3, seats: 3, isAvailable: true, restaurantId: 'rest-2' },
      { id: 'table-9', tableNumber: 4, seats: 5, isAvailable: false, restaurantId: 'rest-2' },
      { id: 'table-10', tableNumber: 5, seats: 4, isAvailable: true, restaurantId: 'rest-2' },

      // Masala Junction
      { id: 'table-11', tableNumber: 1, seats: 4, isAvailable: true, restaurantId: 'rest-3' },
      { id: 'table-12', tableNumber: 2, seats: 2, isAvailable: false, restaurantId: 'rest-3' },
      { id: 'table-13', tableNumber: 3, seats: 5, isAvailable: true, restaurantId: 'rest-3' },
      { id: 'table-14', tableNumber: 4, seats: 3, isAvailable: true, restaurantId: 'rest-3' },
      { id: 'table-15', tableNumber: 5, seats: 4, isAvailable: false, restaurantId: 'rest-3' },
      { id: 'table-16', tableNumber: 6, seats: 4, isAvailable: true, restaurantId: 'rest-3' },

      // Amrit Rasoi
      { id: 'table-17', tableNumber: 1, seats: 2, isAvailable: true, restaurantId: 'rest-4' },
      { id: 'table-18', tableNumber: 2, seats: 4, isAvailable: false, restaurantId: 'rest-4' },
      { id: 'table-19', tableNumber: 3, seats: 3, isAvailable: true, restaurantId: 'rest-4' },
      { id: 'table-20', tableNumber: 4, seats: 4, isAvailable: true, restaurantId: 'rest-4' },
      { id: 'table-21', tableNumber: 5, seats: 5, isAvailable: false, restaurantId: 'rest-4' },

      // Coastal Curry House
      { id: 'table-22', tableNumber: 1, seats: 2, isAvailable: true, restaurantId: 'rest-5' },
      { id: 'table-23', tableNumber: 2, seats: 4, isAvailable: false, restaurantId: 'rest-5' },
      { id: 'table-24', tableNumber: 3, seats: 4, isAvailable: true, restaurantId: 'rest-5' },
      { id: 'table-25', tableNumber: 4, seats: 3, isAvailable: true, restaurantId: 'rest-5' },
      { id: 'table-26', tableNumber: 5, seats: 5, isAvailable: false, restaurantId: 'rest-5' },

      // Biryani Darbar
      { id: 'table-27', tableNumber: 1, seats: 4, isAvailable: true, restaurantId: 'rest-6' },
      { id: 'table-28', tableNumber: 2, seats: 4, isAvailable: false, restaurantId: 'rest-6' },
      { id: 'table-29', tableNumber: 3, seats: 3, isAvailable: true, restaurantId: 'rest-6' },
      { id: 'table-30', tableNumber: 4, seats: 2, isAvailable: true, restaurantId: 'rest-6' },
      { id: 'table-31', tableNumber: 5, seats: 5, isAvailable: false, restaurantId: 'rest-6' },
      { id: 'table-32', tableNumber: 6, seats: 4, isAvailable: true, restaurantId: 'rest-6' }
    ]
  });

  // --- Reservations ---
  await prisma.reservation.createMany({
  data: [
    {
      id: 'res-1',
      reservationTime: '2025-07-10T19:00:00.000Z',
      duration: 2,
      status: 'CONFIRMED',
      userId: 'cust-1',
      tableId: 'table-1'
    },
    {
      id: 'res-2',
      reservationTime: '2025-07-11T13:30:00.000Z',
      duration: 1,
      status: 'PENDING',
      userId: 'cust-2',
      tableId: 'table-7'
    },
    {
      id: 'res-3',
      reservationTime: '2025-07-12T20:00:00.000Z',
      duration: 3,
      status: 'PENDING',
      userId: 'cust-3',
      tableId: 'table-11'
    },
    {
      id: 'res-4',
      reservationTime: '2025-07-14T18:00:00.000Z',
      duration: 5,
      status: 'CONFIRMED',
      userId: 'cust-1',
      tableId: 'table-16'
    },
    {
      id: 'res-5',
      reservationTime: '2025-07-15T12:00:00.000Z',
      duration: 2,
      status: 'CANCELLED',
      userId: 'cust-2',
      tableId: 'table-22'
    },
    {
      id: 'res-6',
      reservationTime: '2025-07-16T14:30:00.000Z',
      duration: 4,
      status: 'PENDING',
      userId: 'cust-3',
      tableId: 'table-27'
    },
    {
      id: 'res-7',
      reservationTime: '2025-07-17T19:45:00.000Z',
      duration: 3,
      status: 'CONFIRMED',
      userId: 'cust-1',
      tableId: 'table-3'
    },
    {
      id: 'res-8',
      reservationTime: '2025-07-18T20:00:00.000Z',
      duration: 1,
      status: 'PENDING',
      userId: 'cust-2',
      tableId: 'table-13'
    },
    {
      id: 'res-9',
      reservationTime: '2025-07-19T21:00:00.000Z',
      duration: 5,
      status: 'CONFIRMED',
      userId: 'cust-3',
      tableId: 'table-30'
    },
    {
      id: 'res-10',
      reservationTime: '2025-07-20T17:00:00.000Z',
      duration: 2,
      status: 'CANCELLED',
      userId: 'cust-1',
      tableId: 'table-19'
    }
  ]
});
}

main()
   .then(() => {
      console.log('Seeding done.');
   })
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
