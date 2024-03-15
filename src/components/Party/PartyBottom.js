import React, { useEffect, useState } from 'react';
import { Row, Tabs, Avatar, List, Space, Modal, Card, Input, Button, Skeleton, Divider } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined, LikeOutlined, MessageOutlined, DislikeOutlined } from '@ant-design/icons';
import PartyEvents from '../Profile/PartyEvents';
import { useSelector } from 'react-redux';
import PartyPeople from './PartyPeople';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Meta } = Card;
const { TextArea } = Input;

// const data = Array.from({
//         length: 23,
//     }).map((_, i) => ({
//         id: i,
//         postedBy: {
//             _id: i,
//             userName: `gamer${i+1546}`,
//             photo: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
//         },
//         title: `Gaming post having a fancy titles ${i+1}`,
//         description: 'We provide a wide range of gaming experiences, from action-packed adventures to immersive role-playing games, to satisfy every gamer. We provide a wide range of gaming experiences, from action-packed adventures to immersive role-playing games, to satisfy every gamer...',
//         thumbnail: `https://www.techspot.com/images2/news/bigimage/2023/09/2023-09-06-image-8.jpg`,
//         reacts: {
//             likes: `${(i+16)*3}`,
//             dislikes: `${(i+2)*3}`,
//             comments: `${(i+0)*3}`,
//         },
//         privacy: 'public',
//         tags: [],
//         comments: [],
// }));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const { TabPane } = Tabs;

const PartyBottom = ({party, data}) => {
    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    const userId = profile?.data?._id;

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [readingItem, setReadingItem] = useState(null);
    const [readingIndex, setReadingIndex] = useState(0);

    const handlePostRead = (item, i) => {
        setReadingIndex(i+1)
        setOpen(true);
        setReadingItem(item);
    }

    const handleSubmitComment = async () => {
        setConfirmLoading(true);
        
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

    const isPrime = (num) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        let i = 5;
        while (i * i <= num) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
            i += 6;
        }
        return true;
    }

    const onChange = (e) => {
      console.log('Change:', e.target.value);
    };

    
    const [loading, setLoading] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const loadMoreData = () => {
        if (loading) {
        return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        .then((res) => res.json())
        .then((body) => {
            setCommentData([...commentData, ...body.results]);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
    };
    useEffect(() => {
        loadMoreData();
    }, []);
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
                    dataSource={party.title === 'Underdogg' ? data : []}
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
                                        src={item.thumbnail}
                                        style={{cursor: 'pointer'}}
                                    />
                                ) : null
                            }
                            // extra={
                            //     isPrime(item.id) ? (
                            //         <img onClick={() => handlePostRead(item, i)}
                            //             width={272}
                            //             alt="logo"
                            //             src={item.thumbnail}
                            //             style={{cursor: 'pointer'}}
                            //         />
                            //     ) : null
                            // }
                        >
                            <List.Item.Meta
                                title={<h4 onClick={() => handlePostRead(item)} style={{marginBlockEnd: '0px', cursor: 'pointer'}}>{item.title}</h4>}
                                description={<><Avatar size={30} src={item.postedBy.photo} /><span className='ms-2'>@{item.postedBy.userName}</span></>}
                            />
                            {item.description.split(' ').slice(0, 40).toString().replace(/,/g, ' ')}...
                        </List.Item>
                    )}
                />
                <Modal
                    title={<h4 className='text-center pb-3'>{`${readingItem?.title}`}</h4>}
                    centered
                    open={open}
                    okText='Next'
                    onOk={null}
                    onCancel={() => setOpen(false)}
                    confirmLoading={confirmLoading}
                    width={700}
                    okButtonProps={{
                        disabled: data?.length === readingIndex,
                    }}
                    >
                    <Row gutter={[16, 16]}>
                        <Card
                            style={{
                                width: '100%',
                            }}
                            cover={
                                readingItem?.thumbnail ? 
                                <img style={{width: '100%'}}
                                    alt="example"
                                    src={readingItem?.thumbnail}
                                /> : null
                            }
                            // cover={
                            //     isPrime(readingItem?.id) ? 
                            //     <img style={{width: '100%'}}
                            //         alt="example"
                            //         src={readingItem?.thumbnail}
                            //     /> : null
                            // }
                            actions={[
                                <IconText icon={LikeOutlined} text={readingItem?.reacts?.likes?.length} key="list-vertical-like-o" />,
                                <IconText icon={DislikeOutlined} text={readingItem?.reacts?.dislikes?.length} key="list-vertical-dislike-o" />,
                                <IconText icon={MessageOutlined} text={readingItem?.comments?.length} key="list-vertical-message" />,
                            ]}
                        >
                                <Meta
                                    avatar={<Avatar src={readingItem?.postedBy.photo} />}
                                    title={readingItem?.postedBy?.username}
                                    description={readingItem?.description}
                                />
                        </Card>
                        <Card style={{width: '100%'}}>
                            <Meta
                                description={
                                <div
                                    id="scrollableDiv"
                                    style={{
                                        height: 400,
                                        overflow: 'auto',
                                        padding: '0 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                >
                                    <InfiniteScroll
                                        dataLength={commentData.length}
                                        next={loadMoreData}
                                        hasMore={commentData.length < 50}
                                        loader={
                                        <Skeleton
                                            avatar
                                            paragraph={{
                                            rows: 1,
                                            }}
                                            active
                                        />
                                        }
                                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        <List
                                            dataSource={commentData}
                                            renderItem={(item) => (
                                                <List.Item key={item.email}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.picture.large} />}
                                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                                    description={item.email}
                                                />
                                                <div>Saturday 12pm</div>
                                                </List.Item>
                                            )}
                                        />
                                    </InfiniteScroll>
                                </div>
                                }
                            />
                        </Card>
                        <Card style={{width: '100%'}}>
                            <Meta
                                avatar={<Avatar size={20} src={profile?.data?.photo} />}
                                description={
                                    <>
                                        <TextArea showCount maxLength={300} onChange={onChange} placeholder="type here.." />
                                        <Button type="primary" className='mt-2'>Comment</Button>
                                    </>
                                }
                            />
                        </Card>
                    </Row>
                </Modal>
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