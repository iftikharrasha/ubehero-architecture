import React from 'react';
import { Empty, Row, Tabs } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import TeamMates from './TeamMates';
// import MyStats from './MyStats';
// import Settings from './Settings';
// import MySocials from './MySocials';
// import MyTeams from './MyTeams';

const { TabPane } = Tabs;

const TeamBottom = ({team, isLoggedIn, userId}) => {
    return (
        <Tabs>
            <TabPane
                key="tournaments"
                tab={
                    <Row justify="left" align="middle">
                        <HistoryOutlined /> <span>Tournaments</span>
                    </Row>
                }
            >
                <Empty/>
            </TabPane>

            <TabPane
                    key="members"
                    tab={
                        <Row justify="left" align="middle">
                            <SettingOutlined /> <span>Members</span>
                        </Row>
                    }
                >
                <TeamMates captain={team.captainId} tId={team._id}/>
            </TabPane>

            {
                !isLoggedIn ? null : team?.captainId?._id === userId ?
                <TabPane
                    key="settings"
                    tab={
                        <Row justify="left" align="middle">
                            <SettingOutlined /> <span>Inventory</span>
                        </Row>
                    }
                >
                    <h2>This is where captain would have the controls!</h2>
                    {/* <Settings profile={profile} settingsRouteKey={settingsRouteKey} handleTabChange={handleTabChange}/> */}
                </TabPane> : null
            }
        </Tabs>
    );
};

export default TeamBottom;


// import React from 'react';
// import { Row, Tabs } from 'antd';
// import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
// import MyStats from './MyStats';
// import Settings from './Settings';
// import MySocials from './MySocials';
// import MyTeams from './MyTeams';

// const { TabPane } = Tabs;

// const TeamBottom = ({routeKey, settingsRouteKey, socialsRouteKey, statsRouteKey, friendRouteKey, handleTabChange, profile, myTeams, badges, gameStats}) => {
//     return (
//         <Tabs activeKey={routeKey} onChange={handleTabChange}>
//             <TabPane
//                 key="mystats"
//                 tab={
//                     <Row justify="left" align="middle">
//                         <HistoryOutlined /> <span>My Stats</span>
//                     </Row>
//                 }
//             >
//                 <MyStats statsRouteKey={statsRouteKey} handleTabChange={handleTabChange} stats={profile.stats} badges={badges} gameStats={gameStats}/>
//             </TabPane>
//             <TabPane
//                 key="socials"
//                 tab={
//                     <Row justify="left" align="middle">
//                         <TeamOutlined /> <span>Socials</span>
//                     </Row>
//                 }
//             >
//                 <MySocials mySocials={[1, 2, 3, 4, 5, 6, 7, 8]} socialsRouteKey={socialsRouteKey} friendRouteKey={friendRouteKey} handleTabChange={handleTabChange}/>
//             </TabPane>
//             <TabPane
//                 key="teams"
//                 tab={
//                     <Row justify="left" align="middle">
//                         <TeamOutlined /> <span>Teams</span>
//                     </Row>
//                 }
//             >
//                 <MyTeams routeKey={routeKey} myTeams={myTeams} />
//             </TabPane>
//             <TabPane
//                 key="settings"
//                 tab={
//                     <Row justify="left" align="middle">
//                         <SettingOutlined /> <span>Settings</span>
//                     </Row>
//                 }
//             >
//                 <Settings profile={profile} settingsRouteKey={settingsRouteKey} handleTabChange={handleTabChange}/>
//             </TabPane>
//         </Tabs>
//     );
// };

// export default TeamBottom;