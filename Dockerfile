# -- Stage 0 Base Image -- #
FROM --platform=arm64 node:22.14-alpine AS base
RUN echo "Building on arm64, building for arm64" > /log

# Read more: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN corepack enable
RUN corepack prepare pnpm@9.15.4 --activate


# -- Stage 1 Dependencies -- #
FROM base AS deps

WORKDIR /app

COPY . .
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# -- Stage 2 Build -- #
FROM deps AS builder

WORKDIR /app

COPY . .
RUN pnpm install --frozen-lockfile

RUN pnpm run build

# -- Stage 3 Runner -- #
FROM base AS runner

WORKDIR /app

ENV TZ=Asia/Bangkok
COPY --from=deps --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=deps --chown=node:node /app/package.json/ ./
COPY --from=builder --chown=node:node /app/dist/ ./dist/
COPY --from=builder /app/.env ./

EXPOSE 8000

CMD [ "pnpm", "start:prod" ]