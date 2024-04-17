# Stage 1: Build the Next.js application
FROM node:18 AS build

WORKDIR /app

COPY package.json .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Create a lightweight production image
FROM node:18-alpine

ENV NODE_ENV=production
# Pass environment variable during build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Install production dependencies
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

# Expose the port Next.js uses (3000 by default)
EXPOSE 3000

# Run the Next.js application
CMD ["yarn", "start"]
