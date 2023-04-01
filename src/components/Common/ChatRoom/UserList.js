import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PopupModal from '../PopupModal/PopupModal';

const UserList = ({socket, leaderboard}) => {
    const [roomUsers, setRoomUsers] = useState([]);
    
    //for popup
    const [popupUser, setPopupUser] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setPopupUser(null)
        setShow(false)
    };
    const handleShow = (user) => {
        setPopupUser(user)
        setShow(true)
    };

    useEffect(() => {
        socket.on("chatroom_users", (data) => {
          setRoomUsers(data);
        });
    
        return () => socket.off("chatroom_users");
    }, [socket]);

    const isUserOnline = (user) => {
        return roomUsers.some((roomUser) => roomUser.userName === user.userName);
    }

    return (
        <>
        <Tabs
            defaultActiveKey="online"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="online" title={`Online (${roomUsers.length + 1})`}>
                <div id="plist" className="people-list px-1">
                    <ul className="list-unstyled chat-list mb-0">
                        <li className="clearfix active mb-1">
                            <img src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg" alt="avatar"/>
                            <div className="about">
                                <div className="name"><i className="fa fa-circle online"></i> ChatBot</div>
                                <div className="status">Joined a few seconds ago </div>                                            
                            </div>
                        </li>
                        {
                            roomUsers.map((participant, index) => (
                                <li className="clearfix active mb-1" key={index} onClick={(e) => handleShow(participant)}>
                                    <img src={participant.photo} alt="avatar"/>
                                    <div className="about">
                                        <div className="name"><i className="fa fa-circle online"></i> {participant.userName}</div>
                                        <div className="status">Joined {moment(participant.timeStamp).fromNow()} </div>                                            
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Tab>
            <Tab eventKey="participants" title={`Participants (${leaderboard.length})`}>
                <div id="plist" className="people-list px-1">
                    <ul className="list-unstyled chat-list mb-0">
                        {
                            leaderboard.map((participant, index) => (
                                <li className="clearfix active mb-1" key={index} onClick={(e) => handleShow(participant)}>
                                    <img src={participant.photo} alt="avatar"/>
                                    <div className="about">
                                        <div className="name"><i className={`fa fa-circle ${isUserOnline(participant) ? 'online' : 'offline'}`}></i> {participant.userName}</div>
                                        <div className="status">{`${isUserOnline(participant) ? 'Online' : 'offline'}`}</div>                                            
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Tab>
        </Tabs>

        {/* popup for user profile */}
        <PopupModal show={show} handleClose={handleClose} popupUser={popupUser}/>
      </>
    );
};

export default UserList;