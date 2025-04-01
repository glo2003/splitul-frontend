FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm i --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["npm", "run", "start"]

