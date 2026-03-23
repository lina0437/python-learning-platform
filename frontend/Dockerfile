# Build stage
FROM docker.1panel.live/library/node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (including devDependencies for build)
# Clean npm cache to reduce image size
RUN npm ci --include=dev && npm cache clean --force

# Copy source code (after dependencies for layer caching)
COPY . .

# Build application
RUN npm run build

# Production stage
FROM docker.1panel.live/library/nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
