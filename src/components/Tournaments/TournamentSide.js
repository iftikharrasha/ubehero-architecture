import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Progress, Typography, Tag, Row, Space, Avatar, List, Breadcrumb } from 'antd';
import { MessageOutlined, CoffeeOutlined, StarOutlined, TrophyOutlined, SyncOutlined, UserOutlined, UsergroupAddOutlined, ProjectOutlined, PartitionOutlined, FlagOutlined, ApiOutlined, CrownOutlined } from '@ant-design/icons';
import InboxContext from '../../Contexts/InboxContext/InboxContext';

const { Meta } = Card;
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const copies = [1, 2, 3, 4, 5, 6, 7, 8];

const TournamentSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, isLoggedIn, userId, routeKey, tournament, totalJoined, purchasedItems, handleCancel, handleCheckout, step, buttonStatus, timeLeftPercent}) => {
    const { _id, settings, tournamentName, platforms, crossPlatforms } = tournament;
    const purchased = purchasedItems?.tournaments?.includes(_id);
    
    const { setShowInbox, setPopUser } = useContext(InboxContext);
    const handleInboxPop = () => {
        setPopUser(tournament.masterProfile);
        setShowInbox(true);
    };

    let sideStep;
    switch (step) {
        case 1:
            sideStep = (
                <>
                    {
                        totalJoined === tournament?.settings?.maxParticipitant ? 
                        <Tag color="warning" ref={ref1TSummery3} className="mt-3">Max Participants Reached!</Tag> :
                        !isLoggedIn ? 
                        <>
                            <div ref={ref1TSummery2} style={{ paddingTop: '20px'}}>
                                <Tag className="p-2" color="cyan" style={{ width: '100%' }}>Registration Time Progressed: <br />
                                    <Progress percent={timeLeftPercent} steps={17} showInfo={true} strokeColor="#f030c0" style={{ width: '100%' }}/> 
                                </Tag>
                            </div>
                            <Link to={`/login`} ref={ref1TSummery3}>
                                <Button type="primary" size="small" className="mt-3 joinButton">
                                    {settings?.joiningFee === 0 ? 'Free Entry' : buttonStatus}
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
                                        <img alt="aquamarine" src={settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"}
                                            style={{
                                                width: "18px",
                                                height: "18px",
                                                marginLeft: "5px"
                                            }}
                                        /> 
                                        {settings?.joiningFee}
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
                            avatar={
                                <div className="badgeClaimed prizeRotate">
                                    <div className='spinningasset'>
                                        <img src={settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"} alt='claim'/>
                                        {
                                            copies.map((copy, index) => (
                                                <i style={{ backgroundImage: `url(${settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"})` }} key={index}></i>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                            title={
                            <h4 className='mt-1'>PRIZE POOL WORTH <br /> {settings?.maxParticipitant*settings?.joiningFee} {settings?.feeType}s</h4>}
                        />
                        <div style={{ fontSize: '16px' }}>
                            <IconText icon={settings.competitionMode === 'ladder' ? ProjectOutlined : PartitionOutlined} text={<p className='card-text'>Competition Mode: {settings.competitionMode}</p>} key="list-vertical-like-o" />
                        </div>
                        <div style={{ fontSize: '16px' }}>
                            <IconText icon={ApiOutlined} 
                            key="list-vertical-star-o"  
                            text={
                            <p className='card-text'>
                                <span>
                                    <Breadcrumb style={{ color: 'white', fontSize: '16px' }}>Platforms:&nbsp;&nbsp;
                                        {
                                            platforms.includes('cross') ? 
                                            crossPlatforms.map((item, index) => (
                                                <Breadcrumb.Item key={item.key}>{item}</Breadcrumb.Item>
                                            )) : 
                                            platforms.map((item, index) => (
                                                <Breadcrumb.Item key={item.key}>{item}</Breadcrumb.Item>
                                            ))
                                        }
                                    </Breadcrumb>
                                </span>
                            </p>}/>
                        </div>
                        <div style={{ fontSize: '16px' }} >
                            <IconText icon={settings.mode === 'solo' ? UserOutlined : UsergroupAddOutlined} text={<p className='card-text'>Entry Mode: {settings.mode}</p>} key="list-vertical-like-o" />
                        </div>
                        <div style={{ fontSize: '16px' }}>
                            <IconText icon={FlagOutlined} text={<p className='card-text'>Region: {tournament.region}</p>} key="list-vertical-star-o" />
                        </div>
                        <div style={{ fontSize: '16px' }}>
                            <IconText icon={StarOutlined} text={<p className='card-text'>Joined: {totalJoined}/{settings?.maxParticipitant}</p>} key="list-vertical-star-o" />
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
                actions={!isLoggedIn ? null : tournament.masterProfile?._id === userId ? null : [
                    <Row justify="center" align="middle">
                        <Button icon={<MessageOutlined  style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }} onClick={handleInboxPop}>CHAT</Button>
                    </Row>,
                    <Row justify="center" align="middle">
                        <Button icon={<CoffeeOutlined style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }}>FOLLOW</Button>
                    </Row>
                ]}
                >
                <Meta
                    avatar={<Avatar src={tournament.masterProfile.photo} />}
                    title={<h6>{tournament.masterProfile.userName}</h6>}
                    description={<p className='mb-0'><CrownOutlined style={{ fontSize: '16px', color: 'gold' }}/> Master of the tournament</p>}
                />
            </Card>
        </div>
    );
};

export default TournamentSide;