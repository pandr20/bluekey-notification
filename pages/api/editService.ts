// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/editServices.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { publishNotification } from "../../mqtt/mqttPublisher.js";
import { updatedService } from "../../prisma/queries/prismaQueries.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { serviceId, editedService, message, clientId } = req.body;
    console.log("editService API: Successfully received data, most relevant:", { serviceId, clientId });

    try {
      // Update the service in the database
      const { id, ...updatedFields } = editedService;
      await updatedService(serviceId, updatedFields);
      console.log(`Service ${serviceId} has been updated`);

      //Notification Object
      const notificationData = {
        state: 'UNREAD',
        isRead: false,
        priority: 1,
        message,
        serviceId,
      };

      console.log(`Publishing notification for service ${serviceId}`);

      // Call the publishNotification function with the clientId, serviceId, and notificationData
      await publishNotification(clientId, serviceId, notificationData);

      res.status(200).json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the service." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
