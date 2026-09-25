import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';
import { seedProfile } from './../prisma/seed-profile.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await seedProfile(app.get(PrismaService));
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Digital Business Card API');
  });

  it('returns the profile with related data through GraphQL', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            profile {
              name
              description
              githubUrl
              skills { name }
              experience { company position period achievements }
              projects { name url }
            }
          }
        `,
      })
      .expect(200);

    expect(response.body.errors).toBeUndefined();
    await seedProfile(app.get(PrismaService));
    expect(response.body.data.profile.skills.length).toBeGreaterThan(0);
    expect(response.body.data.profile.experience.length).toBeGreaterThan(0);
    expect(response.body.data.profile.projects.length).toBeGreaterThan(0);
  });

  afterEach(async () => {
    await app.close();
  });
});
