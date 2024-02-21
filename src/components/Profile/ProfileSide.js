import React, { useState } from 'react';
import { Card, Button, Progress, Typography, Timeline, Badge, Tabs, Row } from 'antd';
import { PartitionOutlined, DoubleRightOutlined  } from '@ant-design/icons';

const { Paragraph } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;

const ProfileSide = ({ref1TSummery1, ref1TSummery2, ref1TSummery3, ref1TSummery4, profile}) => {
    const { stats } = profile;
    const { levelTitle, currentLevel } = stats;
    const now = Math.ceil(((stats.currentXP / (stats.currentXP  + stats.nextLevelRequiredXP)) * 100));
    const [profileSideKey, setProfileSideKey] = useState('currentBage')

    const copies = [1, 2, 3, 4, 5, 6, 7, 8];
    const ranks = [
        {
            level: 1,
            title: 'Iron Shakled',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg',
        },
        {
            level: 2,
            title: 'Broken Cuff',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/3_Apprentice.svg',
        },
        {
            level: 3,
            title: 'Prison Breaker',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/9_RisingStar.svg',
        },
        {
            level: 4,
            title: 'Shattered Sword',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/2_Rookie.svg',
        },
        {
            level: 5,
            title: 'Underdog',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/6_Enthusiast.svg',
        },
        {
            level: 6,
            title: 'Swiftdagger',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/6_Enthusiast.svg',
        },
        {
            level: 7,
            title: 'Liberty Blade',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/9_RisingStar.svg',
        },
        {
            level: 8,
            title: 'Burning Sheild',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/9_RisingStar.svg',
        },
        {
            level: 9,
            title: 'Thracian Helm',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/8_Regular.svg',
        },
        {
            level: 10,
            title: 'Eternal Crest',
            icon: 'https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg',
        }
    ]

    const onChange = (key) => {
      setProfileSideKey(key);
    };
    
    return (
        <div className="list-group sticky-top">
          <Tabs activeKey={profileSideKey} onChange={onChange}>
              <TabPane
                  key="currentBage"
                  tab={
                      <Row justify="left" align="middle">
                          <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Current Rank</span>
                      </Row>
                  }
              >
                <Card>
                    <div className="number">{currentLevel}</div>
                    <div className="badgeClaimed">
                        <div className='spinningasset'>
                            <img src='https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg' alt='claim'/>
                            {
                                copies.map((copy, index) => (
                                    <i style={{ backgroundImage: `url('https://content.invisioncic.com/u312729/monthly_2021_06/12_Mentor.svg')` }} key={index}></i>
                                ))
                            }
                        </div>
                    </div>
                    <>
                        <div className="instructions text-center">
                            <h2>{levelTitle}</h2>
                            <p>
                                Level {currentLevel}
                            </p>
                        </div>
                        <ul className='rewards ps-0'>
                            <li>
                                <img src="https://icons.iconarchive.com/icons/iconarchive/treasure-chest/512/Blue-Flat-Treasure-Chest-icon.png" alt="loot" width={50}/>
                                <span>
                                    {stats.totalLoots} <br /> LOOTS
                                </span>
                            </li>
                            <li>
                                <img src="https://cdn2.iconfinder.com/data/icons/outlined-valuable-items/200/minerals_green_stone-512.png" alt="gems" width={50}/>
                                <span>
                                    {stats.totalGems} <br /> GEMS
                                </span>
                            </li>
                            <li>
                                <img src="https://miro.medium.com/v2/resize:fit:728/1*jBIARTlGCm6J8d29xcVekg.png" alt="xp" width={50}/>
                                <span>
                                    {stats.totalXp} <br /> XP
                                </span>
                            </li>
                        </ul>
                    </> 
                </Card>
              </TabPane>
              <TabPane
                  key="journey"
                  tab={
                      <Row justify="left" align="middle">
                          <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>My Journey</span>
                      </Row>
                  }
              >

                <Card bordered style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', }} ref={ref1TSummery1}>
                    <Timeline>
                        {
                            ranks.map((rank, index) => {
                                const isCurrentLevel = rank.level === currentLevel;
                                const showNextRankBadge = rank.level === currentLevel+1;
      
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
                                        <Paragraph className={rank.level <= currentLevel ? null : 'grayscale'}>
                                          <img alt="rank" src={rank.icon} width={26} height={26} /> {rank.title}
                                        </Paragraph>
                                      )}
                                    </Timeline.Item>
                                )
                            })
                        }
                        {/* <Timeline.Item className='pb-0' label={false} color={currentLevel === 10 ? 'green' : 'gray' } dot={currentLevel === 10 ? <DoubleRightOutlined style={{fontSize: '26px'}}/> : 10}>
                            <Button type="primary" size="small" ref={ref1TSummery4} disabled={currentLevel === 9 ? false : true }>
                                UPGRADE TO MASTER
                            </Button>
                        </Timeline.Item> */}
                    </Timeline>
                </Card>
              </TabPane>
          </Tabs>
        </div>
    );
};

export default ProfileSide;