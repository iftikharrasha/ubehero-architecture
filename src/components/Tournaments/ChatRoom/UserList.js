import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const UserList = ({socket, leaderboard}) => {
    const [roomUsers, setRoomUsers] = useState([]);

    useEffect(() => {
        socket.on("chatroom_users", (data) => {
          setRoomUsers(data);
        });
    
        return () => socket.off("chatroom_users");
    }, [socket]);

    const isUserOnline = (user) => {
        return roomUsers.some((roomUser) => roomUser.name === user.userName);
    }

    return (
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
                                <li className="clearfix active mb-1" key={index}>
                                    <img src={participant.senderPhoto} alt="avatar"/>
                                    <div className="about">
                                        <div className="name"><i className="fa fa-circle online"></i> {participant.name}</div>
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
                                <li className="clearfix active mb-1" key={index}>
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
    );
};

export default UserList;