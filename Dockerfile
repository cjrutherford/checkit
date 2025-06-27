# Backend Dockerfile for building and serving both API and Angular client
FROM node:20 AS build
WORKDIR /app

# Install backend dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy backend source
COPY . .

# Build backend
RUN npm run build

# Build Angular client
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
RUN npm run build -- --output-path=dist

# Production image
FROM node:20-slim AS prod
WORKDIR /app

# Copy backend build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Copy client build into backend's public directory
COPY --from=build /app/client/dist ./public

# Copy assets folder (shim)
COPY client/src/assets ./public/assets

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
