import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, TeamOutlined, ProjectOutlined, CrownOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, Row, Col, Empty, Popover, Spin, Typography } from 'antd';
import UserPopup from '../Common/UserPopup/UserPopup';
import useProfile from '../../hooks/useProfile';
import moment from 'moment';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

const TeamMates = ({captain, tId, crossPlay, friendRouteKey, handleTabChange}) => {
    const [partyPeopleList, setTeamPeopleList] = useState(null);
    const { handleTeamMembersListHook } = useProfile();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const peoples = await handleTeamMembersListHook(tId, crossPlay);
            setTeamPeopleList(peoples);
          } catch (error) {
            setTeamPeopleList([]);
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
                        <ProjectOutlined /> <span>Joined ({partyPeopleList?.members?.mates?.length+1 || 0})</span>
                    </Row>
                }
            >
                <Card>
                    {
                        !partyPeopleList ?  <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                        <>
                            <Paragraph><CrownOutlined style={{ fontSize: '16px', color: 'gold', marginBottom: '0px' }}/> Team Leader</Paragraph>
                            <Row gutter={[16, 16]}>
                                <Col span={6}>
                                    <Popover placement="topLeft" content={<UserPopup popupUser={partyPeopleList.captainId} middle={false}/>}>
                                        <Card hoverable>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={partyPeopleList.captainId.photo}
                                                        alt="user-pic"
                                                        style={{ width: '45px', height: '45px' }}
                                                        className="rounded-circle"
                                                    />
                                                    <div className="ms-3">
                                                        <p className="fw-bold mb-0">{partyPeopleList?.captainId?.userName}</p>
                                                        {/* <p className="mb-0">Country: {record.country}</p> */}
                                                        {/* <p className="mb-0">
                                                            <div className="status">Joined {moment(captain.createdAt).fromNow()} </div>  
                                                        </p> */}
                                                        
                                                        {
                                                            partyPeopleList?.captainId?.gameAccounts[0] ? 
                                                            <p className="mb-0">
                                                                <img
                                                                    src={partyPeopleList?.captainId?.gameAccounts[0].accountLogo}
                                                                    alt="account-pic"
                                                                    style={{ width: '18px', height: '18px', marginRight: '5px' }}
                                                                    className="rounded-circle"
                                                                />
                                                                {partyPeopleList?.captainId?.gameAccounts[0]?.playerIgn}
                                                            </p>
                                                        :  <p className="mb-0">No game account connected</p>
                                                        }
                                                    </div>
                                                </div>
                                        </Card>
                                    </Popover>
                                </Col>
                            </Row>
                            {
                                partyPeopleList?.members?.mates?.length === 0 ? null : 
                                <>
                                    <Paragraph className='mt-3'><TeamOutlined style={{ fontSize: '16px', color: 'gold', marginBottom: '0px', paddingRight: '2px' }}/>Team Mates</Paragraph>
                                    <Row gutter={[16, 16]}>
                                        {
                                            partyPeopleList?.members?.mates?.map((friend, index) => (
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
                                                                        {/* <p className="mb-0">
                                                                            <div className="status">Joined {moment(friend.createdAt).fromNow()} </div>  
                                                                        </p> */}
                                                                            {
                                                                            friend?.gameAccounts[0] ? 
                                                                            <p className="mb-0">
                                                                                <img
                                                                                    src={friend.gameAccounts[0].accountLogo}
                                                                                    alt="account-pic"
                                                                                    style={{ width: '18px', height: '18px', marginRight: '5px' }}
                                                                                    className="rounded-circle"
                                                                                />
                                                                                {friend?.gameAccounts[0]?.playerIgn}
                                                                            </p>
                                                                            :  <p className="mb-0" style={{ fontSize: '12px' }}>No game account connected</p>
                                                                            }
                                                                    </div>
                                                                </div>
                                                        </Card>
                                                    </Popover>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </>
                            }
                        </>
                    }
                </Card>
            </TabPane>
            <TabPane
                key="pendings"
                tab={
                    <Row justify="left" align="middle">
                        <ProjectOutlined /> <span>Invited ({partyPeopleList?.members?.invited?.length || 0})</span>
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

export default TeamMates;