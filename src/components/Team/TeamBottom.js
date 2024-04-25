import React from 'react';
import { Button, Empty, Row, Tabs, Tag, Timeline } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined, MessageOutlined } from '@ant-design/icons';
import TeamMates from './TeamMates';
import TeamInventory from './TeamInventory';
import useProfile from '../../hooks/useProfile';
import Preloader from '../PageLayout/Preloader';
import ChatRoomTeam from './ChatRoom/ChatRoomTeam';

const { TabPane } = Tabs;

const TeamBottom = ({team, isLoggedIn, userId, socket, isConnected, unreadCount, setUnreadCount}) => {
    const { handleTeamActivation } = useProfile();
    
    const handleTeamActivate = async (e) => {
        e.preventDefault();

        const data = {
            ...team,
            status: 'active'
        }

        const result = await handleTeamActivation(data);
        if(result.success){
            window.location.reload();
        }
    };

    return (
        <Tabs>
            <TabPane
                key="playground"
                tab={
                    <Row justify="left" align="middle">
                        <HistoryOutlined /> <span>Playground</span>
                    </Row>
                }
            >
                { team?.status === 'active' ? <Empty className='empty'/> :
                team?.captainId?._id === userId ?
                <div>
                    <h2 className="py-4">Activate your team following the steps below:</h2>
                    <Timeline
                        items={[
                            {
                                color: 'green',
                                children: (
                                    <>
                                    <h4><Tag color="green" style={{fontSize: '16px'}}>Step 1: Invite your friends to join</Tag></h4>
                                    <p>You have invited your friends to join the team. Once they accept the invitation they'll be joined to the team.</p>
                                    </>
                                ),
                            },
                            {
                                color: `${team?.members?.mates?.length+1 === team?.size ? 'green' : 'magenta'   }`,
                                children: (
                                    <>
                                    <h4><Tag color={`${team?.members?.mates?.length+1 === team?.size ? 'green' : 'magenta'}`} style={{fontSize: '16px'}}>Step 2: Invited players needs to join</Tag></h4>
                                    <p>Make sure everyone you invited has joined the team, you can cancel an invitation and send another friend to join the team.</p>
                                    </>
                                ),
                            },
                            {
                                color: `${team?.totalGameAccounts >= team?.size ? 'green' : 'magenta'}`,
                                children: (
                                    <>
                                    <h4><Tag color={`${team?.totalGameAccounts >= team?.size ? 'green' : 'magenta'}`} style={{fontSize: '16px'}}>Step 3: Add game accounts for {team.category}</Tag></h4>
                                    <p>Make sure you and your team mates have added your game accounts, so we can track your scores from the tournament.</p>
                                    </>
                                ),
                            },
                            {
                                color: 'magenta',
                                children: (
                                    <>
                                        {
                                            team?.totalGameAccounts >= team?.size ? 
                                            <Button type="primary" size="small" onClick={(e) => {handleTeamActivate(e)}}>
                                                Activate Team
                                            </Button> :
                                            <Button type="primary" size="small" disabled={true}>
                                                Activate Team
                                            </Button>
                                        }
                                    </>
                                ),
                            },
                        ]}
                    />
                </div> : 
                <div>
                    <h2 className="py-4">Activate your team following the steps below:</h2>
                    <Timeline
                        items={[
                            {
                                color: 'green',
                                children: (
                                    <>
                                    <h4><Tag color="green" style={{fontSize: '16px'}}>Step 1: Player invitation needs to be sent</Tag></h4>
                                    <p>Leader has invited all palyers to join the team. Once they accept the invitation they'll be joined to the team.</p>
                                    </>
                                ),
                            },
                            {
                                color: `${team?.members?.mates?.length+1 === team?.size ? 'green' : 'magenta'   }`,
                                children: (
                                    <>
                                    <h4><Tag color={`${team?.members?.mates?.length+1 === team?.size ? 'green' : 'magenta'}`} style={{fontSize: '16px'}}>Step 2: Invited players needs to join</Tag></h4>
                                    <p>Every player that the Leader invited has to join the team, captain can cancel an invitation and send another player to join the team.</p>
                                    </>
                                ),
                            },
                            {
                                color: `${team?.totalGameAccounts >= team?.size ? 'green' : 'magenta'}`,
                                children: (
                                    <>
                                    <h4><Tag color={`${team?.totalGameAccounts >= team?.size ? 'green' : 'magenta'}`} style={{fontSize: '16px'}}>Step 3: Add game accounts for {team.category}</Tag></h4>
                                    <p>Make sure you and your team mates have added your game accounts, so we can track your scores from the tournament.</p>
                                    </>
                                ),
                            },
                            {
                                color: 'magenta',
                                children: (
                                    <Button type="primary" size="small" disabled={true}>
                                        Ask your leader to activate the team
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </div>
                }
            </TabPane>

            <TabPane
                    key="mates"
                    tab={
                        <Row justify="left" align="middle">
                            <TeamOutlined /> <span>Mates</span>
                        </Row>
                    }
                >
                <TeamMates captain={team.captainId} tId={team._id} crossPlay={team.platforms.includes('cross')}/>
            </TabPane>

            <TabPane
                    key="chatroom"
                    tab={
                        <Row justify="left" align="middle">
                            <MessageOutlined /> <span>Chatroom</span>
                        </Row>
                    }
                >

                {
                    socket ? <ChatRoomTeam 
                                socket={socket}
                                isConnected={isConnected}
                                team={team} 
                                teammates={team?.members?.mates}
                                unreadCount={unreadCount}
                                setUnreadCount={setUnreadCount}
                            />
                    : <Preloader/>
                }
            </TabPane>

            {
                !isLoggedIn ? null : team?.captainId?._id === userId ?
                <TabPane
                    key="settings"
                    tab={
                        <Row justify="left" align="middle">
                            <SettingOutlined /> <span>Inventory</span>
                        </Row>
                    }
                >
                    <TeamInventory team={team}/>
                </TabPane> : null
            }
        </Tabs>
    );
};

export default TeamBottom;