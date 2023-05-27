import mqtt from "mqtt";
import { createNotification } from "../prisma/queries/prismaQueries.js";

const mqttBrokerUrl = "mqtt://mqtt:1883";

export async function publishNotification(
  clientId,
  serviceId,
  notificationData
) {
  const client = mqtt.connect(mqttBrokerUrl, { clientId, clean: false });

  client.on("connect", async () => {
    console.log("Publisher Connected to MQTT broker.");

    // Save notification to the database
    const createdNotification = await createNotification(notificationData);

    // Publish the notification to the related service topic
    const topic = `services/${serviceId}/notifications`;
    const payload = JSON.stringify(createdNotification);
    client.publish(topic, payload, { qos: 2, retain: false }, (err) => {
      if (err) {
        console.error(`Error publishing to topic: ${topic}`, err);
      } else {
        console.log(`Published notification to topic: ${topic}`);
      }
    });
    client.end();
  });

  client.on("error", (err) => {
    console.error("MQTT client error:", err);
  });

  client.on("close", () => {
    console.log("MQTT client disconnected.");
  });
}
