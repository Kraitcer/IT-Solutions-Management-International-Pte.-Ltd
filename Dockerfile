FROM node:22-alpine

WORKDIR /app

ENV DATABASE_URL=postgresql://portfolio:portfolio@postgres:5432/portfolio

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]