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
    data: {
      ...notificationData,
      userId: undefined,
    }
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
  console.log("Entering updatedService function");
  try {
    const updated = await prisma.service.update({
      where: { id: serviceId },
      data: editedService,
    });
    console.log("Service updated:", updated);
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