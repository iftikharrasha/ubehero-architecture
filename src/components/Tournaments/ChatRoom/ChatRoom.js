import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import UserList from './UserList';
import SendBox from './SendBox';
import MessagePanel from './MessagePanel';

const ChatRoom = ({socket, isConnected, tournamentDetails, leaderboardDetails, routeKey, isTyping, setIsTyping}) => {
    const { _id, tournamentName } = tournamentDetails;
    const { leaderboard } = leaderboardDetails;
    const { loggedInUser } = useAuth();

    useEffect(() => {
        if (socket) {
            const roomId = _id;
            const senderName = loggedInUser.name;
            const senderPhoto = loggedInUser.photo;

            const data = {
              roomId: roomId,
              senderName: senderName,
              senderPhoto: senderPhoto
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
                        <SendBox 
                            socket={socket} 
                            isConnected={isConnected}
                            roomId={_id} 
                            room={tournamentName} 
                            loggedInUser={loggedInUser}
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <UserList socket={socket} leaderboard={leaderboard}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ChatRoom;