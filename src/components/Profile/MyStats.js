import React from 'react';
import { Card, Badge, Row } from 'antd';
import { AliwangwangOutlined, TrophyOutlined, CloseSquareOutlined } from '@ant-design/icons';

const { Meta } = Card;

const MyStats = ({stats}) => {
    return (
        <>
            <Badge.Ribbon text="FIFA" style={{ color: 'gray', fontSize: '1rem', padding: "0.25rem 1rem"}}>
                <Card className='mb-3'
                    actions={[
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><AliwangwangOutlined /> Played:  {stats.games.fifa ? stats.games.fifa.defeat : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><TrophyOutlined /> Win: {stats.games.fifa ? stats.games.fifa.win : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><CloseSquareOutlined /> Defeat: {stats.games.fifa ? stats.games.fifa.win : 0}</span>
                        </Row>,
                    ]}
                >
                    <Meta
                        title="FIFA"
                    />
                </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="PUBG" style={{ color: 'gray', fontSize: '1rem', padding: "0.25rem 1rem"}}>
                <Card className='mb-3'
                    actions={[
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><AliwangwangOutlined /> Played:  {stats.games.pubg ? stats.games.pubg.defeat : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><TrophyOutlined /> Win: {stats.games.pubg ? stats.games.pubg.win : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><CloseSquareOutlined /> Defeat: {stats.games.pubg ? stats.games.pubg.win : 0}</span>
                        </Row>,
                    ]}
                >
                    <Meta
                        title="PUBG"
                    />
                </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="WARZONE" style={{ color: 'gray', fontSize: '1rem', padding: "0.25rem 1rem"}}>
                <Card className='mb-3'
                    actions={[
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><AliwangwangOutlined /> Played:  {stats.games.warzone ? stats.games.warzone.defeat : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><TrophyOutlined /> Win: {stats.games.warzone ? stats.games.warzone.win : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><CloseSquareOutlined /> Defeat: {stats.games.warzone ? stats.games.warzone.win : 0}</span>
                        </Row>,
                    ]}
                >
                    <Meta
                        title="WARZONE"
                    />
                </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="CSGO" style={{ color: 'gray', fontSize: '1rem', padding: "0.25rem 1rem"}}>
                <Card className='mb-3'
                    actions={[
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><AliwangwangOutlined /> Played:  {stats.games.csgo ? stats.games.csgo.defeat : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><TrophyOutlined /> Win: {stats.games.csgo ? stats.games.csgo.win : 0}</span>
                        </Row>,
                        <Row justify="center" align="middle">
                            <span className="ps-1" style={{ fontSize: '16px' }}><CloseSquareOutlined /> Defeat: {stats.games.csgo ? stats.games.csgo.win : 0}</span>
                        </Row>,
                    ]}
                >
                    <Meta
                        title="CSGO"
                    />
                </Card>
            </Badge.Ribbon>
        </>
    );
};

export default MyStats;