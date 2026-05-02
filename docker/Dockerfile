# Alakel UI - Multi-stage Docker Build
# This Dockerfile supports building packages and running apps in containers

# Stage 1: Base image with Node.js
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Stage 2: Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
COPY packages/utils/package.json ./packages/utils/
COPY packages/button/package.json ./packages/button/
COPY packages/card/package.json ./packages/card/
COPY packages/label/package.json ./packages/label/
COPY apps/docs/package.json ./apps/docs/
COPY apps/playground/package.json ./apps/playground/
COPY apps/storybook/package.json ./apps/storybook/
RUN npm ci

# Stage 3: Build packages
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build all packages
RUN npm run build:packages

# Stage 4: Production dependencies only
FROM base AS prod-deps
COPY package.json package-lock.json* ./
COPY packages/utils/package.json ./packages/utils/
COPY packages/button/package.json ./packages/button/
COPY packages/card/package.json ./packages/card/
COPY packages/label/package.json ./packages/label/
RUN npm ci --production

# Stage 5: Docs app (port 3001)
FROM base AS docs
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY apps/docs ./apps/docs
WORKDIR /app/apps/docs
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Stage 6: Playground app (port 3002)
FROM base AS playground
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY apps/playground ./apps/playground
WORKDIR /app/apps/playground
EXPOSE 3002
CMD ["npm", "run", "dev"]

# Stage 7: Storybook (port 6006)
FROM base AS storybook
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY apps/storybook ./apps/storybook
WORKDIR /app/apps/storybook
EXPOSE 6006
CMD ["npm", "run", "storybook"]

# Stage 8: Test runner
FROM base AS test
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "test"]
