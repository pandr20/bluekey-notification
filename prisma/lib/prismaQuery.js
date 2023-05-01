
import { clerkClient } from '@clerk/clerk-sdk-node';
//import { Clerk } from '@clerk/clerk-sdk-node';


//const clerkClient = new Clerk(process.env.CLERK_SECRET_KEY);
console.log(process.env.CLERK_SECRET_KEY);

async function createServicesAndSubscribeUsers() {
    // Create the services separately
    /* const service1 = await prisma.service.create({
      data: {
        counterpart: 'ABC Shipping Co.',
        cp_date: new Date('2022-01-05'),
        laycan_range: '2022-01-10 - 2022-01-15',
        eta_load: new Date('2022-01-12'),
        loading_port: 'Port A',
        eta_disch: new Date('2022-01-25'),
        discharge_port: 'Port B',
        freight: 7500,
        status: 'ongoing',
      },
    });
  
    const service2 = await prisma.service.create({
      data: {
        counterpart: 'DEF Shipping Co.',
        cp_date: new Date('2022-02-10'),
        laycan_range: '2022-02-15 - 2022-02-25',
        eta_load: new Date('2022-02-18'),
        loading_port: 'Port C',
        eta_disch: new Date('2022-03-05'),
        discharge_port: 'Port D',
        freight: 10000,
        status: 'completed',
      },
    });
  
    const service3 = await prisma.service.create({
      data: {
        counterpart: 'GHI Shipping Co.',
        cp_date: new Date('2022-03-20'),
        laycan_range: '2022-03-25 - 2022-04-05',
        eta_load: new Date('2022-04-01'),
        loading_port: 'Port E',
        eta_disch: new Date('2022-04-15'),
        discharge_port: 'Port F',
        freight: 12500,
        status: 'ongoing',
      },
    });
  
    console.log('Service 1 ID:', service1.id);
    console.log('Service 2 ID:', service2.id);
    console.log('Service 3 ID:', service3.id); */


    const userList = await clerkClient.getUserList();
    userList.data.forEach((user) => {
        console.log(`User ID: ${user.id}, First Name: ${user.firstName}`);
      });
}

createServicesAndSubscribeUsers();