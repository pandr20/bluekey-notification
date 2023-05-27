// pages/api/subscribe.ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { subscribeUserToServices } from "../../mqtt/mqttSubscriber.js";
import { addServiceSubscription } from "../../prisma/queries/prismaQueries.js"
import { MqttClient } from "mqtt"

// API route handler for subscribing a user to a service
export default async function handler( req: NextApiRequest,res: NextApiResponse) {
  
    const { clientId, userId, serviceId } = req.body;
    console.log("Subscribe Request- Received data :", { clientId, userId, serviceId });
  
  //Checks if the required parameters are received
  if (!clientId || !userId || !serviceId) { 
    return res.status(400).json({ message: "clientId, userId, and serviceId are required" });
  }

  try {
    // Add the service subscription in the database
    console.log(`Adding service subscription for person ${userId} to service ${serviceId}`)
    await addServiceSubscription(userId, serviceId);

    //Subscribe the user to the service using MQTT
    await subscribeUserToServices(clientId, userId, (client: MqttClient) => { 
        console.log(`User ${userId} subscribed to services with client id ${clientId}`);
      });
    
    //Error handling
      return res.status(200).json({ message: 'User subscribed to service successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error subscribing user to service' });
    }
};

