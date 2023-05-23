import { createContext, useState, useEffect, ReactNode } from "react";
import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { useClerk } from "@clerk/nextjs";

// Type for the MqttContext
interface MqttContextType {
  client?: MqttClient;
}

// Types for MQTT prop
interface MqttProviderProps {
    children: ReactNode;
    uri: string;
  }

// Create context
export const MqttContext = createContext<MqttContextType>({});

const MqttProvider: React.FC<MqttProviderProps> = ({ children, uri }) => {
    const { session } = useClerk();
    const [client, setClient] = useState<MqttClient | undefined>();

    useEffect(() => {
      if (session) {
        console.log("User is logged in. Setting up MQTT client");

        const options: IClientOptions = {
            clientId: session.user.id,
            clean: false

        };

        const mqttClient = mqtt.connect(uri, options);

        mqttClient.on('connect', () => {
          console.log("MQTT client connected");
          setClient(mqttClient);
          console.log("mqttclient", options.clientId)
        });

        mqttClient.on('error', (err) => {
          console.error('Connection error: ', err);
          mqttClient.end();
        });

        return () => {
          console.log("Disconnecting MQTT client");
          mqttClient.end();
        };
      }
    }, [uri, session]);

  return (
    <MqttContext.Provider value={{ client }}>
      {children}
    </MqttContext.Provider>
  );
};

export default MqttProvider;