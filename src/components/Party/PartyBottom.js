import React from 'react';
import { Row, Tabs } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
// import MyStats from './MyStats';
// import Settings from './Settings';
// import MySocials from './MySocials';
// import MyTeams from './MyTeams';

const { TabPane } = Tabs;

const PartyBottom = () => {
    return (
        <Tabs>
            <TabPane
                key="mystats"
                tab={
                    <Row justify="left" align="middle">
                        <HistoryOutlined /> <span>Timeline</span>
                    </Row>
                }
            >
                <h2>Party social page here!</h2>
            </TabPane>
            <TabPane
                key="socials"
                tab={
                    <Row justify="left" align="middle">
                        <TeamOutlined /> <span>Events</span>
                    </Row>
                }
            >
                {/* <MySocials mySocials={[1, 2, 3, 4, 5, 6, 7, 8]} socialsRouteKey={socialsRouteKey} friendRouteKey={friendRouteKey} handleTabChange={handleTabChange}/> */}
            </TabPane>
            <TabPane
                key="settings"
                tab={
                    <Row justify="left" align="middle">
                        <SettingOutlined /> <span>Inventory</span>
                    </Row>
                }
            >
                {/* <Settings profile={profile} settingsRouteKey={settingsRouteKey} handleTabChange={handleTabChange}/> */}
            </TabPane>
        </Tabs>
    );
};

export default PartyBottom;


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