# Use an official Node.js runtime as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies first (layer caching!)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Build TypeScript and Prisma client
RUN npm run build && npx prisma generate

# Set environment and port
ENV NODE_ENV=production
EXPOSE 3000

# Run the built app
CMD ["node", "dist/index.js"]

