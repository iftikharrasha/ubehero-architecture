import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, Row, Col, Empty, Popover, Spin } from 'antd';
import UserPopup from '../Common/UserPopup/UserPopup';
import useProfile from '../../hooks/useProfile';
import moment from 'moment';

const { TabPane } = Tabs;

const MySocials = ({socialsRouteKey, friendRouteKey, handleTabChange}) => {
    const [mySocialsList, setMySocialsList] = useState(null);
    const { handleFriendListHook } = useProfile();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const requests = await handleFriendListHook();
            setMySocialsList(requests);
          } catch (error) {
            setMySocialsList([]);
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
                <Tabs type="card" activeKey={friendRouteKey} onChange={handleTabChange}>
                    <TabPane
                        key="friendlist"
                        tab={
                            <Row justify="left" align="middle">
                                <ProjectOutlined /> <span>Friendlist</span>
                            </Row>
                        }
                    >
                        <Card>
                            {
                                !mySocialsList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                                mySocialsList?.friend?.mutuals?.length === 0 ? 
                                <Empty/> :
                                <Row gutter={[16, 16]}>
                                    {
                                        mySocialsList?.friend?.mutuals?.map((friend, index) => (
                                            <Col span={6} key={index}>
                                                <Popover placement="topLeft" content={<UserPopup popupUser={friend} middle={false}/>}>
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
                        key="requests"
                        tab={
                            <Row justify="left" align="middle">
                                <ProjectOutlined /> <span>Requests</span>
                            </Row>
                        }
                    >
                        <Card>
                            {
                                !mySocialsList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                                mySocialsList?.friend?.pending?.length === 0 ? 
                                <Empty/> :
                                <Row gutter={[16, 16]}>
                                    {
                                        mySocialsList?.friend?.pending?.map((friend, index) => (
                                            <Col span={6} key={index}>
                                                <Popover placement="topLeft" content={<UserPopup popupUser={friend} middle={false}/>}>
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
                        key="pendings"
                        tab={
                            <Row justify="left" align="middle">
                                <ProjectOutlined /> <span>Pendings</span>
                            </Row>
                        }
                    >
                        <Card>
                            {
                                !mySocialsList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                                mySocialsList?.friend?.sent?.length === 0 ? 
                                <Empty/> :
                                <Row gutter={[16, 16]}>
                                    {
                                        mySocialsList?.friend?.sent?.map((friend, index) => (
                                            <Col span={6} key={index}>
                                                <Popover placement="topLeft" content={<UserPopup popupUser={friend} middle={false}/>}>
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
                </Tabs>
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
                    !mySocialsList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                    <Row gutter={[16, 16]}>
                        {
                            mySocialsList?.follow?.follower?.length === 0 ? 
                            <Empty/> :
                            mySocialsList?.follow?.follower?.map((social, index) => (
                                <Col span={6} key={index}>
                                    <Popover placement="topLeft" content={<UserPopup popupUser={{}} middle={false}/>}>
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