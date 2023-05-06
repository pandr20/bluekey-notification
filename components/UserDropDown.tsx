// components/UserDropdown.tsx

import React, { useState, useEffect } from 'react';
import { User } from '@clerk/clerk-sdk-node';

const UserDropdown: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/getUsers');
        const data: User[] = await response.json();
        setUsers(data);
        console.log('Fetched users:', data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('Users when dropdown toggled:', users);
  }, [showDropdown]);

  return (
    <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>Show Users</button>
      {showDropdown && (
        <div>
          <select>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
