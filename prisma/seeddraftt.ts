// // ./prisma/seed.ts

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const user1 = await prisma.user.create({
//     data: {
//       username: 'user1',
//       password: 'password1',
//       role: 'admin',
//       services: {
//         connect: [
//           { serviceId: '1' },
//         ],
//       },
//       notifications: {
//         connect: [
//           { notificationId: '1' },
//         ],
//       },
//     },
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       username: 'user2',
//       password: 'password2',
//       role: 'user',
//       services: {
//         connect: [
//           { serviceId: '2' },
//         ],
//       },
//       notifications: {
//         connect: [
//           { notificationId: '2' },
//         ],
//       },
//     },
//   });

//   const state1 = await prisma.state.create({
//     data: {
//       state: 'state1',
//       services: {
//         connect: [
//           { serviceId: '3' },
//         ],
//       },
//       notifications: {
//         connect: [
//           { notificationId: '3' },
//         ],
//       },
//     },
//   });

//   const service1 = await prisma.service.create({
//     data: {
//       service: 'service1',
//       state: 'active',
//       message: 'Service 1 is active',
//       users: {
//         connect: [
//           { userId: '1' },
//         ],
//       },
//       notifications: {
//         connect: [
//           { notificationId: '4' },
//           { notificationId: '5' },
//         ],
//       },
//     },
//   });

//   const service2 = await prisma.service.create({
//     data: {
//       service: 'service2',
//       state: 'inactive',
//       message: 'Service 2 is inactive',
//       users: {
//         connect: [
//           { userId: '2' },
//         ],
//       },
//       notifications: {
//         connect: [
//           { notificationId: '6' },
//         ],
//       },
//     },
//   });

//   console.log('Seeding complete!');
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });