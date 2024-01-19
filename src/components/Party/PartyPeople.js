import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, Row, Col, Empty, Popover, Spin } from 'antd';
import UserPopup from '../Common/UserPopup/UserPopup';
import useProfile from '../../hooks/useProfile';
import moment from 'moment';

const { TabPane } = Tabs;

const PartyPeople = ({pId, socialsRouteKey, friendRouteKey, handleTabChange}) => {
    const [partyPeopleList, setPartyPeopleList] = useState(null);
    const { handlePartyPeopleListHook } = useProfile();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const peoples = await handlePartyPeopleListHook(pId);
            setPartyPeopleList(peoples);
          } catch (error) {
            setPartyPeopleList([]);
            console.error('Error fetching friend list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    return (
        <Tabs type="card" activeKey={friendRouteKey} onChange={handleTabChange}>
            <TabPane
                key="friendlist"
                tab={
                    <Row justify="left" align="middle">
                        <ProjectOutlined /> <span>Members ({partyPeopleList?.members?.joined?.length})</span>
                    </Row>
                }
            >
                <Card>
                    {
                        !partyPeopleList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                        partyPeopleList?.members?.joined?.length === 0 ? 
                        <Empty/> :
                        <Row gutter={[16, 16]}>
                            {
                                partyPeopleList?.members?.joined?.map((friend, index) => (
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
                        <ProjectOutlined /> <span>Requests ({partyPeopleList?.members?.requested?.length})</span>
                    </Row>
                }
            >
                <Card>
                    {
                        !partyPeopleList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                        partyPeopleList?.members?.requested?.length === 0 ? 
                        <Empty/> :
                        <Row gutter={[16, 16]}>
                            {
                                partyPeopleList?.members?.requested?.map((friend, index) => (
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
                        <ProjectOutlined /> <span>Invited ({partyPeopleList?.members?.invited?.length})</span>
                    </Row>
                }
            >
                <Card>
                    {
                        !partyPeopleList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                        partyPeopleList?.members?.invited?.length === 0 ? 
                        <Empty/> :
                        <Row gutter={[16, 16]}>
                            {
                                partyPeopleList?.members?.invited?.map((friend, index) => (
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
    );
};

export default PartyPeople;