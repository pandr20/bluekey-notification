import { v4 as uuidv4 } from 'uuid';
import { publishNotification } from './mqttPublisher.js';
import { subscribeUserToServices } from './mqttSubscriber.js';

async function test() {
  const userId = '643ab2b093862dfd4111ec85';
  const serviceId = '643ab2b193862dfd4111ec87'

  const subscriberClientId = uuidv4();
  const publisherClientId = uuidv4();

  console.log(`Using userId: ${userId}`);

  subscribeUserToServices(subscriberClientId, userId, (subscriberClient) => {

    // Your code for publishing a notification
    const notificationData = {
      user: {
        connect: {
          id: '643ab2b093862dfd4111ec85',
        },
      },
      service: {
        connect: {
          id: '643ab2b193862dfd4111ec87',
        },
      },
      state: 'UNREAD',
      isRead: false,
      priority: 1,
      message: 'Pleaseeeeeee work',
    }

    console.log('Publishing a notification...');
    publishNotification(publisherClientId, serviceId, notificationData);

    // Disconnect the subscriber client after a delay
    setTimeout(() => {
      console.log('Ending the subscriber connection...');
      subscriberClient.end(true);
      console.log('Test completed')
    }, 5000);
  });
}

test();