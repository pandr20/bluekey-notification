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


    const service1 = await prisma.service.create({
      data: {
        user: {
          connect: {
            id: user1.id,
          },
        },
        counterpart: 'ABC Shipping Co.',
        cp_date: new Date('2022-01-05'),
        laycan_range: '2022-01-10 - 2022-01-15',
        eta_load: new Date('2022-01-12'),
        loading_port: 'Port A',
        eta_disch: new Date('2022-01-25'),
        discharge_port: 'Port B',
        freight: 7500,
        status: 'ongoing',
      },
    })

    const service2 = await prisma.service.create({
      data: {
        user: {
          connect: {
            id: user2.id,
          },
        },
        counterpart: 'DEF Shipping Co.',
        cp_date: new Date('2022-02-10'),
        laycan_range: '2022-02-15 - 2022-02-25',
        eta_load: new Date('2022-02-18'),
        loading_port: 'Port C',
        eta_disch: new Date('2022-03-05'),
        discharge_port: 'Port D',
        freight: 10000,
        status: 'completed',
      },
    })

    const service3 = await prisma.service.create({
      data: {
        counterpart: 'GHI Shipping Co.',
        cp_date: new Date('2022-03-20'),
        laycan_range: '2022-03-25 - 2022-04-05',
        eta_load: new Date('2022-04-01'),
        loading_port: 'Port E',
        eta_disch: new Date('2022-04-15'),
        discharge_port: 'Port F',
        freight: 12500,
        status: 'ongoing',
      }
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

  console.log({ user1, user2, service1, service2, service3, notification1, notification2, notification3, notification4 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })


    