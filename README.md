# 🛒 E-commerce Backend API – Express + TypeScript + Prisma

This project is a modern, backend skeleton for an e-commerce platform built with **Express**, **TypeScript**, **Prisma**, and **JWT authentication**. It includes full CRUD operations for products, a shopping cart, order checkout with Stripe integration, and a PostgreSQL backend via Docker Compose.

---

## 📦 Features

- ⚙️ Express.js server with modular routing
- 🛡️ JWT-based authentication & authorization
- 🧩 Prisma ORM with PostgreSQL
- 🛒 Product, Cart, and Order APIs
- 💳 Stripe Checkout integration
- 🐳 Docker + Docker Compose support
- ✅ REST API with OpenAPI (Swagger) documentation
- 🌱 Ready for local dev, containerized deployment, or Kubernetes

---

## 🚀 Quickstart (Local Development)

### 1️⃣ Clone and Setup Environment

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=supersecret
STRIPE_SECRET=your_stripe_key
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start PostgreSQL (Docker)

```bash
docker compose up -d db
```

Ensure the `docker-compose.yml` contains a `db` service configured for PostgreSQL.

### 4️⃣ Initialize Database

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Run Dev Server

```bash
npm run dev
```

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🔗 API Endpoints

> All authenticated routes require a `Bearer <token>` in the `Authorization` header.

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/health`              | Health check                   |
| POST   | `/api/auth/signup`     | Register a new user            |
| POST   | `/api/auth/login`      | Login and receive JWT token    |
| GET    | `/api/products`        | List all products              |
| GET    | `/api/products/:id`    | Get a specific product         |
| POST   | `/api/products`        | Create product *(admin only)*  |
| PUT    | `/api/products/:id`    | Update product *(admin only)*  |
| DELETE | `/api/products/:id`    | Delete product *(admin only)*  |
| GET    | `/api/cart`            | View cart *(auth required)*    |
| POST   | `/api/cart/add`        | Add item to cart *(auth)*      |
| POST   | `/api/cart/remove`     | Remove item from cart *(auth)* |
| POST   | `/api/orders/checkout` | Checkout and pay *(auth)*      |
| GET    | `/api/orders`          | View order history *(auth)*    |

---

## 📘 API Documentation (OpenAPI/Swagger)

The OpenAPI spec is located at:

```
docs/openapi.yaml
```

You can visualize it using [Swagger UI](https://editor.swagger.io/) or integrate with Postman.

---

## 🐳 Docker Compose (Full Stack)

To run the **backend app and PostgreSQL together** in containers:

```bash
docker compose up --build
```

* App: `http://localhost:3000`
* DB:  `localhost:5432`

---

## ☸️ Kubernetes Deployment

1. Build and push Docker image:

   ```bash
   docker build -t myrepo/ecommerce-app:latest .
   docker push myrepo/ecommerce-app:latest
   ```

2. Update image name in `k8s/app.yaml`.

3. Apply manifests:

   ```bash
   kubectl apply -f k8s/
   ```

---

## ☁️ AWS Deployment (ECS + RDS)

### ECS Setup

* Build Docker image → Push to ECR
* Create ECS Task Definition with:

  * `DATABASE_URL`
  * `JWT_SECRET`
  * `STRIPE_SECRET`
* Deploy as ECS Service

### RDS Setup

* Create a PostgreSQL instance
* Update `.env` with your RDS `DATABASE_URL`

### Security Groups

* ALB → ECS on port `3000`
* ECS → RDS on port `5432`

> Optional: Use ALB for HTTPS termination

---

## 📁 Project Structure

```
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth middleware
│   ├── routes/             # API route definitions
│   ├── utils/              # Helper utilities
│   └── index.ts            # App entry point
├── .env
├── docker-compose.yml
├── Dockerfile
├── tsconfig.json
└── README.md
```

---

## 🧠 Contributing & Roadmap

* ✅ Add unit tests for all services
* ✅ Include role-based access control (RBAC)
* 🛠 Add pagination and filtering to product list
* 🛠 Admin dashboard frontend (WIP)

PRs and Issues are welcome!

---

## 📜 License

MIT © \[Pasima]

```


