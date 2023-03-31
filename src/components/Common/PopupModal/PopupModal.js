import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import useAuth from '../../../hooks/useAuth';
import useNotyf from '../../../hooks/useNotyf';

const PopupModal = ({show, handleClose, popupUser}) => {
    //just for testing purposes for notifications
    const { loggedInUser } = useAuth();
    const user = useSelector((state) => state.profile.data)
    const jwt = localStorage.getItem("jwt");

    const { socketN } = useNotyf(user, jwt);
    
    const sendFriendRequestNotyf = () => {
        const timeStamp = Date.now();
        const date = moment(timeStamp);
        const output = date.format('YYYY-MM-DDTHH:mm:ss.SSS');

        const data = {
            type: "friend_request",
            subject: "Sent you a friend request",
            subjectPhoto: loggedInUser.photo,
            invokedByName: loggedInUser.name,
            invokedById: loggedInUser.id,
            receivedByName: popupUser.userName,
            receivedById: popupUser.id, 
            route: `profile/${loggedInUser.id}`,
            timeStamp: output,
            read: false
        }

        // // Send message to server
        socketN.emit("send_notification", data);
    };

    const sendFollowRequestNotyf = () => {
        const timeStamp = Date.now();
        const date = moment(timeStamp);
        const output = date.format('YYYY-MM-DDTHH:mm:ss.SSS');

        const data = {
            type: "follow_request",
            subject: "Started following you",
            subjectPhoto: loggedInUser.photo,
            invokedByName: loggedInUser.name,
            invokedById: loggedInUser.id,
            receivedByName: popupUser.userName,
            receivedById: popupUser.id, 
            route: `profile/${loggedInUser.id}`,
            timeStamp: output,
            read: false
        }

        // // Send message to server
        socketN.emit("send_notification", data);
    };
    
    const { showInbox, setShowInbox, setPopUser } = useContext(InboxContext);
    const handleInboxPop = () => {
        setShowInbox(!showInbox);
        handleClose();

        setPopUser(popupUser);
    };

    return (
        <Modal show={show} onHide={handleClose} className='popupModal' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <section style={{backgroundColor: "#9de2ff"}}>
                    <div className="container py-3">
                        <div className="row d-flex justify-content-start align-items-center">
                        <div className="col col-md-9 col-lg-7 col-xl-5">
                            <div className="card" style={{borderRadius: "15px"}}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                <div className="flex-shrink-0">
                                    <img src={popupUser?.photo}
                                    alt="placeholder" className="img-fluid"
                                    style={{width: "180px", borderRadius: "10px"}}/>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h5 className="mb-1">{popupUser?.userName}
                                    {
                                        popupUser?.id === loggedInUser.id ? null :
                                        <span className='ms-2'>| <i className="fas fa-message text-danger cursor-pointer ms-2" onClick={handleInboxPop}></i></span>
                                    }
                                     
                                     </h5>
                                    <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>Country {popupUser?.country}</p>
                                    <div className="d-flex justify-content-start rounded-3 py-3 mb-2 px-4" style={{backgroundColor: "#ffffff"}}>
                                        <div>
                                            <p className="small text-muted mb-1">Level</p>
                                            <p className="mb-0">{popupUser?.stats?.levelTitle}</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="small text-muted mb-1">Played</p>
                                            <p className="mb-0">{popupUser?.stats?.totalGamePlayed}</p>
                                        </div>
                                        <div>
                                            <p className="small text-muted mb-1">Followers</p>
                                            <p className="mb-0">{popupUser?.stats?.noOfFollowers}</p>
                                        </div>
                                    </div>

                                    {
                                        popupUser?.id === loggedInUser.id ? 
                                        <div className="d-flex pt-1">
                                            <button type="button" className="btn btn-primary flex-grow-1"><Link to={`/profile/${popupUser?.id}`} className="text-white">My Profile</Link></button>
                                        </div> :
                                        <div className="d-flex pt-1">
                                            <button type="button" className="btn btn-info text-white me-1 flex-grow-1" onClick={sendFriendRequestNotyf}>Add Friend</button>
                                            <button type="button" className="btn btn-primary flex-grow-1" onClick={sendFollowRequestNotyf}>Follow</button>
                                        </div>
                                    }
                                </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Modal.Body>
        </Modal>
    );
};

export default PopupModal;