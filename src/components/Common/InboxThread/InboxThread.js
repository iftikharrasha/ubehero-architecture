import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useContext } from 'react';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import useNotyf from '../../../hooks/useNotyf';
import { useSelector } from 'react-redux';

const InboxThread = ({socketN, isConnected, userId}) => {
    const [inboxReceived, setInboxReceived] = useState([]);
    const { showInbox, setShowInbox, popUser, setPopUser } = useContext(InboxContext);
    console.log(inboxReceived)

    const handleInboxPop = (item) => {
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

    // useEffect(() => {
    //     if (socketN) {
    //         const data = {
    //           userId: userId,
    //         }
  
    //         socketN.emit("join_tracking", data);
    //     }
    // }, []);

    useEffect(() => {
        if(socketN){
            socketN.on('track_inbox', (data) => {
                setInboxReceived((state) => [
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
                    timeStamp: data.output,
                    read: data.read,
                  },
              ]);
          });
    
          // Remove event listener on component unmount
          return () => socketN.off('track_inbox');
        }
      }, [socketN]);

    // const inboxReceived = [
    //     {
    //         id: "63cedf7d249ceb980798ce48",
    //         userName: "cena235",
    //         country: "JP",
    //         photo: "https://image.pngaaa.com/371/1423371-middle.png",
    //         gender: "male",
    //         emailVerified: true,
    //         message: "This is a new message",
    //         read: false,
    //         stats: {
    //             totalGamePlayed: 17,
    //             totalWins: 12,
    //             totalXp: 3500,
    //             level: 4,
    //             levelTitle: "expert",
    //             noOfFollowers: 20
    //         }
    //     },
    //     {
    //         id: "63ff919d1fedd9f164d8cc23",
    //         userName: "harrykane",
    //         country: "UK",
    //         photo: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg",
    //         gender: "female",
    //         emailVerified: true,
    //         message: "This is a old message",
    //         read: true,
    //         stats: {
    //             totalGamePlayed: 7,
    //             totalWins: 4,
    //             totalXp: 1500,
    //             level: 2,
    //             levelTitle: "amateur",
    //             noOfFollowers: 8
    //         }
    //     }
    // ]

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
                                                        <span className="badge bg-danger float-end">1</span> : null
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
    </div>
  );
};

export default InboxThread;