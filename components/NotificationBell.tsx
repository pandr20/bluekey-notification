import React, { useEffect, useState } from "react";
import StateDropDown from "./StateDropDown";
interface NotificationState {
  [key: string]: string;
}
function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<NotificationState>({});

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/getNotification");
      if (!res.ok) {
        throw new Error("Failed to fetch Notification");
      }
      const result = await res.json();
      setNotifications(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const pollNotifications = async () => {
      while (isMounted) {
        await fetchNotifications();
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait 5 seconds before polling again
      }
    };
    pollNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  const [showNotifications, setShowNotifications] = useState(false);

  const handleClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleStateChange = (notificationId: string, newState: string) => {
    setState((prevState) => ({
      ...prevState,
      [notificationId]: newState,
    }));
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
        <div className="absolute top-8 right-0 w-64 bg-gray-700 rounded-md shadow-lg py-2 px-3 mt-2 max-h-96 overflow-y-scroll scroll-smooth">
          {notifications
            .slice()
            .reverse()
            .map(
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
                <div key={notification.id} className="p-1 pt-2 break-words">
                  <span className="text-white">
                    {notification && notification.message && (
                      <p
                        className="p-0 break-words w-full pl-2"
                        dangerouslySetInnerHTML={{
                          __html: `Message: ${notification.message.replace(
                            /\n/g,
                            "<br>"
                          )}`,
                        }}
                      ></p>
                    )}
                    <p className="p-1 pt-2">
                      Created at:{" "}
                      {new Date(notification.created_at).toLocaleDateString()}
                    </p>
                    <p className="p-1">ServiceId: {notification.serviceId}</p>
                    <p className="p-1">
                      State: {state[notification.id] || "Unread"}
                    </p>{" "}
                    {/* Update this line */}
                    <StateDropDown
                      setState={(newState: string) =>
                        handleStateChange(notification.id, newState)
                      }
                    />
                  </span>
                  <hr className="border-gray-300 mt-3" />
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
