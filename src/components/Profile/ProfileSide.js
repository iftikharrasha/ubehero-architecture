import React from 'react';
import { Card, Button, Progress, Typography } from 'antd';
const { Paragraph } = Typography;

const ProfileSide = ({profile}) => {
    const { _id, userName, joiningDate, photo, version, stats } = profile;
    const now = ((stats.currentXP / (stats.currentXP  + stats.nextLevelRequiredXP)) * 100)
    
    return (
        <div className=" list-group sticky-top">
            <Card title={`Level ${stats?.currentLevel}: ${stats?.levelTitle}`} bordered style={{ width: 300, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', }}>
                <h6>Current XP: {stats?.currentXP}</h6>
                <p className='card-text'>XP required to reach level 2: {stats?.nextLevelRequiredXP}</p>
                <div>
                  <Paragraph className="mb-0">Time Left</Paragraph>
                  <Progress percent={30} steps={12} /> 
                </div>
                {/* <Button type="primary" size="small" className="mt-3">
                    JOIN NOW
                </Button> */}
            </Card>
        </div>
    );
};

export default ProfileSide;