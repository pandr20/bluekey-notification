import mqtt from "mqtt";
import { PrismaClient } from '@prisma/client';
//import { getUserServices } from './prismaQueries';


const prisma = new PrismaClient();
const mqttBrokerUrl = 'mqtt://localhost:1883';


export async function subscribeUserToServices(clientId, userId) {
  const client = mqtt.connect(mqttBrokerUrl, { clientId, clean: false });

  client.on('connect', async () => {
    console.log('Subscriber connected to MQTT broker');

    // Get the services the user is subscribed to
    const services = await prisma.service.findMany({
      where: {
        userId: userId,
      },
    });
    

    // Get the services the user is subscribed to
    //Delete above query, and use this once confirmed to work
    //const services = await getUserServices();

  // Subscribe to MQTT topics for each service
    services.forEach((service) => {
        client.subscribe(`service/${service.id}/notifications`, { qos: 2 });
      });
    });
  
    client.on('message', async (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
  
      // Process the received message and update the database
      // ...

      // Parse the received message
      const notificationData = JSON.parse(message.toString());

      // Associate the user with the existing notification
      await addUserToNotification(userId, notificationData.id);

      console.log(`User ${userId} associated with notification ${notificationData.id}`);
      
    });
  }

