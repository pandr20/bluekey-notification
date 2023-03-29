// import { PrismaClient, Prisma } from '@prisma/client'

// const prisma = new PrismaClient()

// const userData: Prisma.UserCreateInput[] = [
//   {
//     username: 'admin',
//     password: 'admin',
//     role: 'Operator',
//     services: {
//       create: [
//         userId:

//       ]
//     }
//   }
// ]

// async function main() {
//   console.log(`Start seeding ...`)
//   for (const u of userData) {
//     const user = await prisma.user.create({
//       data: u,
//       include: {
//         services: {
//           include: {
//             notifications: true
//           }
//         },
//         notifications: true,
//         state: {
//           include: {
//             services: {
//               include: {
//                 notifications: true
//               }
//             },
//             notifications: true
//           }
//         }
//       }
//     })
//     console.log(`Created user with id: ${user.id}`)
//   }
//   console.log(`Seeding finished.`)
// }
// //Include property specifies what related data should be fetched from DB with main data.
// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })