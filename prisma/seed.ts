import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    
    const service1 = await prisma.service.create({
      data: {
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


  

  console.log({ service1, service2, service3,  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })


    