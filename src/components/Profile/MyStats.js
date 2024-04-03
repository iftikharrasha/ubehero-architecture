import React, { useState } from 'react';
import { Card, Badge, Row, Col, Progress, Tooltip, Tabs, Button } from 'antd';
import { AliwangwangOutlined, TrophyOutlined, CloseSquareOutlined, PartitionOutlined, ProjectOutlined, UnlockOutlined } from '@ant-design/icons';
import BadgePopup from '../Common/BadgePopup/BadgePopup';
import useProfile from '../../hooks/useProfile';

const { TabPane } = Tabs;
const { Meta } = Card;

const MyStats = ({statsRouteKey, handleTabChange, stats, badges, gameStats}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [loadings, setLoadings] = useState([]);
    
    const enterLoading = async (index, badge) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
    //   setTimeout(() => {
    //     setLoadings((prevLoadings) => {
    //       const newLoadings = [...prevLoadings];
    //       newLoadings[index] = false;
    //       return newLoadings;
    //     });
    //   }, 6000);
    };
    
    const [claimedBadge, setClaimedBadge] = useState(null);
    const { handleClaimingBadgetHook } = useProfile();

    const showModal = async (index, badge) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });

        if(badge.claimed){
            const claimedItem = await handleClaimingBadgetHook(badge);
            console.log('claimed once?:', claimedItem.badge.claimed, claimedItem.claimed);
            if(!claimedItem.badge.claimed){
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[index] = false;
                    return newLoadings;
                });
                setClaimedBadge(badge)
                setIsModalOpen(true);
            }
        }else{
            setClaimedBadge(badge)
            setIsModalOpen(true);
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }
    };
    
    return (
    <>
        <Tabs activeKey={statsRouteKey} onChange={handleTabChange}  tabPosition="left">
            <TabPane
                key="games"
                tab={
                    <Row justify="left" align="middle">
                        <ProjectOutlined  style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Games</span>
                    </Row>
                }
            >
                <Card>
                    {
                        <Row gutter={[16, 16]}>
                            {
                                gameStats.map((stat, index) => (
                                    <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                        <Badge.Ribbon text={stat.category} style={{ color: 'gray', fontSize: '1rem', padding: "0.25rem 1rem"}}>
                                            <Card className='mb-3 gameStat'
                                                cover={
                                                    <img
                                                        alt="example"
                                                        src={stat.img}
                                                    />
                                                }
                                                actions={[
                                                    <Row justify="center" align="middle">
                                                        <span className="ps-1" style={{ fontSize: '14px' }}><AliwangwangOutlined /> Played:  {stats.games.fifa ? stats.games.fifa.defeat : 0}</span>
                                                    </Row>,
                                                    <Row justify="center" align="middle">
                                                        <span className="ps-1" style={{ fontSize: '14px' }}><TrophyOutlined /> Win: {stats.games.fifa ? stats.games.fifa.win : 0}</span>
                                                    </Row>,
                                                    <Row justify="center" align="middle">
                                                        <span className="ps-1" style={{ fontSize: '14px' }}><CloseSquareOutlined /> Defeat: {stats.games.fifa ? stats.games.fifa.win : 0}</span>
                                                    </Row>,
                                                ]}
                                            >
                                            </Card>
                                        </Badge.Ribbon>
                                    </Col>
                                ))
                            }
                        </Row>
                    }
                </Card>
            </TabPane> 
            <TabPane
                key="badges"
                tab={
                    <Row justify="left" align="middle">
                        <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Badges</span>
                    </Row>
                }
            >
                {
                    <Row gutter={[16, 16]}>
                        {
                            badges.slice(0).reverse().map((badge, index) => (
                                <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                    <Card className='mb-3' onClick={() => showModal(index, badge)} hoverable>
                                        <Meta
                                            avatar={
                                                <img src={badge.icon} alt='badge' width={30}/>
                                            }
                                            title={<Tooltip title={badge.instruction} className='ms-2'>  
                                                        {badge.title}
                                                    </Tooltip>}
                                            description={
                                                <>
                                                    <Progress percent={badge.locked ? 100 : badge.claimed ? 100 : 1}/>
                                                    {
                                                        badge.claimed ?
                                                        <Button type="primary" size="small" onClick={() => showModal(index, badge)} loading={loadings[index]}>Claim Badge</Button> :
                                                        <Button type="default" size="small" icon={<UnlockOutlined />} onClick={() => showModal(index, badge)}>{badge.locked ? 'Unlocked' : 'See Objective'}</Button>
                                                    }
                                                </>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                }
            </TabPane>
        </Tabs>

        {
            !claimedBadge ? null :
            <BadgePopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} claimedBadge={claimedBadge}/>
        }
    </>
    );
};

export default MyStats;