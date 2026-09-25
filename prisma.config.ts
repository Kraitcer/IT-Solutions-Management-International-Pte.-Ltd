import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const databaseUrl = new URL('postgresql://localhost');
databaseUrl.hostname = process.env.DB_HOST ?? 'localhost';
databaseUrl.port = process.env.DB_PORT ?? '5432';
databaseUrl.username = process.env.DB_USER ?? '';
databaseUrl.password = process.env.DB_PASSWORD ?? '';
databaseUrl.pathname = process.env.DB_NAME ?? '';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl.toString(),
  },
});
