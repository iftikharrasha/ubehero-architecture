import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import msg from '../../../sounds/msg.mp3';
import bot from '../../../sounds/bot.mp3';
import { Card } from 'antd';

const MessagePanelTeam = ({socket, team, profile, unreadCound, setUnreadCount}) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const [sound, setSound] = useState(null);

    const { _id, teamName, coverPhoto } = team;

     // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('receive_team_message', (data) => {
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    senderName: data.senderName,
                    createdAt: data.createdAt,
                    senderPhoto: data.senderPhoto,
                },
            ]);

            if(data.senderName.toLowerCase() !== profile?.data?.userName){
                if(data.sound === "bot"){
                    setSound(bot)
                    const newMessageSound = document.getElementById("newMessageSound");
                    newMessageSound.play();
                }else if(data.sound === "msg"){
                    setSound(msg)
                    const newMessageSound = document.getElementById("newMessageSound");
                    newMessageSound.play();
                }else{
                    setSound(null)
                }

                setUnreadCount(count => count + 1);
            }
        });

        // Remove event listener on component unmount
        return () => socket.off('receive_team_message');
    }, [socket]);

    // Runs whenever a socket event is received from the server
    useEffect(() => {
        socket.on("last_100_messages", (last100Messages) => {
            setMessagesReceived((state) => [...last100Messages, ...state]);
        });

        return () => socket.off("last_100_messages");
    }, [socket]);

    // check how many unread messages have been received
    // useEffect(() => {
    //     socket.on("get_unread_counts", (count) => {
    //         setUnreadCount(count);
    //     });

    //     return () => socket.off("get_unread_counts");
    // }, [socket]);

    const messagesColumnRef = useRef(null);
    
    useEffect(() => {
        if (messagesColumnRef && messagesColumnRef.current && messagesRecieved.length > 0) {
            const { scrollHeight, clientHeight } = messagesColumnRef.current;
            messagesColumnRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messagesRecieved]);

    return (
        <div className="chat">
            <div className="chat-history" ref={messagesColumnRef}>
                <ul className="m-b-0">
                    {
                        messagesRecieved.map((item, index) => (
                            <li className={item.senderName.toLowerCase() === profile?.data?.userName ? "text-right" : "text-left"} key={index}>
                                <div className="message-data">
                                    <img src={item.senderPhoto} alt="avatar"/> {item.senderName} 
                                    {
                                        item.senderName.toLowerCase() === profile?.data?.userName ? null : 
                                            item.senderPermissions ? 
                                                item.senderPermissions.includes("master") ? " (MASTER)" :
                                                            null
                                            : null
                                    }
                                </div>
                                <div className={
                                        item.senderName.toLowerCase() === profile?.data?.userName ? "message my-message" : 
                                                    item.senderPermissions ? 
                                                        item.senderPermissions.includes("master") ? "message other-message master" :
                                                                    "message other-message"
                                        : "message other-message bot"
                                }
                                >
                                    <Card>
                                        <p>{item.message}</p>
                                        <span>{moment(item.createdAt).fromNow()}</span>
                                    </Card>
                                </div>                                    
                            </li>
                        ))
                    }
                </ul>
            </div>
            <audio id="newMessageSound" src={sound} type="audio/mpeg"></audio>
        </div>
    );
};

export default MessagePanelTeam;