import { publishNotification } from './mqttPublisher';
import mqtt from 'mqtt';

jest.mock('../prisma/queries/prismaQueries', () => ({
  createNotification: jest.fn(() => Promise.resolve({ id: 123 })),
}));

jest.mock('mqtt', () => {
  const publishMock = jest.fn((topic, payload, options, callback) => {
    // Simulate successful publishing by invoking the callback without an error
    callback(undefined);
  });

  const connectMock = jest.fn((url, options) => {
    return {
      publish: publishMock,
      end: jest.fn(),
    };
  });

  return { connect: connectMock };
});

describe('publishNotification', () => {
  it('should publish a notification to the MQTT broker', async () => {
    // Provide the necessary data
    const clientId = 'testClient';
    const serviceId = '6457f8f6f064401fb298435a';
    const notificationData = { message: 'Test notification' };

    // Call the publishNotification function
    await publishNotification(clientId, serviceId, notificationData);

    // Verify the MQTT client is connected and published to the correct topic
    expect(mqtt.connect).toHaveBeenCalledWith('mqtt://mqtt:1883', {
      clientId,
      clean: false,
    });
    expect(mqtt.connect().publish).toHaveBeenCalledWith(
      `services/${serviceId}/notifications`,
      JSON.stringify({ id: 123 }),
      { qos: 2, retain: false },
      expect.any(Function)
    );

    // Verify the Prisma query function was called
    expect(require('../prisma/queries/prismaQueries').createNotification).toHaveBeenCalledWith(notificationData);
  });

  it('should handle publishing errors', async () => {
    // Provide the necessary data
    const clientId = 'testClient';
    const serviceId = '646a078658a06d0086007635';
    const notificationData = { message: 'Test notification' };

    // Mock the publish function to simulate an error
    const publishMock = jest.fn((topic, payload, options, callback) => {
      // Simulate a publishing error by invoking the callback with an error
      callback(new Error('Publishing error'));
    });
    mqtt.connect.mockImplementationOnce(() => ({
      publish: publishMock,
      end: jest.fn(),
    }));

    // Call the publishNotification function
    await publishNotification(clientId, serviceId, notificationData);

    // Verify the MQTT client is connected and published to the correct topic
    expect(mqtt.connect).toHaveBeenCalledWith('mqtt://mqtt:1883', {
      clientId,
      clean: false,
    });
    expect(mqtt.connect().publish).toHaveBeenCalledWith(
      `services/${serviceId}/notifications`,
      JSON.stringify({ id: 123 }),
      { qos: 2, retain: false },
      expect.any(Function)
    );

    // Verify the Prisma query function was called
    expect(require('../prisma/queries/prismaQueries').createNotification).toHaveBeenCalledWith(notificationData);
  });
});