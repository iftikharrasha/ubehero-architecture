import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import UserList from './UserList';
import SendBox from './SendBox';
import MessagePanel from './MessagePanel';
import { useSelector } from 'react-redux';
import { Card } from 'antd';

const ChatRoom = ({socket, isConnected, tournamentDetails, leaderboards, routeKey, unreadCount, setUnreadCount}) => {
    const { _id, tournamentName, masterProfile } = tournamentDetails;
    const profile = useSelector((state) => state.profile)

    useEffect(() => {
        if (socket) {
            // Get master's username and photo from tournamentDetails
            const { userName, photo } = masterProfile;

            const data = {
              userId: profile?.data?._id,
              roomId: _id,
              senderName: profile?.data?.userName,
              senderPhoto: profile?.data?.photo,
              stats: profile?.data?.stats,
              masterUsername: userName,
              masterPhoto: photo,
              country: profile?.data?.country,
              friends: profile?.data?.friends,
              followers: profile?.data?.followers
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
                        tournament={tournamentDetails} 
                        profile={profile}
                        routeKey={routeKey}
                        unreadCount={unreadCount}
                        setUnreadCount={setUnreadCount}/>
                    <SendBox 
                        socket={socket} 
                        isConnected={isConnected}
                        roomId={_id} 
                        room={tournamentName} 
                        profile={profile}
                    />
                </Card>
            </div>
            <div className="col-lg-4">
                <Card>
                    {
                        leaderboards && 
                        <UserList socket={socket} leaderboards={leaderboards}/>
                    }
                </Card>
            </div>
        </div>
    </div>
    );
};

export default ChatRoom;