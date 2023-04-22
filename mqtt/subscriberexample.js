// subscriber.js

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  console.log('Subscriber connected to MQTT broker');

  // Subscribe to a topic
  client.subscribe('test/topic');
});

client.on('message', function (topic, message) {
  // Log the received message to the console
  console.log('Received message:', message.toString());
});