// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Prisma Query for getting all states
    const data = await prisma.states.findMany();
  
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
