FROM node:24-alpine

WORKDIR /app

ENV DATABASE_URL=postgresql://portfolio:portfolio@postgres:5432/portfolio

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]