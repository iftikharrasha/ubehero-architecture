import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import PopupModal from '../../Common/PopupModal/PopupModal';
import { Card, Popover, Row, Tabs } from 'antd';
import UserPopup from '../../Common/UserPopup/UserPopup';

const { TabPane } = Tabs;

const UserListTeam = ({socket, teammates, captain}) => {
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
        socket.on("chatroom_team_mates", (data) => {
          setRoomUsers(data);
        });
    
        return () => socket.off("chatroom_team_mates");
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
                                    <Popover placement="topLeft" content={<UserPopup popupUser={participant} middle={false}/>}>
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
                        <span>{`Participants (${teammates.length+1})`}</span>
                    </Row>
                }
            >
                <div id="plist" className="people-list px-1">
                    <ul className="list-unstyled chat-list mb-0">
                        <li className="clearfix active mb-1">
                            <Popover placement="topLeft" content={<UserPopup popupUser={captain} middle={false}/>}>
                                <Card>
                                    <span className="avatarUser"><img src={captain.photo} alt="avatar"/></span>
                                    <div className="about">
                                        <div className="name"><i className={`fa fa-circle ${isUserOnline(captain) ? 'online' : 'offline'}`}></i> {captain.userName}</div>
                                        <div className="status">{`${isUserOnline(captain) ? 'Online' : 'offline'}`}</div>                                            
                                    </div>
                                </Card>
                            </Popover>
                        </li>
                        {
                            teammates.map((participant, index) => (
                                <li className="clearfix active mb-1" key={index}>
                                    <Popover placement="topLeft" content={<UserPopup popupUser={participant} middle={false}/>}>
                                        <Card>
                                            <span className="avatarUser"><img src={participant.photo} alt="avatar"/></span>
                                            <div className="about">
                                                <div className="name"><i className={`fa fa-circle ${isUserOnline(participant) ? 'online' : 'offline'}`}></i> {participant.userName}</div>
                                                <div className="status">{`${isUserOnline(participant) ? 'Online' : 'offline'}`}</div>                                            
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
      </>
    );
};

export default UserListTeam;