"use client";

import { useUser } from "@clerk/nextjs";
import VoyageData from "../data/VoyageData.json";
import UserDropdown from "./UserDropDown"
import React, { useEffect, useState } from "react";

export default function Voyage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getServices");
        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }
        const result = await res.json();
        setServices(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
        fetchData();
  }, []);


const Voyage: React.FC<Voyageprops> = ({ voyage }) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    console.log("showDropdown value changed:", showDropdown);
  }, [showDropdown]);

  const handleAssignButtonClick = () => {
    setShowDropdown(!showDropdown);
    console.log("Message")
  };
  




  const renderAssignButton = () => {
    if (user?.firstName === "Manager") {
      return (
        <>
        <button 
        className="bg-blue hover:bg-dimBlue text-primary-black font-bold py-2 px-4 rounded absolute top-0 right-0 mt-2 mr-2"
        onClick={handleAssignButtonClick}
        >
          Assign
        </button>
        {showDropdown && <UserDropdown />}

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

 

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {services.map(
        (service: {
          id: string;
          counterpart: string;
          cp_date: string;
          laycan_range: string;
          eta_load: string;
          loading_port: string;
          eta_disch: string;
          discharge_port: string;
          freight: number;
          status: string;
        }) => (
          <div className="border border-gray-300 rounded-lg shadow-lg p-6 m-6 relative">
            <h2 className="text-white text-lg font-bold mb-4">
              Voyage {service.id}
            </h2>
            {renderAssignButton()}
            {renderEditButton()}
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-bold text-white">Counterpart:</p>
                <p className="text-dimWhite">{service.counterpart}</p>
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-bold text-white">ETA Load:</p>
                <p className="text-dimWhite">{service.eta_load}</p>
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-bold text-white">Freight:</p>
                <p className="text-dimWhite">{service.freight}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-bold text-white">Cp Date:</p>
                <p className="text-dimWhite">{service.cp_date}</p>
                <p className="font-bold text-white mt-2">Laycan Range:</p>
                <p className="text-dimWhite">{service.laycan_range}</p>
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-bold text-white">Loading port:</p>
                <p className="text-dimWhite">{service.loading_port}</p>
                <p className="font-bold text-white mt-2">Discharge port:</p>
                <p className="text-dimWhite">{service.discharge_port}</p>
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-bold text-white">ETA Discharge:</p>
                <p className="text-dimWhite">{service.eta_disch}</p>
                <p className="font-bold text-white">Status:</p>
                <p className="text-dimWhite">{service.status}</p>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
