import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, Row, Col, Empty, Popover, Spin } from 'antd';
import UserPopup from '../Common/UserPopup/UserPopup';
import useProfile from '../../hooks/useProfile';
import moment from 'moment';

const { TabPane } = Tabs;

const MySocials = ({socialsRouteKey, handleTabChange}) => {
    const [myFriendList, setMyFriendList] = useState(null);
    const [myFollowerList, setFollowerList] = useState(null);
    const { handleFriendListHook } = useProfile();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const requests = await handleFriendListHook();
            setMyFriendList(requests.friend.mutuals);
            setFollowerList(requests.follow.follower);
          } catch (error) {
            console.error('Error fetching friend list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    return (
        <Tabs activeKey={socialsRouteKey} onChange={handleTabChange} tabPosition="left">
            <TabPane
                key="friends"
                tab={
                    <Row justify="left" align="middle">
                        <ProjectOutlined  style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Friends</span>
                    </Row>
                }
            >
                <Card
                    title={
                        <h5>
                            My <strong>Friends</strong>
                        </h5>
                    }
                >
                    {
                        !myFriendList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                        <Row gutter={[16, 16]}>
                            {
                                myFriendList.length === 0 ? 
                                <Empty/> :
                                myFriendList.map((friend, index) => (
                                    <Col span={6} key={index}>
                                        <Popover placement="topLeft" content={<UserPopup popupUser={friend}/>}>
                                            <Card hoverable>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                        src={friend.photo}
                                                        alt="user-pic"
                                                        style={{ width: '45px', height: '45px' }}
                                                        className="rounded-circle"
                                                        />
                                                        <div className="ms-3">
                                                        <p className="fw-bold mb-0">{friend.userName}</p>
                                                        {/* <p className="mb-0">Country: {record.country}</p> */}
                                                        <p className="mb-0">
                                                            <div className="status">Joined {moment(friend.createdAt).fromNow()} </div>  
                                                        </p>
                                                        </div>
                                                    </div>
                                            </Card>
                                        </Popover>
                                    </Col>
                                ))
                            }
                        </Row>
                    }
                </Card>
            </TabPane> 
            <TabPane
                key="followers"
                tab={
                    <Row justify="left" align="middle">
                        <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Followers</span>
                    </Row>
                }
            >
                {
                    !myFollowerList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                    <Row gutter={[16, 16]}>
                        {
                            myFollowerList.length === 0 ? 
                            <Empty/> :
                            myFollowerList.map((social, index) => (
                                <Col span={6} key={index}>
                                    <Popover placement="topLeft" content={<UserPopup popupUser={{}}/>}>
                                        <Card>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                    src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                                                    alt="user-pic"
                                                    style={{ width: '45px', height: '45px' }}
                                                    className="rounded-circle"
                                                    />
                                                    <div className="ms-3">
                                                    <p className="fw-bold mb-0">Rasha</p>
                                                    {/* <p className="mb-0">Country: {record.country}</p> */}
                                                    <p className="mb-0">
                                                        <img
                                                        src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                                                        alt="account-pic"
                                                        style={{ width: '18px', height: '18px', marginRight: '5px' }}
                                                        className="rounded-circle"
                                                        />
                                                        Iftikhar
                                                    </p>
                                                    </div>
                                                </div>
                                        </Card>
                                    </Popover>
                                </Col>
                            ))
                        }
                    </Row>
                }
            </TabPane>
        </Tabs>
    );
};

export default MySocials;