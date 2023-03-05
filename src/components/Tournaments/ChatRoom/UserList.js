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

    return (
        <Tabs
            defaultActiveKey="online"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="online" title={`Online (${roomUsers.length})`}>
                <div id="plist" className="people-list px-1">
                    <ul className="list-unstyled chat-list mb-0">
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
                                        <div className="name"><i className="fa fa-circle online"></i> {participant.userName}</div>
                                        <div className="status">Joined {moment(participant.timeStamp).fromNow()} </div>                                            
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