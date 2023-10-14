import React from 'react';
import { Card, Button, Progress, Typography, Tag, Timeline, Avatar, Badge } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;
const { Meta } = Card;

const ProfileSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, ref1TSummery4, profile}) => {
    const { stats } = profile;
    const now = Math.ceil(((stats.currentXP / (stats.currentXP  + stats.nextLevelRequiredXP)) * 100));

    const ranks = [
        {
            level: 1,
            title: 'Underdog',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg',
        },
        {
            level: 2,
            title: 'Rookie',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/3_Apprentice.svg',
        },
        {
            level: 3,
            title: 'Explorer',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/9_RisingStar.svg',
        },
        {
            level: 4,
            title: 'Collector',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/2_Rookie.svg',
        },
        {
            level: 5,
            title: 'Collaborator',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/6_Enthusiast.svg',
        },
        {
            level: 6,
            title: 'Contributor',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/6_Enthusiast.svg',
        },
        {
            level: 7,
            title: 'Rising star',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/9_RisingStar.svg',
        },
        {
            level: 8,
            title: 'Professional',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/8_Regular.svg',
        },
        {
            level: 9,
            title: 'Veteran',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg',
        }
    ]
    
    return (
        <div className=" list-group sticky-top">
            <Card title={'Rank Progress'} bordered style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', }} ref={ref1TSummery1}>

                <Timeline>
                    {
                        ranks.map((rank, index) => {
                            const isCurrentLevel = rank.level === stats?.currentLevel;
                            const showNextRankBadge = rank.level === stats?.currentLevel + 1;

                            return (
                                <Timeline.Item key={index} label={false} color={rank.level <= stats?.currentLevel+1 ? 'green' : 'gray'} dot={showNextRankBadge ? <DoubleRightOutlined style={{fontSize: '26px'}} /> : rank.level}>
                                  {showNextRankBadge ? (
                                    <Badge.Ribbon text={`${stats?.totalXp}xp`} color="#f030c0">
                                      <Card>
                                        <Meta
                                          title={
                                            <span className='text-capital'>
                                              <img alt="rank" src={rank?.icon} width={26} height={26} /> {rank?.title}
                                            </span>
                                          }
                                          description={
                                            <div ref={ref1TSummery3}>
                                              <Progress percent={now} steps={12} />
                                              <p className='card-text' style={{fontSize: '14px'}}>{stats?.nextLevelRequiredXP}xp needed to unlock this rank</p>
                                            </div>
                                          }
                                        />
                                      </Card>
                                    </Badge.Ribbon>
                                  ) : (
                                    <Paragraph className={rank.level <= stats?.currentLevel ? null : 'grayscale'}>
                                      <img alt="rank" src={rank.icon} width={26} height={26} /> {rank.title}
                                    </Paragraph>
                                  )}
                                </Timeline.Item>
                            )
                        })
                    }
                    <Timeline.Item className='pb-0' label={false} color={stats?.currentLevel === 10 ? 'green' : 'gray' } dot={stats?.currentLevel === 10 ? <DoubleRightOutlined style={{fontSize: '26px'}}/> : 10}>
                        <Button type="primary" size="small" ref={ref1TSummery4} disabled={stats?.currentLevel === 9 ? false : true }>
                            UPGRADE TO MASTER
                        </Button>
                    </Timeline.Item>
                </Timeline>
            </Card>
        </div>
    );
};

export default ProfileSide;