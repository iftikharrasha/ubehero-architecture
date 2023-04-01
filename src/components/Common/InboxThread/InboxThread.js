import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useContext } from 'react';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import useNotyf from '../../../hooks/useNotyf';
import { useSelector } from 'react-redux';
import msg from '../../../sounds/msg.mp3';
import bot from '../../../sounds/bot.mp3';

const InboxThread = ({socketN, isConnected, userId}) => {
    const [inboxReceived, setInboxReceived] = useState([]);
    const { showInbox, setShowInbox, popUser, setPopUser } = useContext(InboxContext);
    const [sound, setSound] = useState(null);

    const handleInboxPop = (item) => {
      //this is to have popup user
        const user =  {
            id: item.senderId,
            userName: item.senderName,
            photo: item.senderPhoto,
            message: item.message,
            read: item.read,
        }

        setShowInbox(true);
        setPopUser(user);
    };

    useEffect(() => {
      if(socketN){
          socketN.on('track_inbox', (data) => {
              setInboxReceived(state => {
                const existingMessage = findExistingMessage(state, data.senderId, data.roomId);
                if (existingMessage) {
                  return state.map(item => {
                    if (item === existingMessage) {
                      return {
                        ...item,
                        message: data.message,
                        timeStamp: data.timeStamp,
                        messageCount: item.messageCount + 1
                      };
                    }
                    return item;
                  });
                } else {
                  return [
                    ...state,
                    {
                      roomId: data.roomId,
                      room: data.room,
                      senderId: data.senderId,
                      senderName: data.senderName,
                      senderPhoto: data.senderPhoto,
                      senderPermissions: data.senderPermissions,
                      receiverId: data.receiverId,
                      message: data.message,
                      timeStamp: data.timeStamp,
                      read: data.read,
                      messageCount: 1
                    }
                  ];
                }
              });

              if(data.sound === "bot"){
                  setSound(bot)
                  const newMessageSound = document.getElementById("newMessageSound3");
                  newMessageSound.play();
              }else if(data.sound === "msg"){
                  setSound(msg)
                  const newMessageSound = document.getElementById("newMessageSound3");
                  newMessageSound.play();
              }else{
                  setSound(null)
              }
            });
  
        // Remove event listener on component unmount
        return () => socketN.off('track_inbox');
      }
    }, [socketN]);

    function findExistingMessage(inboxReceived, senderId, roomId) {
      return inboxReceived.find(item => item.senderId === senderId && item.roomId === roomId);
    }

  return (
    <div className="dropdown">
        <Link to="/" className="mx-2 dropdown-toggle hidden-arrow text-white" id="navbarDropdownMenuLink"
        role="button" data-mdb-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-message"></i>
            <span className="badge rounded-pill badge-notification bg-danger">{inboxReceived.length}</span>
        </Link>
        <ul className="dropdown-menu p-0" aria-labelledby="navbarDropdownMenuLink">

            <div className="container">
                <div className="row">
                    <div className="card p-0">
                        <div
                            class="card-header d-flex justify-content-between align-items-center p-3 bg-secondary text-white border-bottom-0">
                            <p class="mb-0 fw-bold">My Inbox</p>
                        </div>
                        <div className="card-body p-0">

                            <ul className="list-unstyled mb-0">
                                {
                                    inboxReceived.length > 0 ?
                                        inboxReceived.slice().reverse().map((item, index) => (
                                        <li className={`p-2 px-3 border-bottom ${item.read === false ? "notyf-item unread" : "notyf-item"}`} key={index} onClick={(e) => handleInboxPop(item)}>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex flex-row">
                                                    <span className='avatar'>
                                                        <img src={item.senderPhoto} alt="avatar" className="rounded-circle d-flex align-self-center me-3" width="45"/>
                                                    </span>
                                                    <div className="pt-1">
                                                        <h6 className="mb-0">{item.senderName}</h6>
                                                        <p className="small text-muted">{item.message}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-1">
                                                    <p className="small text-muted mb-1">Just now</p>
                                                    {
                                                        item.read === false ? 
                                                        <span className="badge bg-danger float-end">{item.messageCount}</span> : null
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                )) : 
                                <li className='notyf-item'>
                                    <Link className="dropdown-item" to="/">No new messages</Link>
                                </li>
                            }
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </ul>
        <audio id="newMessageSound3" src={sound} type="audio/mpeg"></audio>
    </div>
  );
};

export default InboxThread;