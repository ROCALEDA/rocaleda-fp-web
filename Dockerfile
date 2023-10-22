# Base image with Node.js
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies in a separate layer for caching
FROM base AS dependencies

# Add necessary Alpine packages
RUN apk add --no-cache libc6-compat

# Copy package.json and respective lock file (if available)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install project dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build the project
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

# Add a non-root user to run the application
RUN addgroup --system nextjs && adduser --system nextjs --ingroup nextjs

# Copy over the build assets from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Change the ownership of the copied files/folders
RUN chown -R nextjs:nextjs ./.next

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
