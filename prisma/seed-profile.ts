import type { PrismaClient } from '@prisma/client';
import { profileSeedData } from './profile-seed-data.js';

export async function seedProfile(prisma: PrismaClient): Promise<void> {
  const { skills, experience, projects, ...profile } = profileSeedData;

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      ...profile,
      skills: { deleteMany: {}, create: skills.create },
      experience: { deleteMany: {}, create: experience.create },
      projects: { deleteMany: {}, create: projects.create },
    },
    create: profileSeedData,
  });
}
