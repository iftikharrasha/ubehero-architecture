import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import PopupModal from '../../Common/PopupModal/PopupModal';
import { Card, Popover, Row, Tabs } from 'antd';
import UserPopup from '../../Common/UserPopup/UserPopup';

const { TabPane } = Tabs;

const UserList = ({socket, leaderboards}) => {
    const [roomUsers, setRoomUsers] = useState([]);
    
    //for popup
    // const [popupUser, setPopupUser] = useState(null);
    // const [show, setShow] = useState(false);
    // const handleClose = () => {
    //     setPopupUser(null)
    //     setShow(false)
    // };
    // const handleShow = (user) => {
    //     setPopupUser(user)
    //     setShow(true)
    // };

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
        <Tabs defaultActiveKey="1">
            <TabPane
                key="1"
                tab={
                    <Row justify="left" align="middle">
                        <span>{`Online (${roomUsers.length})`}</span>
                    </Row>
                }
            >
                <div id="plist" className="people-list px-1">
                    <ul className="list-unstyled chat-list mb-0">
                        {
                            roomUsers.map((participant, index) => (
                                <li className="clearfix active mb-1" key={index}>
                                    <Popover placement="topLeft" content={<UserPopup popupUser={participant}/>}>
                                        <Card>
                                            <span className="avatarUser"><img src={participant.photo} alt="avatar"/></span>
                                            <div className="about">
                                                <div className="name"><i className="fa fa-circle online"></i> {participant.userName}</div>
                                                <div className="status">Joined {moment(participant.createdAt).fromNow()} </div>                                            
                                            </div>
                                        </Card>
                                    </Popover>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </TabPane>
            <TabPane
                key="2"
                tab={
                    <Row justify="left" align="middle">
                        <span>{`Participants (${leaderboards.length})`}</span>
                    </Row>
                }
            >
                <div id="plist" className="people-list px-1">
                    <ul className="list-unstyled chat-list mb-0">
                        {
                            leaderboards.map((participant, index) => (
                                <li className="clearfix active mb-1" key={index}>
                                    <Popover placement="topLeft" content={<UserPopup popupUser={participant.gamer}/>}>
                                        <Card>
                                            <span className="avatarUser"><img src={participant.gamer.photo} alt="avatar"/></span>
                                            <div className="about">
                                                <div className="name"><i className={`fa fa-circle ${isUserOnline(participant.gamer) ? 'online' : 'offline'}`}></i> {participant.gamer.userName}</div>
                                                <div className="status">{`${isUserOnline(participant.gamer) ? 'Online' : 'offline'}`}</div>                                            
                                            </div>
                                        </Card>
                                    </Popover>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </TabPane>
        </Tabs>

        {/* popup for user profile */}
        {/* <PopupModal show={show} handleClose={handleClose} popupUser={popupUser}/> */}
      </>
    );
};

export default UserList;