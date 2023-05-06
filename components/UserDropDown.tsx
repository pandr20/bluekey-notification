// components/UserDropdown.tsx

import React, { useState, useEffect } from "react";
import { User } from "@clerk/clerk-sdk-node";

type UserDropdownProps = {
  clientId: string;
  serviceId: string;
};

const UserDropdown: React.FC<UserDropdownProps> = ({ clientId, serviceId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  //Fetch user objects from Clerk
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/getUsers");
        const data: User[] = await response.json();
        setUsers(data);
        console.log("Fetched users:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Users when dropdown toggled:", users);
  }, [showDropdown]);

  // Subscribe user to pointed serviceId and add subscription to DB
  const handleConfirm = async () => {
    if (selectedUserId) {
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientId, userId: selectedUserId, serviceId }),
        });

        if (!response.ok) {
          throw new Error("Failed to subscribe user to service");
        }

        console.log("User subscribed to services:", selectedUserId);

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
        className="text-white"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Show Users
      </button>
      {/* Render when showDropDown is true */}
      {showDropdown && (
        <div>
          {/* Dropdown to select a user */}
          {/* Important: Extracts the userId of chosen user */}
          <select
            className="bg-dimBlue rounded-full w-40"
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id}
              </option>
            ))}
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

export default UserDropdown;
