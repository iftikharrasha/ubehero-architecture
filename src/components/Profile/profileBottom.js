import React from 'react';
import { Row, Tabs } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import MyStats from './MyStats';
import MyTeams from './MyTeams';
import Settings from './Settings';

const { TabPane } = Tabs;

const profileBottom = ({ref2GamingStats, ref2Teams, ref2Settings, routeKey, handleTabChange, profile, myTeams}) => {
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
                <MyStats stats={profile.stats} />
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
                <Settings profile={profile} />
            </TabPane>
        </Tabs>
    );
};

export default profileBottom;