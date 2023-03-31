import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SOCKET_URL = `${process.env.REACT_APP_API_LINK}/inboxchat`;

const useInbox = () => {
const [socketInbox, setInboxSocket] = useState(null);
const [isInboxConnected, setIsInboxConnected] = useState(false);

const user = useSelector((state) => state.profile.data)

useEffect(() => {
    if(user?._id){
        const inboxSocket = io.connect(SOCKET_URL, {
        transports: ["websocket"],
        query: { userId: user?._id },
        cors: {
            origin: `${process.env.REACT_APP_CLIENT_ORIGIN}`,
            methods: ['GET', 'POST'],
        },
        });

        inboxSocket.on("connect", () => {
            console.log(`Inbox socket connected with ID ${inboxSocket.id}`);
            setIsInboxConnected(true);
        });

        inboxSocket.on('disconnect', () => {
            console.log('Inbox disconnected with disconnect event');
            setIsInboxConnected(false);
        });

        setInboxSocket(inboxSocket);

        return () => {
            inboxSocket.disconnect();
        };
    }else{
        return { socketInbox: null, isInboxConnected: false };
    }
}, [user?._id]);

return {
    socketInbox,
    isInboxConnected,
};
};

export default useInbox;
