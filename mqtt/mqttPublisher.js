import mqtt from 'mqtt';
import { createNotification } from '../prisma/lib/prismaQueries.js';

const mqttBrokerUrl = 'mqtt://localhost:1883';

//Should be added in the respective Next.js file 
//Or in Publisher & Subscriber IF it doesn't matter if publ & sub has the same clientID- If so, remove clientId in the function
  //import { v4 as uuidv4 } from 'uuid';
  //const clientId = uuidv4(); // Generates a unique clientId

export async function publishNotification(clientId, serviceId, notificationData) {
    const client = mqtt.connect(mqttBrokerUrl, { clientId, clean: false });
  
    client.on('connect', async () => {
      console.log('Publisher Connected to MQTT broker.');
      

      // Save notification to the database
      const createdNotification = await createNotification(notificationData);
  
      // Publish the notification to the related service topic
      const topic = `services/${serviceId}/notifications`;
      const payload = JSON.stringify(createdNotification);
      client.publish(topic, payload, {qos: 2}, (err) => {
        if (err) {
          console.error(`Error publishing to topic: ${topic}`, err);
        } else {
          console.log(`Published notification to topic: ${topic}`);
        }
      });
  
      client.end();
    });
  
    client.on('error', (err) => {
      console.error('MQTT client error:', err);
    });
  
    client.on('close', () => {
      console.log('MQTT client disconnected.');
    });
  }

