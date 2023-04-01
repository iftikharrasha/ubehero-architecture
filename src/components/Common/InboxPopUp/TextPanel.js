import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import msg from '../../../sounds/msg.mp3';
import bot from '../../../sounds/bot.mp3';
import moment from 'moment';

const TextPanel = ({socketInbox, user, popUser, messagesRecieved, setMessagesReceived}) => {
    const messagesColumnRef = useRef(null);
    const [sound, setSound] = useState(null);

     // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socketInbox.on('receive_message', (data) => {
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    senderName: data.senderName,
                    timeStamp: data.timeStamp,
                    senderPhoto: data.senderPhoto,
                },
            ]);

            if(data.senderName.toLowerCase() !== user.userName){
                if(data.sound === "bot"){
                    setSound(bot)
                    const newMessageSound = document.getElementById("newMessageSound2");
                    newMessageSound.play();
                }else if(data.sound === "msg"){
                    setSound(msg)
                    const newMessageSound = document.getElementById("newMessageSound2");
                    newMessageSound.play();
                }else{
                    setSound(null)
                }
            }
        });

        // Remove event listener on component unmount
        return () => socketInbox.off('receive_message');
    }, [socketInbox]);

    // Runs whenever a socket event is received from the server
    useEffect(() => {
        socketInbox.on("last_100_texts", (last100Texts) => {
            setMessagesReceived((state) => [...last100Texts, ...state]);
        });

        return () => socketInbox.off("last_100_messages");
    }, [socketInbox]);
    
    useEffect(() => {
        if (messagesColumnRef && messagesColumnRef.current) {
            const { scrollHeight, clientHeight } = messagesColumnRef.current;
            messagesColumnRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messagesRecieved, messagesColumnRef]);

    return (
        <div className="card-body" data-mdb-perfect-scrollbar="true"
            style={{position: "relative", height: "400px"}} ref={messagesColumnRef}>

            {
                messagesRecieved.length === 0 && 
                <div className="d-flex flex-row justify-content-start mb-4">
                    <img src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg"
                    alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                    <div>
                    <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Start your conversation with {popUser.userName}. Please keep a friendly environment.</p>
                    </div>
                </div>
            }

            {
                messagesRecieved.map((item, index) => (
                    <div className={`d-flex flex-row ${item.senderName.toLowerCase() === user.userName ? 'myMessage' : 'otherMessage'}`} key={index}>
                        {
                            item.senderName.toLowerCase() !== user.userName ? 
                            <span className="avatarUser"><img src={item.senderPhoto} alt="avatar 1"/></span> : null
                        }
                        <div>
                            <p className="small p-2 mx-3 mb-1 rounded-3 color">{item.message}</p>
                            <p className="small mx-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{moment(item.timeStamp).fromNow()}</p>
                        </div>
                        {
                            item.senderName.toLowerCase() === user.userName ? 
                            <span className="avatarUser"><img src={item.senderPhoto} alt="avatar 1"/></span> : null
                        }
                    </div>
                ))
            }
            <audio id="newMessageSound2" src={sound} type="audio/mpeg"></audio>
        </div>
    );
};

export default TextPanel;