import React, { useEffect } from 'react';
import UserList from './UserListTeam';
import SendBox from './SendBoxTeam';
import MessagePanel from './MessagePanelTeam';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import MessagePanelTeam from './MessagePanelTeam';
import SendBoxTeam from './SendBoxTeam';
import UserListTeam from './UserListTeam';

const ChatRoomTeam = ({socket, isConnected, team, teammates, unreadCount, setUnreadCount}) => {
    const { _id, teamName, createdAt, photo, version, stats, coverPhoto, captainId, members } = team;

    const profile = useSelector((state) => state.profile)

    useEffect(() => {
        if (socket) {
            // Get master's username and photo from tournamentDetails
            const { userName, photo } = captainId;

            const data = {
              userId: profile?.data?._id,
              roomId: _id,
              senderName: profile?.data?.userName,
              senderPhoto: profile?.data?.photo,
              stats: profile?.data?.stats,
              captainUsername: userName,
              captainPhoto: photo,
              country: profile?.data?.country,
              friends: profile?.data?.friends,
              followers: profile?.data?.followers
            }

            socket.emit("join_team_room", data);
        }
    }, []);

    return (
       <div className='chatroom'>
        <div className="row clearfix">
            <div className="col-lg-8">
                <Card
                    title={teamName}
                    bordered={false}
                >
                    <MessagePanelTeam 
                        socket={socket} 
                        team={team} 
                        profile={profile}
                        unreadCount={unreadCount}
                        setUnreadCount={setUnreadCount}/>
                    <SendBoxTeam 
                        socket={socket} 
                        isConnected={isConnected}
                        roomId={_id} 
                        room={teamName} 
                        profile={profile}
                    />
                </Card>
            </div>
            <div className="col-lg-4">
                <Card>
                    {
                        teammates && 
                        <UserListTeam socket={socket} teammates={teammates}/>
                    }
                </Card>
            </div>
        </div>
    </div>
    );
};

export default ChatRoomTeam;