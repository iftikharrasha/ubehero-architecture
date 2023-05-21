import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import { useSelector } from 'react-redux';
import { fetchProfileDetails } from '../redux/slices/profileSlice'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ProfileDetails from '../components/Profile/ProfileDetails';
import Preloader from '../components/PageLayout/Preloader';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyTeams from '../components/Profile/MyTeams';
import MyStats from '../components/Profile/MyStats';
import Settings from '../components/Profile/Settings';
import { fetchMyTeams } from '../redux/slices/teamSlice';

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

    return (
        <PageLayout>
            {
                userDetails ? 
                <>
                    <ProfileDetails profile={userDetails} />
                    <Tabs
                        id="controlled-tab-example"
                        className="mb-3"
                        activeKey={routeKey}
                        onSelect={(k) => {
                            setRouteKey(k);
                            switch (k) {
                                case 'mystats':
                                    history.push(`/profile/${id}`);
                                    break;
                                case 'teams':
                                    history.push(`/profile/${id}/teams`);
                                    break;
                                case 'settings':
                                    history.push(`/profile/${id}/settings`);
                                    break;
                                default:
                                    break;
                            }
                        }}
                    >
                        <Tab eventKey="mystats" title="My Stats">
                            <MyStats stats={userDetails.stats}/>
                        </Tab>
                        <Tab eventKey="teams" title="Teams">
                            <MyTeams routeKey={routeKey} myTeams={myTeams}/>
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                            <Settings profile={userDetails}/>
                        </Tab>
                    </Tabs>
                </>
                : <Preloader />
            }
        </PageLayout>
    );
};

export default Profile;