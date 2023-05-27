import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get the services the user is subscribed to
export async function getUserServices(userId) {
  return await prisma.subscription.findMany({
    where: {
      userId: userId,
    },
    include: {
      service: true,
    },
  });
}

//Creates a new notification with the provided data.
export async function createNotification(notificationData) {
  return await prisma.notification.create({
    data: {
      ...notificationData,
      userId: undefined,
    },
  });
}

// Add service subscription for a user
export async function addServiceSubscription(userId, serviceId) {
  return await prisma.subscription.create({
    data: {
      userId: userId,
      serviceId: serviceId,
    },
  });
}

/*
export async function updatedService(serviceId, editedService) {
  return await prisma.service.update({
    where: { id: serviceId },
    data: editedService,
  });
}
*/

export async function updatedService(serviceId, editedService) {
  try {
    const updated = await prisma.service.update({
      where: { id: serviceId },
      data: editedService,
    });
    console.log("Service updated to:", updated);
    return updated;
  } catch (error) {
    console.log("Error in updatedService:", error);
    throw error;
  }
}

// Associates a user with a received notification
export async function addUserToNotification(userId, notificationId) {
  return await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      userId: userId,
    },
  });
}
