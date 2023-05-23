import mqtt from 'mqtt';
import { PrismaClient } from '@prisma/client';
import { subscribeUserToServices } from './mqttSubscriber';
import { addUserToNotification } from '../prisma/queries/prismaQueries';

jest.mock('../prisma/queries/prismaQueries', () => ({
  addUserToNotification: jest.fn(() => Promise.resolve())
}));

jest.mock('mqtt', () => {
  const clientMock = {
    subscribe: jest.fn(),
    on: jest.fn((event, callback) => {
      if (event === 'connect') {
        callback();
      } else if (event === 'message') {
        callback('services/646a078658a06d0086007635/notifications', JSON.stringify({ id: 123 }));
      }
    })
  };
  return { connect: jest.fn(() => clientMock) };
});

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        subscription: {
          findMany: jest.fn(() => Promise.resolve([
            { service: { id: '646a078658a06d0086007635' } }
          ]))
        }
      };
    })
  };
});

describe('subscribeUserToServices', () => {
    it('should subscribe to MQTT topics and handle incoming messages', (done) => {
        // Provide the necessary data
        const clientId = 'testClient';
        const userId = 'testUser';
    
        // Call the subscribeUserToServices function
        subscribeUserToServices(clientId, userId, client => {
          try {
            expect(mqtt.connect).toHaveBeenCalledWith('mqtt://mqtt:1883', { clientId, clean: false });
            expect(client.subscribe).toHaveBeenCalledWith('services/646a078658a06d0086007635/notifications', { qos: 2 });
            expect(addUserToNotification).toHaveBeenCalledWith(userId, 123);
            done();
          } catch (error) {
            done(error);
          }
        });
      });
    });