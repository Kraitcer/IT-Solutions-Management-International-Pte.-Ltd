import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

const profileInclude = {
  skills: { orderBy: { name: 'asc' as const } },
  experience: { orderBy: { id: 'asc' as const } },
  projects: { orderBy: { id: 'asc' as const } },
};

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  async getProfile() {
    const profile = await this.prisma.profile.findFirst({
      include: profileInclude,
    });

    if (!profile) {
      throw new NotFoundException('Profile has not been seeded yet');
    }

    return profile;
  }

  async seed() {
    const existing = await this.prisma.profile.findFirst({
      select: { id: true },
    });

    if (existing) {
      return;
    }

    await this.prisma.profile.create({
      data: {
        name: 'Kraitcer',
        description:
          'Backend-разработчик, создающий надежные API и сервисы на TypeScript.',
        githubUrl: 'https://github.com/Kraitcer',
        skills: {
          create: [
            { name: 'TypeScript' },
            { name: 'Node.js' },
            { name: 'NestJS' },
            { name: 'GraphQL' },
            { name: 'Prisma' },
            { name: 'PostgreSQL' },
            { name: 'Docker' },
          ],
        },
        experience: {
          create: [
            {
              company: 'Independent development',
              position: 'Backend Developer',
              period: '2024 - настоящее время',
              achievements: [
                'Разработка типобезопасных API на NestJS и GraphQL',
                'Проектирование схем PostgreSQL и интеграция Prisma',
              ],
            },
          ],
        },
        projects: {
          create: [
            {
              name: 'Digital business card API',
              description: 'GraphQL API цифровой визитки специалиста',
              url: 'https://github.com/Kraitcer',
            },
          ],
        },
      },
    });
  }
}
