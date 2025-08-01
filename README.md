# Ecommerce Backend Skeleton

This project is an Express + TypeScript backend using Prisma and JWT authentication. It provides product, cart and order APIs with Stripe checkout support.

## Setup

Create a `.env` file with the following variables:

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=supersecret
STRIPE_SECRET_KEY=your_stripe_key
```

Install dependencies and run the development server:

```bash
npm install
npx prisma migrate dev --name init # if you have access to the DB
npm run dev
```

Run tests:

```bash
npm test
```

## API Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/health` | Health check |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/products` | List products |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| GET | `/api/cart` | View current cart (auth) |
| POST | `/api/cart/add` | Add product to cart (auth) |
| POST | `/api/cart/remove` | Remove product from cart (auth) |
| POST | `/api/orders/checkout` | Checkout and create payment (auth) |
| GET | `/api/orders` | View order history (auth) |

Authenticated routes expect a `Bearer` token in the `Authorization` header.

### OpenAPI

A full OpenAPI specification can be found in [`docs/openapi.yaml`](docs/openapi.yaml). Tools like Swagger UI can be used to visualize the documentation.

## Docker

Build and run the app together with a PostgreSQL database using Docker Compose:

```bash
docker compose up --build
```

The server will be available on `http://localhost:3000` and PostgreSQL on port `5432`.

## AWS Deployment

1. **ECS**: Build the Docker image using the provided `Dockerfile` and push it to ECR. Create an ECS service that runs the image.
2. **RDS**: Provision a PostgreSQL database in Amazon RDS. Update `DATABASE_URL` to point to the RDS endpoint.
3. **Environment Variables**: Configure the ECS task definition with `DATABASE_URL`, `JWT_SECRET` and `STRIPE_SECRET_KEY`.
4. **Security Groups**: Allow inbound traffic from the load balancer to the ECS service on port 3000 and permit the ECS tasks to reach the RDS instance on port 5432.
5. Optionally place an Application Load Balancer in front of the ECS service for HTTPS termination.

# ecommerce

This repository contains the e-commerce project code.
