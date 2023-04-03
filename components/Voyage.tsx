import React from "react";
import VoyageData  from "../data/VoyageData.json";


type VoyageProps = {
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

const Voyage: React.FC<VoyageProps> = ({ voyage }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">Voyage {voyage.id}</h2>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">Counterpart:</p>
          <p>{voyage.counterpart}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">CP Date:</p>
          <p>{voyage.cp_date}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">Laycan Range:</p>
          <p>{voyage.laycan_range}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">ETA Load:</p>
          <p>{voyage.eta_load}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">Loading Port:</p>
          <p>{voyage.loading_port}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">ETA Discharge:</p>
          <p>{voyage.eta_disch}</p>
        </div>
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">Discharge Port:</p>
          <p>{voyage.discharge_port}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-gray-600">Freight:</p>
          <p>{voyage.freight}</p>
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-600">Status:</p>
          <p>{voyage.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Voyage;
