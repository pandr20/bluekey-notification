import mqtt from 'mqtt';
import { createNotification } from './prismaQueries';

const mqttBrokerUrl = 'mqtt://localhost:1883';

export async function publishNotification(clientId, notificationData) {
    const client = mqtt.connect(mqttBrokerUrl, { clientId, clean: false });
  
    client.on('connect', async () => {
      console.log('Connected to MQTT broker.');
  
      // Save notification to the database
      const createdNotification = await createNotification(notificationData);
  
      // Publish the notification to the related service topic
      const topic = `services/${notificationData.serviceId}/notifications`;
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

