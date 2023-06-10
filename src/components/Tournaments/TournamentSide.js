import React from 'react';
import { Card, Button, Progress, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Paragraph } = Typography;

const TournamentSide = ({isLoggedIn, routeKey, tournament, purchasedItems, handleCancel, handleCheckout}) => {
    const { _id, leaderboards, settings } = tournament;
    
    return (
        <div className=" list-group sticky-top">
            <Card title={`WIN 50$`} bordered style={{ width: 300, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', }}>
                <h6>Joined: {leaderboards.length}</h6>
                <p className='card-text'>Mode: {settings.mode}</p>
                <div>
                  <Paragraph className="mb-0">Time Left</Paragraph>
                  <Progress percent={30} steps={12} /> 
                </div>
                {
                    !isLoggedIn ? 
                    <Link to={`/login`}>
                        <Button type="primary" size="small" className="mt-3">
                            JOIN NOW
                        </Button>  
                    </Link> :
                    purchasedItems.tournaments?.includes(_id) ? 
                                <Button type="primary" size="small" className="mt-3">
                                    PURCHASED
                                </Button> :
                                    routeKey === 'checkout' ? 
                                    <Button type="primary" size="small" className="mt-3" onClick={handleCancel}>
                                        CANCEL
                                    </Button> : 
                                         <Button type="primary" size="small" className="mt-3" onClick={handleCheckout}>
                                            Join Now
                                        </Button>
                }
            </Card>
        </div>
    );
};

export default TournamentSide;