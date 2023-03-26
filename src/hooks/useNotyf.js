import { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = `${process.env.REACT_APP_API_LINK}/notifications`;

const useNotyf = (user, jwt) => {
  const [socketN, setSocketN] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if(user?._id){
      const notyfSocket = io.connect(SOCKET_URL, {
        transports: ["websocket"],
        query: { userId: user?._id, userName: user?.userName },
        forceNew: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: Infinity,
        auth: { token: jwt },
      });
  
      notyfSocket.on("connect", () => {
        console.log(`Notyf socket connected with ID ${notyfSocket.id}`);
        setIsConnected(true);
      });
  
      notyfSocket.on("disconnect", () => {
        console.log("Notyf socket disconnected");
        setIsConnected(false);
      });
  
      setSocketN(notyfSocket);
  
      return () => {
        notyfSocket.disconnect();
      };
    }else{
      return { socketN: null, isConnected: false };
    }
  }, [user?._id, user?.userName, jwt]);

  return {
    socketN,
    isConnected,
  };
};

export default useNotyf;
