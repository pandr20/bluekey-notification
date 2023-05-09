import React, { useEffect, useState } from "react";
import StateDropDown from "./StateDropDown";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getNotification");
        if (!res.ok) {
          throw new Error("Failed to fetch Notification");
        }
        const result = await res.json();
        setNotifications(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
          {notifications.map(
            (notification: {
              id: string;
              userId: string;
              service: [];
              serviceId: string;
              state: string;
              created_at: string;
              isReady: boolean;
              priority: number;
              message: string;
            }) => (
              <div key={notification.id} className=" py-2 break-words">
                <span className="text-white ">
                  <p className="p-0">Message: {notification.message}</p>
                  <p className="p-0">Created at: {notification.created_at}</p>
                  <p className="p-0">ServiceId: {notification.serviceId}</p>
                  <p className="p-0">State: {notification.state}</p>

                  <StateDropDown state={""} />
                </span>
                <hr className=" border-gray-300 mt-3" />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
