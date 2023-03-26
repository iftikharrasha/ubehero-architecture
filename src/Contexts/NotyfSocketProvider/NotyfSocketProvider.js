import React, { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SOCKET_URL = `${process.env.REACT_APP_API_LINK}/notifications`;

export const NotyfSocketContext = createContext(null);

export const NotyfSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const userId = useSelector((state) => state.profile.data?._id)
  const jwt = sessionStorage.getItem("jwt");

  useEffect(() => {
    if(userId){
      const notyfSocket = io.connect(SOCKET_URL, {
        transports: ["websocket"],
        query: { userId },
        forceNew: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: Infinity,
        auth: { token: jwt },
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

      setSocket(notyfSocket);

      return () => {
        notyfSocket.disconnect();
      };
    }else{
      if (!userId) {
          return { socket: null, isConnected: false };
      }
    }
  }, []);

  return (
    <NotyfSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </NotyfSocketContext.Provider>
  );
};