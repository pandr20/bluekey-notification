/* import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function createNotification() {
    const user = await prisma.user.create({
      data: {
        username: 'user1',
        password: 'password',
        role: 'user',
        services: {
          create: {
            userId: '',
            data: 'some data',
            notifications: {
              create: {
                state: { connect: { id: stateId } },
                message: 'notification message',
                createdAt: new Date(),
                isRead: false,
                priority: 'high',
              }
            }
          }
        }
      },
    })
  } */