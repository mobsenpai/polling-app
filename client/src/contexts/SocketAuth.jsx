// contexts/SocketContext.jsx
import React, { createContext, useContext, useEffect } from "react";
import { socket } from "../utils/socket";
import { useAuth } from "./AuthContext"; 

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user } = useAuth(); 

  useEffect(() => {
    if (user) {
      socket.connect();
      console.log(user)
      socket.emit("join", { userId: user._id });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
