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
    on: jest.fn(),
    emit: jest.fn()
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

  it('should subscribe to MQTT topics and handle incoming messages', async () => {
    // Mock data
    const clientId = 'testClient';
    const userId = 'testUser';

    const clientMock = mqtt.connect(); // Create the client mock

    const emitSpy = jest.spyOn(clientMock, 'emit');


    //subscribeUserToServices function
    await subscribeUserToServices(clientId, userId, client => {
      // MQTT events (made here to avoid callback error)
      client.on.mockImplementation((event, callback) => {
        if (event === 'connect') {
          callback();
        } else if (event === 'message') {
          callback('services/646a078658a06d0086007635/notifications', JSON.stringify({ id: 123 }));
        }
      });


      
      // Testing processing of message
      client.emit('message', 'services/646a078658a06d0086007635/notifications', JSON.stringify({ id: 123 }));

      expect(mqtt.connect).toHaveBeenCalledWith('mqtt://mqtt:1883', { clientId, clean: false });
      expect(client.subscribe).toHaveBeenCalledWith('services/646a078658a06d0086007635/notifications', { qos: 2 });
      expect(addUserToNotification).toHaveBeenCalledWith(userId, 123);

      expect(emitSpy).toHaveBeenCalledWith('message', 'services/646a078658a06d0086007635/notifications', JSON.stringify({ id: 123 }));
    });
  }, 10000); // 10 seconds
});