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
      await this.prisma.profile.delete({
        where: { id: existing.id },
      });
    }

    await this.prisma.profile.create({
      data: {
        name: 'Крайцер Глеб Геннадьевич',
        description:
          'Fullstack-разработчик с инженерным образованием и опытом в системном администрировании, связи, медиапроизводстве и веб-разработке. Специализируюсь на JavaScript/TypeScript, Python, React, Vue и Node.js. Применяю системное мышление и технический бэкграунд, чтобы разбираться в сложных системах и доводить задачи до рабочего результата.',
        githubUrl: 'https://github.com/Kraitcer',
        linkedinUrl: 'https://www.linkedin.com/in/gleb-kraitcer/',
        skills: {
          create: [
            { name: 'JavaScript' },
            { name: 'TypeScript' },
            { name: 'Python' },
            { name: 'SQL' },
            { name: 'HTML5' },
            { name: 'CSS3' },
            { name: 'Sass/SCSS' },
            { name: 'React' },
            { name: 'Redux' },
            { name: 'Zustand' },
            { name: 'React Query' },
            { name: 'React Hook Form' },
            { name: 'React DnD' },
            { name: 'DnD Kit' },
            { name: 'Vue.js' },
            { name: 'Vue 3' },
            { name: 'Nuxt' },
            { name: 'Vite' },
            { name: 'Pinia' },
            { name: 'Vue Router' },
            { name: 'vue3-virtual-scroller' },
            { name: 'Bootstrap' },
            { name: 'Element Plus' },
            { name: 'Chakra UI' },
            { name: 'unoCSS' },
            { name: 'BEM' },
            { name: 'Адаптивная верстка' },
            { name: 'ApexCharts' },
            { name: 'Node.js' },
            { name: 'Express' },
            { name: 'NestJS' },
            { name: 'REST API' },
            { name: 'GraphQL' },
            { name: 'JWT' },
            { name: 'EventSource' },
            { name: 'Pyasic' },
            { name: 'ООП' },
            { name: 'Telegram Bot API' },
            { name: 'ExcelJS' },
            { name: 'Axios' },
            { name: 'Luxon' },
            { name: 'OpenCart' },
            { name: 'MySQL' },
            { name: 'MongoDB' },
            { name: 'Prisma' },
            { name: 'PostgreSQL' },
            { name: 'Docker' },
            { name: 'Nginx' },
            { name: 'HTTPS' },
            { name: 'Git' },
            { name: 'npm' },
            { name: 'Сетевое администрирование' },
            { name: 'Adobe Photoshop' },
            { name: 'Звукорежиссура и продакшн' },
            { name: 'Видеомонтаж' },
            { name: 'Менторство и обучение' },
          ],
        },
        experience: {
          create: [
            {
              company: 'Векус, ЦКТ, ООО',
              position: 'Fullstack-разработчик',
              period: 'Июнь 2023 - Август 2026',
              achievements: [
                'Разработал веб-приложение для мониторинга и удаленного управления ASIC-майнерами: SPA-интерфейс, backend-сервисы, MySQL и агентское ПО.',
                'Создал генератор Excel-отчетов по клиентам и площадкам с редактором премодерации данных.',
                'Автоматизировал учет клиентских балансов, начислений и списаний за обслуживание.',
                'Разработал аутентификацию, авторизацию и гибкую ролевую модель доступа.',
                'Создал систему уведомлений об отключениях и неисправностях с тикетами и Telegram-уведомлениями.',
                'Реализовал учет поломок, логистику, согласование ремонта и удаленное управление агентами.',
                'Усилил архитектуру кластерным распределением нагрузки и перенес REST API на Nest.js.',
                'Настроил HTTPS, Nginx и контейнеризацию в Docker.',
                'Разработал автономное Python-агентское ПО в формате standalone .exe со сбором логов.',
                'Выполнил рестайлинг интерфейса по макетам Figma и адаптивную верстку.',
              ],
            },
            {
              company: 'Ultima PRO Group',
              position: 'Инженер-монтажник',
              period: 'Декабрь 2021 - Февраль 2023',
              achievements: [
                'Обслуживал, подключал и диагностировал технологические системы МФК «Лахта Центр».',
                'Участвовал в монтаже студии звукозаписи, видеомонтажной, планетария и серверного комплекса обработки 8K-контента.',
                'Работал с проекционным, акустическим, световым и инженерным оборудованием, включая Dolby Atmos и DMX-512.',
                'Руководил двумя группами монтажников, контролировал материалы, приемку и качество работ.',
              ],
            },
            {
              company: 'Лаймикс',
              position: 'Системный администратор',
              period: 'Июль 2013 - Апрель 2015',
              achievements: ['Обслуживал ИТ-инфраструктуру предприятия.'],
            },
            {
              company: 'ООО «Бизнес-отель Карелия», хостел «Граффити»',
              position: 'Системный администратор',
              period: 'Ноябрь 2011 - Февраль 2013',
              achievements: ['Обслуживал ИТ-инфраструктуру предприятия.'],
            },
            {
              company: 'Subcoin Studio',
              position:
                'Звукоинженер, менеджер студии, ментор образовательных проектов',
              period: 'Декабрь 2017 - Декабрь 2022',
              achievements: [
                'Занимался звукорежиссурой, управлением студией и менторством образовательных проектов.',
              ],
            },
            {
              company: 'MusicMagTv',
              position: 'Продюсер',
              period: 'Май 2015 - Сентябрь 2018',
              achievements: [
                'Продюсировал медиапроекты для YouTube-канала MusicMagTv.',
              ],
            },
            {
              company: 'Media Broker',
              position: 'Контент-менеджер / верстальщик',
              period: 'Январь 2015 - Январь 2017',
              achievements: [
                'Разрабатывал и поддерживал страницы на HTML, JavaScript, CSS и OpenCart.',
              ],
            },
          ],
        },
        projects: {
          create: [
            {
              name: 'ASIC Miner Monitoring Platform',
              description:
                'Веб-приложение для мониторинга, отчетности и удаленного управления ASIC-майнерами.',
              url: 'https://vekus.ru',
            },
            {
              name: 'Redux App',
              description: 'Проект на React/Redux.',
              url: 'https://redux-app-tau.vercel.app',
            },
            {
              name: 'Game Hub',
              description:
                'Веб-приложение на React для работы с каталогом игр.',
              url: 'https://game-hub-ten-peach.vercel.app',
            },
            {
              name: 'GitHub',
              description: 'Исходный код и другие проекты.',
              url: 'https://github.com/Kraitcer',
            },
          ],
        },
      },
    });
  }
}
