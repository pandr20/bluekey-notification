// import { PrismaClient, UserCreateInput } from '@prisma/client';
// import { ObjectId } from 'mongodb';

// const prisma = new PrismaClient();

// async function main() {
//   const user1Data: UserCreateInput = {
//     username: 'user1',
//     password: 'password1',
//     role: 'admin',
//     services: {
//       create: [
//         {
//           userId: new ObjectId(),
//           data: 'service1 data',
//           notifications: {
//             create: [
//               {
//                 serviceId: new ObjectId(),
//                 userId: new ObjectId(),
//                 stateId: new ObjectId(),
//                 message: 'notification1 message',
//                 isRead: false,
//                 priority: 'high',
//               },
//               {
//                 serviceId: new ObjectId(),
//                 userId: new ObjectId(),
//                 stateId: new ObjectId(),
//                 message: 'notification2 message',
//                 isRead: false,
//                 priority: 'low',
//               },
//             ],
//           },
//         },
//       ],
//     },
//     notifications: {
//       create: [
//         {
//           serviceId: new ObjectId(),
//           userId: new ObjectId(),
//           stateId: new ObjectId(),
//           message: 'notification3 message',
//           isRead: false,
//           priority: 'medium',
//         },
//       ],
//     },
//   };

//   const user1 = await prisma.user.create({
//     data: user1Data,
//   });

//   console.log('Seeding complete!');
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });