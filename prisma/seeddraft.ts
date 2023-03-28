// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const user1 = await prisma.user.create({
//     data: {
//       username: 'user1',
//       password: 'password1',
//       role: 'admin',
//       services: {
//         create: [
//           {
//             userId: '1',
//             data: 'service1 data',
//             notifications: {
//               create: []
//                 },
//             }


// async function main() {
//     console.log(`Start seeding ...`)
//     for (const u of userData) {
//         const user = await prisma.user.create({
//         data: u,
//         include: {
//             services: {
//             include: {
//                 notifications: true
//             }
//             },
//             notifications: true,
//             state: {
//             include: {
//                 services: {
//                 include: {
//                     notifications: true
//                 }
//                 },
//                 notifications: true
//             }
//             }
//         }
//         })
//         console.log(`Created user with id: ${user.id}`)
//     }
//     console.log(`Seeding finished.`)
//     }
// //Include property specifies what related data should be fetched from DB with main data.
// main()
//     .catch((e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })