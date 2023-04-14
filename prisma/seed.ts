import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.user.create({
      data: {
        username: 'user1',
        password: 'password1',
        name: 'User One',
        role: 'Manager',
      },
    })
    
    const user2 = await prisma.user.create({
        data: {
          username: 'user2',
          password: 'password2',
          name: 'User Two',
          role: 'Operator',
        },
      })

    //Error 1



    //Error 2

    const service1 = await prisma.service.create({
    data: {
        data: 'Service One Data',
        user: {
        connect: {
            id: user1.id,
            
        },
        },
    },
    })

    // Working

    const service2 = await prisma.service.create({
        data: {
          data: 'Service Two Data',
          user: {
            connect: {
              id: user2.id,
            },
          },
        },
      })

      const notification1 = await prisma.notification.create({
        data: {
          user: {
            connect: {
              id: user1.id,
            },
          },
          service: {
            connect: {
              id: service1.id,
            },
          },
          state: 'UNREAD',
          isRead: false,
          priority: 1,
          message: 'Notification One Message',
        },
      })

      const notification2 = await prisma.notification.create({
        data: {
          user: {
            connect: {
              id: user1.id,
            },
          },
          service: {
            connect: {
              id: service1.id,
            },
          },
          state: 'READ',
          isRead: true,
          priority: 2,
          message: 'Notification Two Message',
        },
      })
    
      const notification3 = await prisma.notification.create({
        data: {
          user: {
            connect: {
              id: user2.id,
            },
          },
          service: {
            connect: {
              id: service2.id,
            },
          },
          state: 'PROCESSING',
          isRead: false,
          priority: 3,
          message: 'Notification Three Message',
        },
      })
    
      const notification4 = await prisma.notification.create({
        data: {
          user: {
            connect: {
              id: user2.id,
            },
          },
          service: {
            connect: {
              id: service2.id,
            },
          },
          state: 'COMPLETED',
          isRead: true,
          priority: 4,
          message: 'Notification Four Message',
        },
      })

      console.log({ user1, user2, service1, service2, notification1, notification2, notification3, notification4 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })


    