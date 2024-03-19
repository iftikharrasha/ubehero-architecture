import React, { useEffect, useState } from 'react';
import { Row, Tabs, Avatar, List, Space, Modal, Card, Input, Button, Skeleton, Divider } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined, LikeOutlined, MessageOutlined, DislikeOutlined } from '@ant-design/icons';
import PartyEvents from '../Profile/PartyEvents';
import { useSelector } from 'react-redux';
import PartyPeople from './PartyPeople';
import PartySocialPopup from '../Common/PartySocialPopup/PartySocialPopup';

const { TabPane } = Tabs;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

const PartyBottom = ({party, data}) => {
    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    const userId = profile?.data?._id;
    const profilePic = profile?.data?.photo;

    const [open, setOpen] = useState(false);
    // const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [readingItem, setReadingItem] = useState(null);

    const handlePostRead = (item, i) => {
        setOpen(true);
        setReadingItem(item);
    }

    // const [confirmLoading, setConfirmLoading] = useState(false);
    const handleSubmitComment = async () => {
        // setConfirmLoading(true);
        
        // const formData = form.getFieldsValue();
        // const answers = Object.values(formData);
        // const addedAnswer = {
        //     partyId: _id,
        //     partyName: title,
        //     uId: userId,
        //     uName: uName,
        //     answers: answers,
        // }
        // console.log('answers', addedAnswer);

        // const result = await handlePartyJoin(addedAnswer);
        // if(result.success){
        //     setOpen(false);
        //     setConfirmLoading(false);
        // }
    };

    const sliceDescription = (desc) => {
        // Step 1: Convert HTML string to plain text
        const plainText = new DOMParser().parseFromString(desc, 'text/html').body.textContent;

        // Step 2: Split plain text into words
        const words = plainText.split(/\s+/);

        // Step 3: Slice the array of words to get the first 40 words
        const slicedWords = words.slice(0, 40);

        // Step 4: Join the sliced array of words into a single string
        const slicedDescription = slicedWords.join(' ');

        return slicedDescription + '...';
    }

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
                    dataSource={party?.title === 'Underdogg' ? data : []}
                    renderItem={(item, i) => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={LikeOutlined} text={item?.reacts?.likes?.length} key="list-vertical-like-o" />,
                                <IconText icon={DislikeOutlined} text={item?.reacts?.dislikes?.length} key="list-vertical-dislike-o" />,
                                <IconText icon={MessageOutlined} text={item?.comments?.length} key="list-vertical-message" />,
                            ]}
                            extra={
                                item.thumbnail ? (
                                    <img onClick={() => handlePostRead(item, i)}
                                        width={272}
                                        alt="logo"
                                        src={item?.thumbnail}
                                        style={{cursor: 'pointer'}}
                                    />
                                ) : null
                            }
                        >
                            <List.Item.Meta
                                title={<h4 onClick={() => handlePostRead(item)} style={{marginBlockEnd: '0px', cursor: 'pointer'}}>{item?.title}</h4>}
                                description={<><Avatar size={30} src={item?.author?.photo} /><span className='ms-2'>@{item?.author?.userName}</span></>}
                            />
                            {sliceDescription(item?.description)}
                        </List.Item>
                    )}
                />
                {
                    !readingItem ? null :
                    <PartySocialPopup 
                        id={party._id}
                        readingItem={readingItem}
                        data={data}
                        open={open}
                        setOpen={setOpen}
                        profilePic={profilePic}
                    /> 
                }
            </TabPane>
            <TabPane
                key="events"
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