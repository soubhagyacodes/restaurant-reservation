# Plated. - Restaurant Reservation System

A full-stack project for managing restaurant reservations using **React.js**, **Express.js**, **Typescript**, **Node.js**, **Prisma ORM**, and **PostgreSQL**.

Built with developer ergonomics and clean architecture in mind. Supports:
- Owner and Customer roles
- Table availability management
- Reservation creation and tracking
- Seeded data for local development

---

## Tech Stack

- **React + ShadCN UI** (frontend)
- **Node.js** + **Express** (backend server)
- **Prisma ORM**
- **PostgreSQL**
- **Zod** (for validation)

---

## Project Setup

1. Clone the Repository
```bash
git clone https://github.com/your-username/restaurant-reservation.git
cd restaurant-reservation
```

2. Install Dependencies
 ```bash
 npm install
 ```

3. Set up the database
   Update your .env:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```
   
5. Run
```bash
npx prisma db push
```

6. Seed the database
```bash
npx prisma db seed
```

7. Start the dev server
```bash
cd frontend
npm run dev
```


