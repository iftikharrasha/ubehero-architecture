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

const Profile = () => { 
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfileDetails({ id, version }));
    }, [])

    const userDetails = useSelector((state) => state.profile.data)
    const version = userDetails ? userDetails.version : 0;

    const [routeKey, setRouteKey] = useState('mystats');

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

    // useEffect(() => {
    //     if(routeKey === 'chatroom'){
    //         dispatch(fetchChatRoom({ id, versionChatroom }));
    //     }
    // }, [routeKey])

    return (
        <PageLayout>
            {
                userDetails ? 
                <>
                    <ProfileDetails user={userDetails} />
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
                            <MyTeams teams={userDetails.teams}/>
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                            <Settings/>
                        </Tab>
                    </Tabs>
                </>
                : <Preloader />
            }
        </PageLayout>
    );
};

export default Profile;