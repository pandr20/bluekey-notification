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

  const mockClient = function() {
    this.publish = publishMock;
    this.end = jest.fn();
    this.on = jest.fn((event, listener) => {
      if (event === 'connect') {
        // Simulate the connection event
        listener();
      }
    });
  };

  const connectMock = jest.fn((url, options) => {
    return new mockClient();
  });

  return { connect: connectMock };
});



/*
  const connectMock = jest.fn((url, options) => {
    const client = {
      publish: publishMock,
      end: jest.fn(),
      on: jest.fn((event, listener) => {
        if (event === 'connect') {
          // Simulate the connection event
          listener();
        }
      }),
    };
    return client;
  });

  return { connect: connectMock };
}); 
*/


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
      const clientMock = {
        publish: publishMock,
        end: jest.fn(),
        on: jest.fn((event, listener) => {
          if (event === 'connect') {
            // Simulate the connection event
            listener();
          }
        }),
      };
  
      mqtt.connect.mockImplementationOnce(() => clientMock);

      // Mock console.error to check if the error is logged
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
      // Call the publishNotification function
      await publishNotification(clientId, serviceId, notificationData);
    
      expect(mqtt.connect).toHaveBeenCalledWith('mqtt://mqtt:1883', {
        clientId,
        clean: false,
      });
    
      expect(clientMock.publish).toHaveBeenCalledWith(
        `services/${serviceId}/notifications`,
        JSON.stringify({ id: 123 }),
        { qos: 2, retain: false },
        expect.any(Function)
      );
    
      // Verify the error was logged to the console
      expect(consoleSpy).toHaveBeenCalledWith('Error publishing to topic: services/646a078658a06d0086007635/notifications', new Error('Publishing error'));
    
      expect(require('../prisma/queries/prismaQueries').createNotification).toHaveBeenCalled();
    
      // Restore console.error
      consoleSpy.mockRestore();
    });

  
    it('should handle MQTT client errors', async () => {
      const clientId = 'testClient';
      const serviceId = '646a078658a06d0086007635';
      const notificationData = { message: 'Test notification' };
  
      const errorMock = new Error('MQTT client error');
      const clientMock = {
        publish: jest.fn((topic, payload, options, callback) => {
          callback(undefined);
        }),
        end: jest.fn(),
        on: jest.fn((event, listener) => {
          if (event === 'connect') {
            listener();
          } else if (event === 'error') {
            listener(errorMock);
          }
        }),
      };
  
      mqtt.connect.mockImplementationOnce(() => clientMock);
  
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
      await publishNotification(clientId, serviceId, notificationData);
  
      expect(consoleSpy).toHaveBeenCalledWith('MQTT client error:', errorMock);
  
      consoleSpy.mockRestore();
    });
  
    it('should handle MQTT client disconnection', async () => {
      const clientId = 'testClient';
      const serviceId = '646a078658a06d0086007635';
      const notificationData = { message: 'Test notification' };
  
      const clientMock = {
        publish: jest.fn((topic, payload, options, callback) => {
          callback(undefined);
        }),
        end: jest.fn(),
        on: jest.fn((event, listener) => {
          if (event === 'connect') {
            listener();
          } else if (event === 'close') {
            listener();
          }
        }),
      };
  
      mqtt.connect.mockImplementationOnce(() => clientMock);
  
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
      await publishNotification(clientId, serviceId, notificationData);
  
      expect(consoleSpy).toHaveBeenCalledWith('MQTT client disconnected.');
  
      consoleSpy.mockRestore();
    });
});