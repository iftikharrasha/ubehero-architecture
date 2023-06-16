import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Progress, Typography } from 'antd';
const { Paragraph } = Typography;

const TournamentSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, isLoggedIn, routeKey, tournament, purchasedItems, handleCancel, handleCheckout, step, buttonStatus, timeLeftPercent}) => {
    const { _id, leaderboards, settings } = tournament;

    let sideStep; //dynamic component
    switch (step) {
        case 0:
            sideStep = (
                <div ref={ref1TSummery2}>
                    <Paragraph className="mb-0">Registration Time Left</Paragraph>
                    <Progress percent={timeLeftPercent} steps={12} showInfo={true}/> 
                </div>
            );
        break;

        case 1:
            sideStep = (
                <div ref={ref1TSummery2}>
                    <Paragraph className="mb-0">Join the game Loby!</Paragraph>
                </div>
            );
        break;

        case 2:
            sideStep = (
                <div ref={ref1TSummery2}>
                    <Paragraph className="mb-0">Tournament Started!</Paragraph>
                </div>
            );
        break;

        default:
            sideStep = (
                <div ref={ref1TSummery2}>
                    <Paragraph className="mb-0">Tournament Upcoming!</Paragraph>
                </div>
            );;
    
    }
  
    return (
        <div className=" list-group sticky-top" ref={ref1TSummery1}>
            <Card title={`WIN 50$`} bordered style={{ width: 300, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                <h6>Joined: {leaderboards.length}</h6>
                <p className='card-text'>Mode: {settings.mode}</p>
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
                            <Button type="primary" size="small" className="mt-3" ref={ref1TSummery3}>
                                PURCHASED
                            </Button> :
                                routeKey === 'checkout' ? 
                                <Button type="primary" size="small" className="mt-3" onClick={handleCancel} ref={ref1TSummery3}>
                                    CANCEL
                                </Button> : 
                                    <Button type="primary" size="small" className="mt-3" onClick={handleCheckout} ref={ref1TSummery3}>
                                        {buttonStatus}
                                    </Button>
                    }
                </div>
            </Card>
        </div>
    );
};

export default TournamentSide;