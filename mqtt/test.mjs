import { subscribeUserToServices } from './mqttSubscriber.js';
import { publishNotification } from './mqttPublisher.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getFirstUserId() {
    const user = await prisma.user.findFirst();
    return user.id;
  }

async function testMQTT() {

    const testUserId = await getFirstUserId();
// Call the subscribeToServices function from subscriber file
// Pass the testUserId as an argument
    await subscribeUserToServices(testUserId);

//  a published notification
    const testNotification = {
        serviceId: 'test_service_id',
        message: 'Test notification message',
    };

// Call the publishNotification function
// testNotification object
    await publishNotification(testNotification);

// Give the subscriber some time to process the message before exiting
    setTimeout(() => {
    process.exit(0);
        }, 5000);
    }

    testMQTT().catch((error) => {
        console.error('Error during test:', error);
});
