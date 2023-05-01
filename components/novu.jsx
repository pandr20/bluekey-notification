import React from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

export const Novu = () => {
  return (
    <NovuProvider
      subscriberId={"on-boarding-subscriber-id-123"}
      applicationIdentifier={"Yuii1P2gaVSi"}
    >
      <PopoverNotificationCenter colorScheme={"light"}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};
