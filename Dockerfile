# Flight Service 365 - Production Dockerfile for Coolify

# Stage 1: Build (if needed for future enhancements)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production 2>/dev/null || echo "No package.json, skipping npm install"
COPY . .

# Stage 2: Production - Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy website files
COPY --from=builder /app/src/pages /usr/share/nginx/html
COPY --from=builder /app/src/assets /usr/share/nginx/html/assets
COPY --from=builder /app/src/styles /usr/share/nginx/html/styles
COPY --from=builder /app/src/scripts /usr/share/nginx/html/scripts

# Create a simple index redirect
RUN echo '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/en/index.html"></head><body><p>Redirecting...</p></body></html>' > /usr/share/nginx/html/index.html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/en/index.html || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
