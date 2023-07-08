import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import UserList from './UserList';
import SendBox from './SendBox';
import MessagePanel from './MessagePanel';
import { useSelector } from 'react-redux';
import { Card } from 'antd';

const ChatRoom = ({socket, isConnected, tournamentDetails, leaderboards, routeKey, unreadCount, setUnreadCount}) => {
    const { _id, tournamentName, masterProfile } = tournamentDetails;
    const { loggedInUser } = useAuth();
    const user = useSelector((state) => state.profile.data)

    useEffect(() => {
        if (socket) {
            const roomId = _id;
            const userId = loggedInUser.id;
            const senderName = loggedInUser.name;
            const senderPhoto = loggedInUser.photo;
            const stats = user.stats;

            // Get master's username and photo from tournamentDetails
            const { userName, photo } = masterProfile;

            const data = {
              userId: userId,
              roomId: roomId,
              senderName: senderName,
              senderPhoto: senderPhoto,
              stats: stats,
              masterUsername: userName,
              masterPhoto: photo
            }

            socket.emit("join_room", data);
        }
    }, []);

    return (
       <div className='chatroom'>
        <div className="row clearfix">
            <div className="col-lg-8">
                <Card
                    title={tournamentDetails.tournamentName}
                    bordered={false}
                >
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
                </Card>
            </div>
            <div className="col-lg-4">
                <Card>
                    <UserList socket={socket} leaderboards={leaderboards}/>
                </Card>
            </div>
        </div>
    </div>
    );
};

export default ChatRoom;