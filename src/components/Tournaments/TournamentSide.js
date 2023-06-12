import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Progress, Typography } from 'antd';
const { Paragraph } = Typography;

const TournamentSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, isLoggedIn, routeKey, tournament, purchasedItems, handleCancel, handleCheckout}) => {
    const { _id, leaderboards, settings } = tournament;

    return (
        <div className=" list-group sticky-top" ref={ref1TSummery1}>
            <Card title={`WIN 50$`} bordered style={{ width: 300, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', }}>
                <h6>Joined: {leaderboards.length}</h6>
                <p className='card-text'>Mode: {settings.mode}</p>
                <div ref={ref1TSummery2}>
                  <Paragraph className="mb-0">Time Left</Paragraph>
                  <Progress percent={30} steps={12} /> 
                </div>
                <div>
                    {
                        !isLoggedIn ? 
                        <Link to={`/login`} ref={ref1TSummery3}>
                            <Button type="primary" size="small" className="mt-3">
                                JOIN NOW
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
                                                Join Now
                                            </Button>
                    }
                </div>
            </Card>
        </div>
    );
};

export default TournamentSide;