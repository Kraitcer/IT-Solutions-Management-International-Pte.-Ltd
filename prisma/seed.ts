import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { seedProfile } from './seed-profile.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
});

try {
  await prisma.$connect();
  await seedProfile(prisma);
} finally {
  await prisma.$disconnect();
}
