import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useContext } from 'react';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import msg from '../../../sounds/msg.mp3';
import bot from '../../../sounds/bot.mp3';
import { useSelector } from 'react-redux';

const InboxThread = ({socketN}) => {
    const [inboxReceived, setInboxReceived] = useState([]);
    const wish = useSelector((state) => state.tournaments.wishList);

    const { setShowInbox, setPopUser } = useContext(InboxContext);
    const [sound, setSound] = useState(null);

    const handleInboxPop = (item) => {
      // Find the index of the clicked message in the inboxReceived array
      const index = inboxReceived.findIndex((msg) => msg.roomId === item.roomId);

      // Update the messageCount of the clicked message to 0
      const updatedMsg = {...inboxReceived[index], messageCount: 0};

      // Update the inboxReceived state by replacing the clicked message with the updated one
      setInboxReceived([
        ...inboxReceived.slice(0, index),
        updatedMsg,
        ...inboxReceived.slice(index + 1)
      ]);

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
          socketN.on('track_incoming', (data) => {
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
        return () => socketN.off('track_incoming');
      }
    }, [socketN]);

    // Runs whenever a socket event is received from the server
    useEffect(() => {
      socketN.on("track_uniqueInbox", (latestInbox) => {
        setInboxReceived((state) => [...latestInbox, ...state]);
      });

      return () => socketN.off("track_uniqueInbox");
    }, [socketN]);

    const findExistingMessage = (inboxReceived, senderId, roomId) => {
      return inboxReceived.find(item => item.senderId === senderId && item.roomId === roomId);
    }

    const totalMessageCount = inboxReceived.reduce((total, item) => {
      return total + item.messageCount;
    }, 0);

  return (
    <div className="dropdown">
        <Link to="/" className="mx-2 dropdown-toggle hidden-arrow text-white" id="navbarDropdownMenuLink"
        role="button" data-mdb-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-message"></i>
            <span className="badge rounded-pill badge-notification bg-danger">{totalMessageCount}</span>
        </Link>
        <ul className="dropdown-menu p-0" aria-labelledby="navbarDropdownMenuLink">

            <div className="container">
                <div className="row">

                  <ul className="nav nav-tabs mb-2 inboxTop" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link active"
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onClick={(e) => {e.stopPropagation();}}
                        >My Inbox</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={(e) => {e.stopPropagation();}}
                        >Rooms</a>
                    </li>
                  </ul>
                  <div className="tab-content mb-2" id="ex1-content">
                    <div
                      className="tab-pane fade show active"
                      id="ex1-tabs-1"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-1"
                    >
                      <div className="card p-0">
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
                                                <p className="small text-muted mb-1">{moment(item.timeStamp).fromNow()}</p>
                                                {
                                                    item.messageCount !== 0 ? 
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

                    <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                      <div className="card p-0">
                          <div className="card-body p-0">

                              <ul className="list-unstyled mb-0 inboxBelow">

                                {
                                  wish.length === 0 ? <li className='notyf-item'>
                                                        <div className="dropdown-item">No rooms found!</div>
                                                    </li> :
                                                    wish.map((tournament, index) => (
                                                      <li className="p-2 px-3 border-bottom" key={index}>
                                                        <a href={`/tournament/details/${tournament._id}/chatroom`}>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row">
                                                                    <span className='avatar'>
                                                                        <img src={tournament.tournamentThumbnail} alt="avatar" className="rounded d-flex align-self-center me-3" width="45"/>
                                                                    </span>
                                                                    <div className="pt-1">
                                                                        <h6 className="mb-0">{tournament.tournamentName}</h6>
                                                                        <p className="small text-muted">{moment(tournament.dates?.tournamentStart).fromNow()}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="small text-muted mb-1">Gamers: {tournament.settings?.maxParticipitant}</p>
                                                                    {tournament.categories?.includes("upcoming") ? 
                                                                      <span className="badge bg-success float-end">upcoming</span> : 
                                                                      <span className="badge bg-danger float-end">archived</span>
                                                                     }
                                                                    
                                                                </div>
                                                            </div>
                                                        </a>
                                                      </li>
                                  ))
                                }
                              </ul>

                          </div>
                      </div>
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