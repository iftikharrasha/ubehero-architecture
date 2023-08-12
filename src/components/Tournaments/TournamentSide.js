import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Progress, Typography, Tag, Row, Space, Avatar, List } from 'antd';
import { MessageOutlined, CoffeeOutlined, LikeOutlined, StarOutlined, TrophyOutlined, SyncOutlined, UserOutlined, UsergroupAddOutlined, ProjectOutlined, PartitionOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const { Meta } = Card;
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const TournamentSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, isLoggedIn, routeKey, tournament, totalJoined, purchasedItems, handleCancel, handleCheckout, step, buttonStatus, timeLeftPercent}) => {
    const { _id, settings, tournamentName } = tournament;
    const { loggedInUser } = useAuth();
    const purchased = purchasedItems?.tournaments?.includes(_id);

    let sideStep;
    switch (step) {
        case 1:
            sideStep = (
                <>
                    {
                        !isLoggedIn ? 
                        <>
                            <div ref={ref1TSummery2} style={{ paddingTop: '20px'}}>
                                <Tag className="p-2" color="cyan" style={{ width: '100%' }}>Registration Time Progressed: <br />
                                    <Progress percent={timeLeftPercent} steps={17} showInfo={true} strokeColor="#f030c0" style={{ width: '100%' }}/> 
                                </Tag>
                            </div>
                            <Link to={`/login`} ref={ref1TSummery3}>
                                <Button type="primary" size="small" className="mt-3">
                                    {buttonStatus}
                                </Button>  
                            </Link> 
                        </>:
                        purchased ? 
                            <Tag color="success" ref={ref1TSummery3} className="mt-3">Slot Booked</Tag> :
                            routeKey === 'checkout' ? 
                            <Button danger size="medium" className="mt-3 joinButton" onClick={handleCancel} ref={ref1TSummery3}>
                                CANCEL
                            </Button> : 
                            buttonStatus !== 'Join Now' ? 
                            <Tag color="volcano" ref={ref1TSummery3} className="mt-3">{buttonStatus}</Tag> :
                            <>
                                <div ref={ref1TSummery2} style={{ paddingTop: '20px'}}>
                                    <Tag className="p-2" color="cyan" style={{ width: '100%' }}>Registration Time Progressed: <br />
                                        <Progress percent={timeLeftPercent} steps={17} showInfo={true} strokeColor="#f030c0" style={{ width: '100%' }}/> 
                                    </Tag>
                                </div>
                                <Button type="primary" size="medium" className="mt-3 joinButton" onClick={handleCheckout}>
                                    {buttonStatus}
                                </Button>  
                            </>
                    }
                </>
            );
        break;

        case 2:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Tag color="cyan" icon={<SyncOutlined spin />} style={{ fontSize: '16px' }}>Live</Tag>
                    <Paragraph style={{ fontSize: '16px', display: 'inline' }}>Preparation Started!</Paragraph>
                </div>
            );
        break;

        case 3:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Tag color="cyan" icon={<SyncOutlined spin />} style={{ fontSize: '16px' }}>Live</Tag>
                    <Paragraph style={{ fontSize: '16px', display: 'inline' }}>Battle Started!</Paragraph>
                </div>
            );
        break;

        case 4:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Tag color="volcano" style={{ fontSize: '16px' }}>Tournament Finished!</Tag>
                </div>
            );
        break;

        default:
            sideStep = (
                <div ref={ref1TSummery2} style={{ paddingTop: '20px' }}>
                    <Tag color="magenta" style={{ fontSize: '16px' }}>Tournament Upcoming!</Tag>
                </div>
            );;
    
    }
  
    return (
        <div className="list-group sticky-top">
            <Card bordered style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }} ref={ref1TSummery1}
            cover={<img alt="example" src={tournament.tournamentThumbnail} />}>
                <List itemLayout="vertical" size="large">
                    <List.Item style={{ padding: '0' }}>
                        <List.Item.Meta
                            avatar={<TrophyOutlined style={{ fontSize: '30px' }} />}
                            title={<h4>WIN 50$</h4>}
                        />
                        <div style={{ fontSize: '16px' }} >
                            <IconText icon={settings.mode === 'solo' ? UserOutlined : UsergroupAddOutlined} text={<p className='card-text'>Entry Mode: {settings.mode}</p>} key="list-vertical-like-o" />
                        </div>
                        <div style={{ fontSize: '16px' }}>
                            <IconText icon={settings.competitionMode === 'ladder' ? ProjectOutlined : PartitionOutlined} text={<p className='card-text'>Competition Mode: {settings.competitionMode}</p>} key="list-vertical-like-o" />
                        </div>
                        <div style={{ fontSize: '16px' }}>
                            <IconText icon={StarOutlined} text={<p className='card-text'>Joined: {totalJoined}/{tournament.settings?.maxParticipitant}</p>} key="list-vertical-star-o" />
                        </div>
                    </List.Item>
                </List>
                
                {sideStep}
            </Card>
            
            
            <Card
                style={{
                    boxShadow: 'none',
                    marginTop: '20px',
                }}
                className="popCard mt-5"
                bordered
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