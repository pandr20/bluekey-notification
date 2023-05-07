"use client";

import { useUser } from "@clerk/nextjs";
import VoyageData from "../data/VoyageData.json";
import UserDropdown from "./UserDropDown";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Voyage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  // Which service is being interacted with
  const [selectedServiceId, setSelectedServiceId] = useState("");
  
  const [editedService, setEditedService] = useState(null);

  const clientId = uuidv4(); // Generates a unique clientId (Used for MQTT session)

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


  // Function to generate a message based on edited fields
function generateEditedMessage(service: any, editedService: any): string {
  //Need logic for how we compare the messages, idk how

  
  return "Service has been edited"; // Should return the edited message
}

  useEffect(() => {
    if (!editedService) return; //Won't start if editedService is not set

    async function editService() {
      try {
        const res = await fetch("/api/editService", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          //Change to serviceId, clientId, originalService, editedService
          body: JSON.stringify(editedService),
          //.. message: generateEditedMessage(originalService, editedService),
        });

        if (!res.ok) {
          throw new Error("Failed to update Service")
        }

        
      } catch (error) {
        
      }
    }
  })
  

  //Debug log for when dropdown value changes
  useEffect(() => {
    console.log("showDropdown value changed:", showDropdown);
  }, [showDropdown]);

  //Toggle dropdown and set the interacted selectedServiceId when Assign is clicked
  const handleAssignButtonClick = (serviceId: string) => {
    setShowDropdown(!showDropdown);
    setSelectedServiceId(serviceId);
    console.log("Assign button clicked with serviceId:", serviceId);
  };

  //Render for Manager users
  const renderAssignButton = (serviceId: string) => {
    if (user?.firstName === "Manager") {
      return (
        <div className="flex flex-col">
          <button
            className="bg-blue hover:bg-dimBlue text-primary-black font-bold py-2 px-4 rounded absolute top-0 right-0 mt-2 mr-2"
            onClick={() => handleAssignButtonClick(serviceId)}
          >
            Assign
          </button>
          <div className="absolute end-0 p-3">
            {/* When showDropdown is true, UserDropDown is rendered and receives the two props*/}
            {showDropdown && (
              <UserDropdown clientId={clientId} serviceId={selectedServiceId} />
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  //Render for manager users
  const renderEditButton = () => {
    if (user?.firstName === "Manager") {
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
            {renderAssignButton(service.id)}
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
