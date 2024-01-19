import React from 'react';
import { Row, Tabs, Avatar, List, Space } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import PartyEvents from '../Profile/PartyEvents';
import { useSelector } from 'react-redux';
import PartyPeople from './PartyPeople';

const data = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `Gaming post ${i+1}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    thumbnail: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwd3g2-dOUnM7CvUyPvR1CG2aj6Nxu_eOKm5fB9TM9gw&s`,
    description:
        'Gaming, a popular form of entertainment, is loved by people of all ages.',
    content:
        'We provide a wide range of gaming experiences, from action-packed adventures to immersive role-playing games, to satisfy every gamer.',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const { TabPane } = Tabs;

const PartyBottom = ({party}) => {
    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    const userId = profile?.data?._id;

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
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                    }}
                    dataSource={data}
                    footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                    }
                    renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                        <img
                            width={272}
                            alt="logo"
                            src={item.thumbnail}
                        />
                        }
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.content}
                    </List.Item>
                    )}
                />
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
                <PartyEvents party={party}/>
            </TabPane>

            {
                !isLoggedIn ? null : party?.owner?._id !== userId ? null :
                <TabPane
                    key="people"
                    tab={
                        <Row justify="left" align="middle">
                            <SettingOutlined /> <span>People</span>
                        </Row>
                    }
                >
                    <PartyPeople pId={party._id}/>
                </TabPane>
            }

            {
                !isLoggedIn ? null : party?.owner?._id !== userId ? null :
                <TabPane
                    key="inventory"
                    tab={
                        <Row justify="left" align="middle">
                            <SettingOutlined /> <span>Inventory</span>
                        </Row>
                    }
                >
                    {/* <Settings profile={profile} settingsRouteKey={settingsRouteKey} handleTabChange={handleTabChange}/> */}
                </TabPane>
            }
            
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