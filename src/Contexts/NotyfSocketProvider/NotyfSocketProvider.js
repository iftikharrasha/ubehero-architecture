import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = `${process.env.REACT_APP_API_LINK}/notifications`;

export const NotyfSocketContext = React.createContext(null);

export const NotyfSocketProvider = ({ children, userId, accessToken }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const notyfSocketId = localStorage.getItem("notyfSocketId");
    const accessToken = localStorage.getItem("jwt");
    const notyfSocket = io.connect(SOCKET_URL, {
      transports: ["websocket"],
      query: { userId },
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      auth: { token: accessToken },
      ...(notyfSocketId ? { auth: { notyfSocketId } } : {}),
    });

    notyfSocket.on("connect", () => {
      localStorage.setItem("notyfSocketId", notyfSocket.id);
      console.log(`Notyf socket connected with ID ${notyfSocket.id}`);
      setIsConnected(true);
    });

    notyfSocket.on("disconnect", () => {
      localStorage.removeItem("notyfSocketId");
      console.log("Notyf socket disconnected");
      setIsConnected(false);
    });

    notyfSocket.on("reconnect", (attemptNumber) => {
      console.log(`Notyf socket reconnected after ${attemptNumber} attempts`);
      setIsConnected(true);
    });

    notyfSocket.on("reconnect_error", (error) => {
      console.log("Notyf socket reconnection error", error);
      setIsConnected(false);
    });

    setSocket(notyfSocket);

    return () => {
      notyfSocket.disconnect();
    };
  }, [userId, accessToken]);

  return (
    <NotyfSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </NotyfSocketContext.Provider>
  );
};
