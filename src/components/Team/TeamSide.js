import React, { useContext, useState } from 'react';
import { Card, Button, Progress, Typography, Timeline, Badge, Tabs, Row, Avatar, Tag } from 'antd';
import { PartitionOutlined, DoubleRightOutlined, MessageOutlined, CrownOutlined, CoffeeOutlined } from '@ant-design/icons';
import InboxContext from '../../Contexts/InboxContext/InboxContext';
import useProfile from '../../hooks/useProfile';

const { Paragraph } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;

const copies = [1, 2, 3, 4, 5, 6, 7, 8];
const ranks = [
    {
        level: 1,
        title: 'Underdog Coalition',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg',
        xpCap: 5000,
    },
    {
        level: 2,
        title: 'Fractured Vanguard',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/3_Apprentice.svg',
        xpCap: 10000,
    },
    {
        level: 3,
        title: 'Blade Alliance',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/9_RisingStar.svg',
        xpCap: 15000,
    },
    {
        level: 4,
        title: 'Swiftstrike Brigade',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/2_Rookie.svg',
        xpCap: 20000,
    },
    {
        level: 5,
        title: 'Citadel Raiders',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/6_Enthusiast.svg',
        xpCap: 25000,
    },
    {
        level: 6,
        title: 'Ironbound Legion',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/6_Enthusiast.svg',
        xpCap: 30000,
    },
    {
        level: 7,
        title: 'Liberty Guards',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/9_RisingStar.svg',
        xpCap: 35000,
    },
    {
        level: 8,
        title: 'Blaze Wardens',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/8_Regular.svg',
        xpCap: 40000,
    },
    {
        level: 9,
        title: 'Elite Tribune',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg',
        xpCap: 45000,
    },
    {
        level: 10,
        title: 'Eternity Assembly',
        icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg',
        xpCap: 50000,
    },
]

