# Digital Business Card API

Backend цифровой визитки на NestJS, GraphQL, Prisma, PostgreSQL и Docker.

## Запуск через Docker

1. Создайте `.env` на основе `.env.example`.
2. Запустите приложение:

```bash
docker compose up --build
```

После запуска:

- GraphQL endpoint и Apollo Sandbox: `http://localhost:3000/graphql`
- обычный health endpoint: `http://localhost:3000/`

Миграции применяются командой `prisma migrate deploy`, затем выполняется повторяемый seed профиля.

## Пример GraphQL-запроса

```graphql
query {
  profile {
    name
    description
    githubUrl
    linkedinUrl
    skills {
      name
    }
    experience {
      company
      position
      period
      achievements
    }
    projects {
      name
      description
      url
    }
  }
}
```

## Локальная разработка

Требуется Node.js и доступный PostgreSQL. Установите зависимости и настройте `.env`:

```bash
npm install
npm run start:dev
```

`start:dev` применяет миграции, запускает seed и включает watch mode. Отдельные команды:

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
npm run db:seed
```

## Структура

- `src/profile` содержит GraphQL resolver, типы API и сервис чтения профиля.
- `src/prisma` содержит Nest provider для Prisma Client.
- `prisma/schema.prisma` описывает модели и связи.
- `prisma/seed.ts` запускает начальное заполнение базы отдельно от lifecycle приложения.
- `prisma/migrations` содержит версионируемые изменения схемы.
