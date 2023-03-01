import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import useAuth from '../../../hooks/useAuth';

const MessagePanel = ({socket, tournamentDetails, chatroomDetails, loggedInUser}) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    // console.log(messagesRecieved)

    const { _id, tournamentName, tournamentThumbnail } = tournamentDetails;

     // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            // console.log(data)
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    senderName: data.senderName,
                    timeStamp: data.timeStamp,
                },
            ]);
        });

        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);

    // Runs whenever a socket event is received from the server
    useEffect(() => {
        socket.on("last_100_messages", (last100Messages) => {
            setMessagesReceived((state) => [...last100Messages, ...state]);
        });

        return () => socket.off("last_100_messages");
    }, [socket]);

     // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    const messagesColumnRef = useRef(null);
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
          messagesColumnRef.current.scrollHeight;
      }, [messagesRecieved]);

    return (
        <div className="chat">
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={tournamentThumbnail} alt="avatar"/>
                        <div className="chat-about">
                            <h6 className="m-b-0">{tournamentName}</h6>
                            {/* <small>version: {version}</small> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-history" ref={messagesColumnRef}>
                <ul className="m-b-0">
                    {
                        messagesRecieved.map((item, index) => (
                            <li className="clearfix" key={index}>
                                <div className="message-data text-right">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/> {item.senderName}
                                </div>
                                <div className="message my-message">
                                    <p>{item.message}</p>
                                    <span className="message-data-time">{formatDateFromTimestamp(item.timeStamp)}</span>
                                </div>                                    
                            </li>
                        ))
                    }
                    {/* {
                        messages.map((item, index) => (
                            <li className="clearfix" key={index}>
                                <div className="message-data text-right">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                                </div>
                                <div className={item.senderName.toLowerCase() === loggedInUser.name ? "message other-message float-right" : item.routeId === 1 ? "message other-message float-right masterAnnouncement" : "message my-message"}>
                                    <p>{item.message}</p>
                                    <span className="message-data-time">{item.timeStamp}</span>
                                </div>                                    
                            </li>
                        ))
                    } */}
                </ul>
            </div>
        </div>
    );
};

export default MessagePanel;