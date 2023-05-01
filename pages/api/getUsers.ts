// pages/api/getUsers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from '@clerk/clerk-sdk-node';
import cors, { CorsOptions } from 'cors';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const corsOptions: CorsOptions= {
  origin: '*',
  methods: ['POST', 'GET', 'HEAD'],
};

const corsMiddleware = cors(corsOptions);

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // Run the middleware
  try {
    await runMiddleware(req, res, corsMiddleware)

    const users = await clerkClient.users.getUserList();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
}