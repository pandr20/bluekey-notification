import mqtt from "mqtt";
import { addUserToNotification, getUserServices } from '../prisma/queries/prismaQueries.js';

const mqttBrokerUrl = 'mqtt://mqtt:1883';

export async function subscribeUserToServices(clientId, userId, callback) {
  const client = mqtt.connect(mqttBrokerUrl, { clientId, clean: false });

  client.on('connect', async () => {
    console.log('Subscriber connected to MQTT broker');

    // Get the services the user is subscribed to
    const subscriptions = await getUserServices();

    const services = subscriptions.map(subscription => subscription.service);

    console.log('User subscribed services:', services);

  // Subscribe to MQTT topics for each service
    services.forEach((service) => {
        client.subscribe(`services/${service.id}/notifications`, { qos: 2 });
      });

      callback(client)
    });
  
    client.on('message', async (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
  
      // Parse the received message
      const notificationData = JSON.parse(message.toString());

      console.log("Processing received message...");
      // Associate the user with the existing notification
      await addUserToNotification(userId, notificationData.id);

      console.log(`User ${userId} associated with notification ${notificationData.id}`);
      
    });
    
  }

