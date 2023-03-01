import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import UserList from './UserList';
import SendBox from './SendBox';
import MessagePanel from './MessagePanel';

const ChatRoom = ({socket, tournamentDetails, leaderboardDetails, routeKey}) => {
    const { _id, tournamentName } = tournamentDetails;
    const { leaderboard } = leaderboardDetails;
    const { loggedInUser } = useAuth();

    useEffect(() => {
        if (socket) {
            const room = _id;
            const senderName = loggedInUser.name;

            const data = {
              room: room,
              senderName: senderName,
            }

            socket.emit("join_room", data);
        }
    }, []);

    return (
       <div className='chatroom'>
        <div className="container">
            <div className="row clearfix">
                <div className="col-lg-8">
                    <div className="card">
                        <MessagePanel 
                            socket={socket} 
                            tournamentDetails={tournamentDetails} 
                            loggedInUser={loggedInUser}
                            routeKey={routeKey}/>
                        <SendBox socket={socket} roomId={_id} room={tournamentName} loggedInUser={loggedInUser}/>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <UserList leaderboard={leaderboard}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ChatRoom;