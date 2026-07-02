FROM node:22-slim

RUN corepack enable && corepack prepare pnpm@11.9.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

# ENV PORT=8080

EXPOSE 8080

CMD ["pnpm", "start"]