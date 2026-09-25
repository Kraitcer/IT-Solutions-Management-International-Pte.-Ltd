import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

const profileInclude = {
  skills: { orderBy: { name: 'asc' as const } },
  experience: { orderBy: { id: 'asc' as const } },
  projects: { orderBy: { id: 'asc' as const } },
};

const profileId = 1;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      include: profileInclude,
    });

    if (!profile) {
      throw new NotFoundException('Profile has not been seeded yet');
    }

    return profile;
  }
}
