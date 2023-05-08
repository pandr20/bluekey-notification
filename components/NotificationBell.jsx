import React, { useState } from "react";

function NotificationBell() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You have a new friend request" },
    { id: 2, message: "Your post has been liked by John" },
    { id: 3, message: "You have a new message from Sarah" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleClick = () => {
    // Toggle notifications visibility
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative">
      <button className="relative" onClick={handleClick}>
        <img
          className="h-7 w-7"
          src="/notification-bell.png"
          alt="Notification Bell"
        />
        {notifications.length > 0 && (
          <div className="absolute top-0 right-0 rounded-full bg-red-500 text-white w-4 h-4 flex items-center justify-center text-xs">
            {notifications.length}
          </div>
        )}
      </button>
      {showNotifications && notifications.length > 0 && (
        <div className="absolute top-8 right-0 w-48 bg-gray-700 rounded-md shadow-lg py-2 px-3 mt-2">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification py-1">
              <span className="text-white">{notification.message}</span>
              <hr className="my-1 border-gray-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
