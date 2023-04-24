import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import VoyageData from "../data/VoyageData.json";
import { PrismaClient } from "@prisma/client";

type Voyageprops = {
  voyage: {
    id: number;
    counterpart: string;
    cp_date: string;
    laycan_range: string;
    eta_load: string;
    loading_port: string;
    eta_disch: string;
    discharge_port: string;
    freight: number;
    status: string;
  };
};

const prisma = new PrismaClient();

const Voyage: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [voyage, setVoyage] = useState<Voyageprops | null>(null);

  useEffect(() => {
    async function getVoyage() {
      const prisma = new PrismaClient();
      const voyageData = await prisma.voyage.findMany();
      console.log(voyageData);
    }

    getVoyage();
  }, []);

  const renderAssignButton = () => {
    if (user?.firstName === "Manager") {
      return (
        <>
          <button className="bg-blue hover:bg-dimBlue text-primary-black font-bold py-2 px-4 rounded absolute top-0 right-0 mt-2 mr-2">
            Assign
          </button>
        </>
      );
    }
    return null;
  };

  const renderEditButton = () => {
    if (user?.firstName === "Admin") {
      return (
        <>
          <button className="bg-blue hover:bg-dimBlue text-primary-black font-bold py-2 px-7 rounded absolute top-0 right-20 mt-2 mr-6">
            Edit
          </button>
        </>
      );
    }
    return null;
  };

  if (!isLoaded) return null;

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 m-6 relative">
      <h2 className="text-white text-lg font-bold mb-4">Voyage {voyage?.id}</h2>
      {renderAssignButton()}
      {renderEditButton()}
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Counterpart:</p>
          <p className="text-dimWhite">{voyage?.counterpart}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">ETA Load:</p>
          <p className="text-dimWhite">{voyage?.eta_load}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Freight:</p>
          <p className="text-dimWhite">{voyage?.freight}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Cp Date:</p>
          <p className="text-dimWhite">{voyage?.cp_date}</p>
          <p className="font-bold text-white mt-2">Laycan Range:</p>
          <p className="text-dimWhite">{voyage?.laycan_range}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Loading port:</p>
          <p className="text-dimWhite">{voyage?.loading_port}</p>
          <p className="font-bold text-white mt-2">Discharge port:</p>
          <p className="text-dimWhite">{voyage?.discharge_port}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">ETA Discharge:</p>
          <p className="text-dimWhite">{voyage?.eta_disch}</p>
          <p className="font-bold text-white">Status:</p>
          <p className="text-dimWhite">{voyage?.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Voyage;
