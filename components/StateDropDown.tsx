import React, { useState, useEffect } from "react";

type NotificationState = {
  setState: (state: string) => void;
};

type State = {
  id: string;
  name: string;
};

const StateDropDown: React.FC<NotificationState> = ({ setState }) => {
  const [states, setStates] = useState<State[]>([]); // Explicit type annotation
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("Unread"); // Set "Unread" as the default state

  useEffect(() => {
    async function fetchData() {
      try {
        // Simulate fetching states from API
        const result = await new Promise<State[]>((resolve) =>
          setTimeout(() => {
            resolve([
              { id: "1", name: "Unread" },
              { id: "2", name: "Read" },
              { id: "3", name: "Processing" },
              { id: "4", name: "Completed" },
            ]);
          }, 1000)
        );
        setStates(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Update the selected state
  const handleConfirm = () => {
    if (selectedState) {
      setState(selectedState); // Update the state in the parent component

      // Close the dropdown
      setShowDropdown(false);
    }
  };

  return (
    <div>
      <button
        className="text-black bg-blue rounded-lg p-1 mt-2 mb-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Choose State
      </button>
      {showDropdown && (
        <div>
          <select
            className="bg-dimBlue rounded-full w-40"
            value={selectedState} // Add value attribute
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {states.map((state: State) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          <button className="text-blue p-3" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="text-white" onClick={() => setShowDropdown(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default StateDropDown;
