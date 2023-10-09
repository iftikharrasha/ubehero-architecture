import React from 'react';
import { Card, Badge, Row, Col, Avatar, Progress, Tooltip, Tabs } from 'antd';
import { AliwangwangOutlined, TrophyOutlined, CloseSquareOutlined, InfoCircleOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Meta } = Card;

const MyStats = ({statsRouteKey, handleTabChange, stats, badges, gameStats}) => {
    return (
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
                            badges.map((badge, index) => (
                                <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                    <Card className='mb-3'>
                                        <Meta
                                            avatar={<Avatar src={badge.icon} />}
                                            title={badge.title}
                                            description={
                                                <>
                                                    <div className='d-flex'><Progress percent={badge.completed}/></div>
                                                    <p className='card-text' style={{fontSize: '14px'}}>0/700 xp points unlocked 
                                                        <Tooltip title={badge.instruction} className='ms-2'>  
                                                            <InfoCircleOutlined />
                                                        </Tooltip>
                                                    </p>
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

        // <>
        //     <h5 className='mb-4'>Game <strong>Statistics</strong></h5>
        //     <Row gutter={[16, 16]}>
        //     {
        //             gameStats.map((stat, index) => (
        //                 <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
        //                     <Badge.Ribbon text={stat.category} style={{ color: 'gray', fontSize: '1rem', padding: "0.25rem 1rem"}}>
        //                         <Card className='mb-3 gameStat'
        //                             cover={
        //                                 <img
        //                                     alt="example"
        //                                     src={stat.img}
        //                                 />
        //                             }
        //                             actions={[
        //                                 <Row justify="center" align="middle">
        //                                     <span className="ps-1" style={{ fontSize: '14px' }}><AliwangwangOutlined /> Played:  {stats.games.fifa ? stats.games.fifa.defeat : 0}</span>
        //                                 </Row>,
        //                                 <Row justify="center" align="middle">
        //                                     <span className="ps-1" style={{ fontSize: '14px' }}><TrophyOutlined /> Win: {stats.games.fifa ? stats.games.fifa.win : 0}</span>
        //                                 </Row>,
        //                                 <Row justify="center" align="middle">
        //                                     <span className="ps-1" style={{ fontSize: '14px' }}><CloseSquareOutlined /> Defeat: {stats.games.fifa ? stats.games.fifa.win : 0}</span>
        //                                 </Row>,
        //                             ]}
        //                         >
        //                         </Card>
        //                     </Badge.Ribbon>
        //                 </Col>
        //             ))
        //         }
        //     </Row>

        //     <h5 className='my-4'>Badge <strong>Statistics</strong></h5>
        //     <Row gutter={[16, 16]}>
        //         {
        //             badges.map((badge, index) => (
        //                 <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
        //                     <Card className='mb-3'>
        //                         <Meta
        //                             avatar={<Avatar src={badge.icon} />}
        //                             title={badge.title}
        //                             description={
        //                                 <>
        //                                     <div className='d-flex'><Progress percent={badge.completed}/></div>
        //                                     <p className='card-text' style={{fontSize: '14px'}}>0/700 xp points unlocked 
        //                                         <Tooltip title={badge.instruction} className='ms-2'>  
        //                                             <InfoCircleOutlined />
        //                                         </Tooltip>
        //                                     </p>
        //                                 </>
        //                             }
        //                         />
        //                     </Card>
        //                 </Col>
        //             ))
        //         }
        //     </Row>
        // </>
    );
};

export default MyStats;