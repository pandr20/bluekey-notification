//Voyage.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import UserDropdown from "./UserDropDown";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Voyage() {
  const { user } = useUser();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editable, setEditable] = useState(false);

  // Which service is being interacted with
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const [editedService, setEditedService] = useState("");
  const [originalService, setOriginalService] = useState("");

  const clientId = uuidv4(); // Generates a unique clientId (Used for MQTT session)

  const messageTest = `Service with id ${selectedServiceId}\n has been updated from \n ${JSON.stringify(
    originalService
  )} \n To \n ${JSON.stringify(editedService)}`;

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

  useEffect(() => {
    if (!editedService) return; //Won't start if editedService is not set

    async function editService() {
      try {
        const res = await fetch("/api/editService", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceId: selectedServiceId,
            editedService,
            clientId,
            message: messageTest,
          }),

          //.. message: generateEditedMessage(originalService, editedService),
        });

        if (!res.ok) {
          throw new Error("Failed to update Service");
        }
      } catch (error) {
        console.error(error);
      }
    }
    editService();
  }, [editedService]);

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

  const handleEditButtonClick = (serviceId: string) => {
    const service = services.find((service) => service.id === serviceId);
    setOriginalService(service);
    setEditedService(service);
    setEditable((prevEditable) => !prevEditable);
    setSelectedServiceId(serviceId);
    console.log("Edit button clicked with serviceId:", serviceId);
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
            {/* When showDropdown is true and the selectedServiceId matches the current serviceId, UserDropDown is rendered and receives the two props*/}
            {showDropdown && selectedServiceId === serviceId && (
              <UserDropdown clientId={clientId} serviceId={selectedServiceId} />
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  //Render for manager users
  const renderEditButton = (serviceId: string) => {
    if (user?.firstName === "Manager") {
      const isEditable = editable && selectedServiceId === serviceId;
      return (
        <>
          <button
            className="bg-blue hover:bg-dimBlue text-primary-black font-bold py-2 px-7 rounded absolute top-0 right-20 mt-2 mr-6"
            onClick={() => handleEditButtonClick(serviceId)}
          >
            {isEditable ? "Save" : "Edit"}
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
        }) => {
          const isEditable = editable && selectedServiceId === service.id;
          return (
            <div className="border border-gray-300 rounded-lg shadow-lg p-6 m-6 relative">
              <h2 className="text-white text-lg font-bold mb-4">
                Voyage {service.id}
              </h2>
              {renderAssignButton(service.id)}
              {renderEditButton(service.id)}
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-bold text-white">Counterpart:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.counterpart}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? {
                                    ...prevService,
                                    counterpart: e.target.value,
                                  }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.counterpart
                    )}
                  </p>
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-bold text-white">ETA Load:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.eta_load}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? { ...prevService, eta_load: e.target.value }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.eta_load
                    )}
                  </p>
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-bold text-white">Freight:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.freight}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? { ...prevService, freight: e.target.value }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.freight
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-bold text-white">Cp Date:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.cp_date}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? { ...prevService, cp_date: e.target.value }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.cp_date
                    )}
                  </p>
                  <p className="font-bold text-white mt-2">Laycan Range:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.laycan_range}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? {
                                    ...prevService,
                                    laycan_range: e.target.value,
                                  }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.laycan_range
                    )}
                  </p>
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-bold text-white">Loading port:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.loading_port}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? {
                                    ...prevService,
                                    loading_port: e.target.value,
                                  }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.loading_port
                    )}
                  </p>
                  <p className="font-bold text-white mt-2">Discharge port:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.discharge_port}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? {
                                    ...prevService,
                                    discharge_port: e.target.value,
                                  }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.discharge_port
                    )}
                  </p>
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-bold text-white">ETA Discharge:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.eta_disch}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? { ...prevService, eta_dish: e.target.value }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.eta_disch
                    )}
                  </p>
                  <p className="font-bold text-white">Status:</p>
                  <p className="text-dimWhite">
                    {isEditable ? (
                      <input
                        className=" bg-primary-black appearance-none border border-solid border-white rounded w-50 py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={service.status}
                        onChange={(e) =>
                          setServices((prevServices) =>
                            prevServices.map((prevService) =>
                              prevService.id === service.id
                                ? { ...prevService, status: e.target.value }
                                : prevService
                            )
                          )
                        }
                      />
                    ) : (
                      service.status
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </>
  );
}
