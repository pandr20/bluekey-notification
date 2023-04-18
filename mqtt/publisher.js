// publisher.js

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  console.log('Publisher connected to MQTT broker');

  // Publish a message to the topic
  client.publish('test/topic', 'Hello World!');
});