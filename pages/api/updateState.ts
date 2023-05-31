// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, unread, read, processing, completed } = req.body;

    const updatedState = await prisma.states.update({
      where: { id },
      data: {
        unread,
        read,
        processing,
        completed,
      },
    });

    return res.status(200).json(updatedState);
  } catch (error) {
    return res.status(500).json(error);
  }
}
