import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Progress, Typography, Tag, Row, Space, Avatar, List } from 'antd';
import { MessageOutlined, CoffeeOutlined, LikeOutlined, StarOutlined, TrophyOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const { Meta } = Card;
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const TournamentSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, isLoggedIn, routeKey, tournament, purchasedItems, handleCancel, handleCheckout, step, buttonStatus, timeLeftPercent}) => {
    const { _id, leaderboards, settings, tournamentName } = tournament;
    const { loggedInUser } = useAuth();

    let sideStep; //dynamic component
    switch (step) {
        case 1:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Paragraph className="mb-0">Registration Time Left</Paragraph>
                    <Progress percent={timeLeftPercent} steps={12} showInfo={true}/> 
                </div>
            );
        break;

        case 2:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Paragraph className="mb-0">Join the game Loby!</Paragraph>
                </div>
            );
        break;

        case 3:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Paragraph className="mb-0">Tournament Started!</Paragraph>
                </div>
            );
        break;

        case 4:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Paragraph className="mb-0">Tournament Finished!</Paragraph>
                </div>
            );
        break;

        default:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Paragraph className="mb-0">Tournament Upcoming!</Paragraph>
                </div>
            );;
    
    }
  
    return (
        <div className="list-group sticky-top">
            <Card bordered style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }} ref={ref1TSummery1}
            cover={<img alt="example" src={tournament.tournamentThumbnail} />}>
                <List
                    itemLayout="vertical"
                    size="large" 
                >
                    <List.Item style={{ padding: '0' }}>
                        <List.Item.Meta
                            avatar={<TrophyOutlined style={{ fontSize: '30px' }} />}
                            title={<h4>WIN 50$</h4>}
                        />
                        <div>
                            <IconText icon={LikeOutlined} text={<p className='card-text'>Entry Mode: {settings.mode}</p>} key="list-vertical-like-o" />
                        </div>
                        <div>
                            <IconText icon={LikeOutlined} text={<p className='card-text'>Competition Mode: {settings.competitionMode}</p>} key="list-vertical-like-o" />
                        </div>
                        <div>
                            <IconText icon={StarOutlined} text={<p className='card-text'>Joined: {leaderboards.length}/{tournament.settings?.maxParticipitant}</p>} key="list-vertical-star-o" />
                        </div>
                    </List.Item>
                </List>
                
                {sideStep}

                <div>
                    {
                        !isLoggedIn ? 
                        <Link to={`/login`} ref={ref1TSummery3}>
                            <Button type="primary" size="small" className="mt-3">
                                {buttonStatus}
                            </Button>  
                        </Link> :
                        purchasedItems.tournaments?.includes(_id) ? 
                            <Tag color="success" ref={ref1TSummery3} className="mt-3">JOINED</Tag> :
                                routeKey === 'checkout' ? 
                                <Button type="primary" size="small" className="mt-3" onClick={handleCancel} ref={ref1TSummery3}>
                                    CANCEL
                                </Button> : 
                                    buttonStatus !== 'Join Now' ? 
                                    <Tag color="volcano" ref={ref1TSummery3} className="mt-3">{buttonStatus}</Tag> :
                                    <Button type="primary" size="small" className="mt-3" onClick={handleCheckout} ref={ref1TSummery3}>
                                        {buttonStatus}
                                    </Button>
                    }
                </div>
            </Card>
            
            
            <Card
                style={{
                    boxShadow: 'none',
                    marginTop: '20px',
                }}
                className="popCard"
                bordered={false}
                actions={tournament.masterProfile?.key === loggedInUser.id ? null : [
                    <Row justify="center" align="middle">
                        <Button icon={<MessageOutlined  style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }}>CHAT</Button>
                    </Row>,
                    <Row justify="center" align="middle">
                        <Button icon={<CoffeeOutlined style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }}>FOLLOW</Button>
                    </Row>
                ]}
                >
                <Meta
                    avatar={<Avatar src={tournament.masterProfile.photo} />}
                    title={tournament.masterProfile.userName}
                    description={`Master of the tournament`}
                />
                {/* <Row gutter={[16, 16]} className="pt-3">
                    <Col span={12}>
                        <Card bordered={false} className="popBody">
                            <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                            <Paragraph className="mb-0">Country</Paragraph>
                            <Paragraph className="mb-0">BD</Paragraph>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false} className="popBody">
                            <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                            <Paragraph className="mb-0">Follower</Paragraph>
                            <Paragraph className="mb-0">{tournament.masterProfile.noOfFollowers}</Paragraph>
                            </Row>
                        </Card>
                    </Col>
                </Row> */}
            </Card>
        </div>
    );
};

export default TournamentSide;