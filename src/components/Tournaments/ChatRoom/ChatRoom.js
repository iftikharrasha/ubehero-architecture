import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import UserList from './UserList';
import SendBox from './SendBox';
import MessagePanel from './MessagePanel';

const ChatRoom = ({socket, tournamentDetails, leaderboardDetails, chatroomDetails}) => {
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
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <MessagePanel 
                            socket={socket} 
                            tournamentDetails={tournamentDetails} 
                            chatroomDetails={chatroomDetails} 
                            loggedInUser={loggedInUser}/>
                        <SendBox socket={socket} room={_id} loggedInUser={loggedInUser}/>
                        {/* <UserList leaderboard={leaderboard}/> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ChatRoom;