const TeamSide = ({socketN, team, isLoggedIn, userId}) => {
    const { stats, members, category, captainId } = team;
    const { levelTitle, currentLevel } = stats;
    const [profileSideKey, setProfileSideKey] = useState('currentBage')
    const { handleTeamJoiningRequestHook } = useProfile();
    
    // const now = Math.ceil(((stats.currentXP / (stats.currentXP  + stats.nextLevelRequiredXP)) * 100));
    const detectLevelAndTitle = (teamTotalXp) => {
        let level = 0;
        let title = '';
    
        for (let i = 0; i < ranks.length; i++) {
            if (teamTotalXp <= ranks[i].xpCap) {
                level = ranks[i].level;
                title = ranks[i].title;
                break;
            }
        }
    
        return { level, title };
    };

    const { level, title } = detectLevelAndTitle(team.teamTotalXp);

    const onChange = (key) => {
      setProfileSideKey(key);
    };

    const { setShowInbox, setPopUser } = useContext(InboxContext);
    const handleInboxPop = () => {
        setPopUser(team.captainId);
        setShowInbox(true);
    };
    
    const handleJoiningTeam = async (e, item, type) => {
        e.preventDefault();

        const data = {
            type: type,
            from: userId,
            to: team._id
        }

        const result = await handleTeamJoiningRequestHook(data, item);
        if(result.success){
            window.location.reload();
            // if(type === 'invite_request_reject') {
            // socketN.emit("delete_notification", item._id);
            //     // Update the state locally
            //     setNotyfReceived((notifications) => {
            //         const updatedNotifications = notifications.filter(notification => notification._id !== item._id);
            //         return updatedNotifications;
            //     });
            // }else{
            // const updatadData = {
            //     type: "friend_request_accept", 
            //     subject: `Is your friend now`, 
            //     invokedByName: item.invokedByName
            // }
            
            // // Update the database on server
            // socketN.emit("update_notification", item._id, updatadData);
        
            // // Update the state locally
            // setNotyfReceived((notifications) => {
            //     const updatedNotifications = notifications.map((notification) => {
            //     if (notification._id === item._id) {
            //         return  { ...notification, 
            //                 ...updatadData
            //                 };
            //     }
            //     return notification;
            //     });
            //     return updatedNotifications;
            // });
            // }
            // setClickedItem(null)
        }
    };

    return (
        <div className="list-group sticky-top">
          <Tabs activeKey={profileSideKey} onChange={onChange}>
              <TabPane
                  key="currentBage"
                  tab={
                      <Row justify="left" align="middle">
                          <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Team Rank</span>
                      </Row>
                  }
              >
                <Card>
                    <div className="number">{level}</div>
                    <div className="badgeClaimed">
                        <div className='spinningasset'>
                            <img src='https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg' alt='claim'/>
                            {
                                copies.map((copy, index) => (
                                    <i style={{ backgroundImage: `url('https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg')` }} key={index}></i>
                                ))
                            }
                        </div>
                    </div>
                    <>
                        <div className="instructions text-center">
                            <h2>{title}</h2>
                            <p>
                                Level {level}
                            </p>
                        </div>
                        <ul className='rewards ps-0'>
                            <li>
                                <img src="https://cdn-icons-png.flaticon.com/512/8037/8037151.png" alt="loot" width={50}/>
                                <span>
                                    {members?.mates?.length+1}/3 <br /> Mates
                                </span>
                            </li>
                            <li>
                                <img src="https://icones.pro/wp-content/uploads/2022/07/icone-jeux-et-jeux-video-violet.png" alt="gems" width={50}/>
                                <span>
                                    Game <br /><Tag color='volcano' bordered={false} style={{textTransform: 'uppercase'}}>{category}</Tag>
                                </span>
                            </li>
                            <li>
                                <img src="https://miro.medium.com/v2/resize:fit:728/1*jBIARTlGCm6J8d29xcVekg.png" alt="xp" width={50}/>
                                <span>
                                    {team.teamTotalXp} <br />XP
                                </span>
                            </li>
                        </ul>
                    </> 

                    {
                        members?.invited?.find(u => u._id === userId) ? 
                        <Button type="primary" size="small" className="mt-3 joinButton" onClick={(e) => {e.stopPropagation(); handleJoiningTeam(e, team.captainId, 'invite_request_accept')}}>
                            Accept Invitation
                        </Button>  : 
                         members?.mates?.find(u => u._id === userId) || (captainId._id === userId) ? 
                         <Tag color="green" className="joinButton">Joined</Tag> : null
                    }
                </Card>

                
                <Card
                    style={{
                        boxShadow: 'none',
                        marginTop: '20px',
                    }}
                    className="popCard mt-5"
                    bordered
                    actions={!isLoggedIn ? null : team.captainId?._id === userId ? null : [
                        <Row justify="center" align="middle">
                            <Button icon={<MessageOutlined  style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }} onClick={handleInboxPop}>CHAT</Button>
                        </Row>,
                        <Row justify="center" align="middle">
                            <Button icon={<CoffeeOutlined style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }}>FOLLOW</Button>
                        </Row>
                    ]}
                    >
                    <Meta
                        avatar={<Avatar src={team.captainId.photo} />}
                        title={<h6>{team.captainId.userName}</h6>}
                        description={<p className='mb-0'><CrownOutlined style={{ fontSize: '16px', color: 'gold', marginBottom: '0px' }}/> Team Leader</p>}
                    />
                </Card>
              </TabPane>
              <TabPane
                  key="journey"
                  tab={
                      <Row justify="left" align="middle">
                          <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Journey</span>
                      </Row>
                  }
              >

                <Card bordered style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', }}>
                    <Timeline>
                        {
                            ranks.map((rank, index) => {
                                const isCurrentLevel = rank.level === level;
                                const showNextRankBadge = rank.level === level+1;
                                const xpNeededForNextLevel = rank.xpCap - team.teamTotalXp;
                                const now = Math.ceil(((team.teamTotalXp / (team.teamTotalXp  + xpNeededForNextLevel)) * 100));
      
                                return (
                                    <Timeline.Item key={index} label={false} color={rank.level <= level+1 ? 'green' : 'gray'} dot={showNextRankBadge ? <DoubleRightOutlined style={{fontSize: '26px'}} /> : rank.level}>
                                      {showNextRankBadge ? (
                                        <Badge.Ribbon text={`${team.teamTotalXp}xp`} color="#f030c0">
                                          <Card>
                                            <Meta
                                              title={
                                                <span className='text-capital'>
                                                  <img alt="rank" src={rank?.icon} width={26} height={26} /> {rank?.title}
                                                </span>
                                              }
                                              description={
                                                <div>
                                                  <Progress percent={now} steps={12} />
                                                  <p className='card-text' style={{fontSize: '14px'}}>{xpNeededForNextLevel} xp needed to unlock this rank</p>
                                                </div>
                                              }
                                            />
                                          </Card>
                                        </Badge.Ribbon>
                                      ) : (
                                        <Paragraph className={rank.level <= level ? null : 'grayscale'}>
                                          <img alt="rank" src={rank.icon} width={26} height={26} /> {rank.title}
                                        </Paragraph>
                                      )}
                                    </Timeline.Item>
                                )
                            })
                        }
                    </Timeline>
                </Card>
              </TabPane>
          </Tabs>
        </div>
    );
};

export default TeamSide;