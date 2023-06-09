import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import ProfileTop from '../../components/Profile/ProfileTop';
import Preloader from '../../components/PageLayout/Preloader';
import MyTeams from '../../components/Profile/MyTeams';
import MyStats from '../../components/Profile/MyStats';
import Settings from '../../components/Profile/Settings';
import ProfileSide from '../../components/Profile/ProfileSide';
import { fetchMyTeams } from '../../redux/slices/teamSlice';
import { fetchProfileDetails } from '../../redux/slices/profileSlice'

import { Tabs, Row } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const Profile = () => { 
    const { id } = useParams();

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.profile.data)
    const version = userDetails ? userDetails.version : 0;

    const [routeKey, setRouteKey] = useState('mystats');

    const myTeams = useSelector((state) => state.myTeams.data)
    const versionTeams = useSelector((state) => state.myTeams.version)
    // console.log('1. versionChatroomC:', versionChatroom);

    useEffect(() => {
        dispatch(fetchProfileDetails({ id, version }));
    }, [])

    useEffect(() => {
        if(routeKey === 'teams'){
            dispatch(fetchMyTeams({ id, versionTeams }));
        }
    }, [routeKey])

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.pathname.endsWith('teams')) {
            setRouteKey('teams');
        } else if (location.pathname.endsWith('settings')) {
            setRouteKey('settings');
        } else {
            setRouteKey('mystats');
        }
    }, [location]);

    const handleTabChange = (key) => {
      switch (key) {
        case '1':
          history.push(`/profile/${id}`);
          break;
        case '2':
          history.push(`/profile/${id}/teams`);
          break;
        case '3':
          history.push(`/profile/${id}/settings`);
          break;
        default:
          break;
      }
    };

    return (
        <PageLayout>
            {
                userDetails ? 
                <div className='row'>
                    <div className='col-md-12'>
                        <ProfileTop profile={userDetails} />
                    </div>
                    <div className='col-md-12'>
                        <div className='row'>

                            <div className='col-md-3'>
                                <ProfileSide profile={userDetails} />
                            </div>
                            <div className='col-md-9'>

                                <Tabs defaultActiveKey="1" onChange={handleTabChange}
                                >
                                    <TabPane
                                        key="1"
                                        tab={
                                            <Row justify="left" align="middle">
                                                <HistoryOutlined /> <span>My Stats</span>
                                            </Row>
                                        }
                                    >
                                        <MyStats stats={userDetails.stats} />
                                    </TabPane>
                                    <TabPane
                                        key="2"
                                        tab={
                                            <Row justify="left" align="middle">
                                                <TeamOutlined /> <span>Teams</span>
                                            </Row>
                                        }
                                    >
                                        <MyTeams routeKey={routeKey} myTeams={myTeams} />
                                    </TabPane>
                                    <TabPane
                                        key="3"
                                        tab={
                                            <Row justify="left" align="middle">
                                                <SettingOutlined /> <span>Settings</span>
                                            </Row>
                                        }
                                    >
                                        <Settings profile={userDetails} />
                                    </TabPane>
                                </Tabs>

                            </div>
                        </div>
                    </div>
                </div>
                : <Preloader />
            }
        </PageLayout>
    );
};

export default Profile;