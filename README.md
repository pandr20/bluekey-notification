## Notification System - A Tailored Shipping Platform

Bachelor Project 2023 - Software Engineering, University of Southern Denmark

Students:

Rasmus Jacobsen - rasmj20@student.sdu.dk
Patrick Andreasen - pandr20@student.sdu.dk

Supervisor: Kamrul Islam Shahin - kish@mmmi.sdu.dk

In collaboration with: BlueKey ApS

## Running Locally (With Docker)

Prerequisites: Docker https://www.docker.com/

1.

- IMPORTANT: If testing our source code, ignore this.

If creating your own, replace the .env keys with your own.
```
DATABASE_URL=<YOUR OWN MONGODB DATABASE>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR OWN KEY>
CLERK_SECRET_KEY=<YOUR OWN KEY>
```
2.
First, spin up the docker-containers with this command:
```
docker-compose up --build
```

(If you only want to test the frontend, this will do)

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. Login with the following credentials:
```
Username: manager
Password: CoolProgram
```

## Additionally features:

- Testing the mqtt broker
  1. Switch to the mqtt-test-branch
  2. run the ```npm install``` command
  3. run ```npx jest``` to test the test suites of the mqtt client code


## Deploy(ed) on Vercel

When written the frontend of this project is deployed on Vercel, on this link: https://bluekey-notification.vercel.app/

To do it yourself, the easiest way to deploy your Next.js app would be to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
