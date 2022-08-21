FROM node:18 as build

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
ADD src ./src

RUN pnpm install
RUN pnpm build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist/index.js .

CMD ["node", "index.js"]