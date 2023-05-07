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
    const {
      id,
      counterpart,
      cp_date,
      laycan_range,
      eta_load,
      loading_port,
      eta_disch,
      discharge_port,
      freight,
      status,
    } = req.body;

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        counterpart,
        cp_date,
        laycan_range,
        eta_load,
        loading_port,
        eta_disch,
        discharge_port,
        freight,
        status,
      },
    });

    return res.status(200).json(updatedService);
  } catch (error) {
    return res.status(500).json(error);
  }
}
