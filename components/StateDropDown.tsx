// components/UserDropdown.tsx

import React, { useState, useEffect } from "react";
import { User } from "@clerk/clerk-sdk-node";

type NotificationState = {
  state: string;
};

const StateDropDown: React.FC<NotificationState> = (
  {
    //   clientId,
    //   serviceId,
  }
) => {
  const [states, setStates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getStates");
        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }
        const result = await res.json();
        setStates(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {}, [showDropdown]);

  // Subscribe user to pointed serviceId and add subscription to DB
  const handleConfirm = async () => {
    if (selectedState) {
      try {
        const response = await fetch("/api/updateService", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ setStates, setSelectedState }),
        });

        if (!response.ok) {
          throw new Error("Failed to update state to notification");
        }

        console.log("User changed state to:", selectedState);

        // Close the dropdown
        setShowDropdown(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {/* Button to toggle user dropdown */}
      <button
        className="text-black bg-blue rounded-lg p-1 mt-2 mb-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Choose State
      </button>
      {/* Render when showDropDown is true */}
      {showDropdown && (
        <div>
          {/* Dropdown to select a user */}
          {/* Important: Extracts the userId of chosen user */}
          <select
            className="bg-dimBlue rounded-full w-40"
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {/* <option value="">Select a state</option> */}
            {states.map(
              (state: {
                unread: string;
                read: string;
                processing: string;
                completed: string;
              }) => (
                <>
                  <option>{state.unread}</option>
                  <option>{state.read}</option>
                  <option>{state.processing}</option>
                  <option>{state.completed}</option>
                </>
              )
            )}
          </select>
          {/* If confirmed, runs the subscribe API route */}
          <button className="text-blue p-3" onClick={handleConfirm}>
            Confirm
          </button>
          {/* Cancels the use-case */}
          <button className="text-white" onClick={() => setShowDropdown(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default StateDropDown;
