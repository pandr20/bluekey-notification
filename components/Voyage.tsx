import React from "react";
import VoyageData from "../data/VoyageData.json";

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

const Voyage: React.FC<Voyageprops> = ({ voyage }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6">
      <h2 className=" text-white text-lg font-bold mb-4">Voyage {voyage.id}</h2>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Counterpart:</p>
          <p className="text-dimWhite">{voyage.counterpart}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">ETA Load:</p>
          <p className="text-dimWhite">{voyage.eta_load}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Freight:</p>
          <p className="text-dimWhite">{voyage.freight}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Cp Date:</p>
          <p className="text-dimWhite">{voyage.cp_date}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Loading port:</p>
          <p className="text-dimWhite">{voyage.loading_port}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">ETA Discharge:</p>
          <p className="text-dimWhite">{voyage.eta_disch}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Laycan Range:</p>
          <p className="text-dimWhite">{voyage.laycan_range}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Discharge port:</p>
          <p className="text-dimWhite">{voyage.discharge_port}</p>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">Status:</p>
          <p className="text-dimWhite">{voyage.status}</p>
        </div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Voyage;
