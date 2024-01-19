import React from 'react';
import { Row, Tabs } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import MyStats from './MyStats';
import Settings from './Settings';
import MySocials from './MySocials';
import MyTeams from './MyTeams';

const { TabPane } = Tabs;

const ProfileBottom = ({ref2GamingStats, ref2Teams, ref2Settings, routeKey, settingsRouteKey, socialsRouteKey, statsRouteKey, friendRouteKey, handleTabChange, profile, myTeams, badges, gameStats}) => {
    return (
        <Tabs activeKey={routeKey} onChange={handleTabChange}>
            <TabPane
                key="mystats"
                tab={
                    <Row justify="left" align="middle" ref={ref2GamingStats}>
                        <HistoryOutlined /> <span>My Stats</span>
                    </Row>
                }
            >
                <MyStats statsRouteKey={statsRouteKey} handleTabChange={handleTabChange} stats={profile.stats} badges={badges} gameStats={gameStats}/>
            </TabPane>
            <TabPane
                key="socials"
                tab={
                    <Row justify="left" align="middle" ref={ref2Teams}>
                        <TeamOutlined /> <span>Socials</span>
                    </Row>
                }
            >
                <MySocials socialsRouteKey={socialsRouteKey} friendRouteKey={friendRouteKey} handleTabChange={handleTabChange}/>
            </TabPane>
            <TabPane
                key="teams"
                tab={
                    <Row justify="left" align="middle" ref={ref2Teams}>
                        <TeamOutlined /> <span>Teams</span>
                    </Row>
                }
            >
                <MyTeams routeKey={routeKey} myTeams={myTeams} />
            </TabPane>
            <TabPane
                key="settings"
                tab={
                    <Row justify="left" align="middle" ref={ref2Settings}>
                        <SettingOutlined /> <span>Settings</span>
                    </Row>
                }
            >
                <Settings profile={profile} settingsRouteKey={settingsRouteKey} handleTabChange={handleTabChange}/>
            </TabPane>
        </Tabs>
    );
};

export default ProfileBottom;