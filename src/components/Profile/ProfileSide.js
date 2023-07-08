import React from 'react';
import { Card, Button, Progress, Typography } from 'antd';
const { Paragraph } = Typography;

const ProfileSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, ref1TSummery4, profile}) => {
    const { stats } = profile;
    const now = Math.ceil(((stats.currentXP / (stats.currentXP  + stats.nextLevelRequiredXP)) * 100))
    
    return (
        <div className=" list-group sticky-top">
            <Card title={`Level ${stats?.currentLevel}: ${stats?.levelTitle} | Total XP: ${stats?.totalXp}`} bordered style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', }} ref={ref1TSummery1}>
                <div ref={ref1TSummery2}>
                    <h6>Current XP: {stats?.currentXP}</h6>
                </div>
                <div ref={ref1TSummery3}> 
                  <Paragraph className="mt-2 mb-0">Level Completed</Paragraph>
                  <Progress percent={now} steps={12} /> 
                  <p className='card-text'>XP required to reach Level {stats?.currentLevel+1}: {stats?.nextLevelRequiredXP}xp</p>
                </div>
                <Button type="primary" size="small" className="mt-3" ref={ref1TSummery4}>
                    UPGRADE
                </Button>
            </Card>
        </div>
    );
};

export default ProfileSide;