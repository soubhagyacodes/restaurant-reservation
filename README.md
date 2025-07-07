# Restaurant Reservation System

A full-stack project for managing restaurant reservations using **React.js**, **Express.js**, **Typescript**, **Node.js**, **Prisma ORM**, and **PostgreSQL**.

Built with developer ergonomics and clean architecture in mind. Supports:
- Owner and Customer roles
- Table availability management
- Reservation creation and tracking
- Seeded data for local development

---

## Tech Stack

- **Node.js** + **Express** (backend server)
- **Prisma ORM**
- **PostgreSQL**
- **Zod** (for validation)
- **React + ShadCN UI**

---

## Project Setup

1. Clone the Repository
```bash
git clone https://github.com/your-username/restaurant-reservation.git
cd restaurant-reservation
```

2. Install Dependencies
   npm install

3. Set up the database
   Update your .env:
    DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

4. Run
   npx prisma db push

5. Seed the database
   npx prisma db seed

6. Start the dev server
   cd /frontend
   npm run dev


