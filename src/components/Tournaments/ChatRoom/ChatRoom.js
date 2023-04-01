import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import UserList from './UserList';
import SendBox from './SendBox';
import MessagePanel from './MessagePanel';
import { useSelector } from 'react-redux';

const ChatRoom = ({socket, isConnected, tournamentDetails, leaderboardDetails, routeKey, unreadCount, setUnreadCount}) => {
    const { _id, tournamentName } = tournamentDetails;
    const { leaderboard } = leaderboardDetails;
    const { loggedInUser } = useAuth();
    const user = useSelector((state) => state.profile.data)

    useEffect(() => {
        if (socket) {
            const roomId = _id;
            const userId = loggedInUser.id;
            const senderName = loggedInUser.name;
            const senderPhoto = loggedInUser.photo;
            const stats = user.stats;

            const data = {
              userId: userId,
              roomId: roomId,
              senderName: senderName,
              senderPhoto: senderPhoto,
              stats: stats
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
                            routeKey={routeKey}
                            unreadCount={unreadCount}
                            setUnreadCount={setUnreadCount}/>
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