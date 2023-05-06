// pages/api/getUsers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from '@clerk/clerk-sdk-node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {

    const users = await clerkClient.users.getUserList();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
}