# Ecommerce Backend Skeleton

Initial Express + TypeScript backend with Prisma and JWT auth.

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
```

Run tests:

```bash
npm test
```
