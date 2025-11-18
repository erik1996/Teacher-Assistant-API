# 1. Build Stage
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Run Stage
FROM node:24-alpine
WORKDIR /app

# Install Chrome dependencies and Chrome with emoji support
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    font-noto-emoji \
    ttf-dejavu \
    ttf-liberation \
    fontconfig \
    && rm -rf /var/cache/apk/*

# Update font cache
RUN fc-cache -fv

# Tell Puppeteer to use installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Increase memory limits for Node.js processes
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Set worker limits
ENV PDF_MAX_WORKERS=3
ENV PDF_TIMEOUT=60000

# Copy built application
COPY --from=builder /app /app

# Install only production deps
RUN npm ci --omit=dev

# Create workers directory and ensure it's accessible
RUN mkdir -p ./dist/workers && chmod -R 755 ./dist/workers

# Ensure entrypoint is executable
RUN chmod +x ./entrypoint.sh

# Use Cloud Run's default port
EXPOSE 8080

# Add health check for better monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["sh", "./entrypoint.sh"]