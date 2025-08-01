
# Ecommerce Backend Skeleton

Initial Express + TypeScript backend with Prisma and JWT auth.
Phase 2 adds product, cart and order APIs with Stripe checkout.

## Setup

Create a `.env` file with `DATABASE_URL` and `JWT_SECRET` values.



```bash
npm install
npx prisma migrate dev --name init # if you have access to DB
npm run dev
```


### .env example

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=supersecret
STRIPE_SECRET=your_stripe_key
```



Run tests:

```bash
npm test
```

## Docker

Build and run the app together with a PostgreSQL database using Docker:

```bash
docker compose up --build
```

The server will be available on `http://localhost:3000` and the database on port `5432`.



# ecommerce

This repository will contain the e-commerce project code.


