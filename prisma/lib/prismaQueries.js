import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Retrieves all services related to the provided user ID.
export async function getUserServices(userId) {
  return await prisma.service.findMany({
    where: {
      userId: userId,
    },
  });
}
//Creates a new notification with the provided data.
export async function createNotification(notificationData) {
  return await prisma.notification.create({
    data: notificationData,
  });
}