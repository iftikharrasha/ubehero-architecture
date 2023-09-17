import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import ProfileTop from '../../components/Profile/ProfileTop';
import ProfileBottom from '../../components/Profile/ProfileBottom';
import Preloader from '../../components/PageLayout/Preloader';
import ProfileSide from '../../components/Profile/ProfileSide';
import { fetchMyTeams } from '../../redux/slices/teamSlice';
import { fetchProfileDetails } from '../../redux/slices/profileSlice'

import { Tabs, Row, Modal, Tour, Col } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';

import useTour from '../../hooks/useTour';

const { TabPane } = Tabs;

const Profile = () => { 
    const { tourDoneOfPages, checkInTourStorage, addTourToStorage } = useTour();
    const { id } = useParams();

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.profile.data)
    const version = userDetails ? userDetails.version : 0;

    const [routeKey, setRouteKey] = useState('mystats');
    const [settingsRouteKey, setSettingsRouteKey] = useState('personal');

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
            setSettingsRouteKey('personal');
        } else if (location.pathname.endsWith('personal')) {
          setRouteKey('settings');
          setSettingsRouteKey('personal');
        } else if (location.pathname.endsWith('gameaccounts')) {
          setRouteKey('settings');
          setSettingsRouteKey('gameaccounts');
        }else {
            setRouteKey('mystats');
        }
    }, [location]);

    const handleTabChange = (key) => {
      switch (key) {
        case 'mystats':
          history.push(`/profile/${id}`);
          break;
        case 'teams':
          history.push(`/profile/${id}/teams`);
          break;
        case 'settings':
          history.push(`/profile/${id}/settings`);
          break;
        case 'personal':
          history.push(`/profile/${id}/personal`);
          break;
        case 'gameaccounts':
          history.push(`/profile/${id}/gameaccounts`);
          break;
        default:
          break;
      }
    };

    /* this is to handler the modal of tour */
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const alreadyToured = checkInTourStorage('profileTour')
        if(!alreadyToured){
            setIsModalOpen(true);
        }
    }, [])
    
    const handleTakeTour = () => {
        addTourToStorage('profileTour')
        setIsModalOpen(false);
        setTourOpen(true)
    };
    /* */

    /* this is to handler the site tour */
    const ref1TSummery1 = useRef(null);
    const ref1TSummery2 = useRef(null);
    const ref1TSummery3 = useRef(null);
    const ref1TSummery4 = useRef(null);
    const ref2GamingStats = useRef(null);
    const ref2Teams = useRef(null);
    const ref2Settings = useRef(null);
    const ref3ProfilePic = useRef(null);
    const ref4CoverPhoto = useRef(null);
    const [tourOpen, setTourOpen] = useState(false);
    
    const steps = [
        {
          title: 'Summery card',
          description: 'ref1TSummery1.',
          target: () => ref1TSummery1.current,
        },
        {
          title: 'XP Earned.',
          description: 'ref1TSummery2',
          target: () => ref1TSummery2.current,
        },
        {
          title: 'Level Completed.',
          description: 'ref1TSummery3',
          target: () => ref1TSummery3.current,
        },
        {
          title: 'Upgrade to master.',
          description: 'ref1TSummery4',
          target: () => ref1TSummery4.current,
        },
        {
          title: 'My Gaming Statistics',
          description: 'ref2GamingStats',
          target: () => ref2GamingStats.current,
        },
        {
          title: 'My Teams',
          description: 'ref2Teams',
          target: () => ref2Teams.current,
        },
        {
          title: 'Account Settings',
          description: 'ref2Settings',
          target: () => ref2Settings.current,
        },
        {
          title: 'Profile Picture.',
          description: 'ref3ProfilePic',
          target: () => ref3ProfilePic.current,
        },
        {
          title: 'Cover Photo.',
          description: 'ref4CoverPhoto',
          target: () => ref4CoverPhoto.current,
        },
        {
          title: `Completed! You've earned 30px points`,
          description: 'DONE',
          type: 'default'
        },
    ];
    /* */

    return (
        <PageLayout>
            {
                userDetails ? 
                <>
                    <ProfileTop 
                        ref3ProfilePic={ref3ProfilePic} 
                        ref4CoverPhoto={ref4CoverPhoto} 
                        profile={userDetails} 
                    />
                    <Row>
                        <Col span={4}>
                            <ProfileSide 
                                ref1TSummery1={ref1TSummery1}
                                ref1TSummery2={ref1TSummery2}
                                ref1TSummery3={ref1TSummery3} 
                                ref1TSummery4={ref1TSummery4} 
                                profile={userDetails} 
                            />
                        </Col>
                        <Col span={19} offset={1}>
                            <ProfileBottom
                                ref2GamingStats={ref2GamingStats} 
                                ref2Teams={ref2Teams} 
                                ref2Settings={ref2Settings}
                                routeKey={routeKey} 
                                settingsRouteKey={settingsRouteKey}
                                handleTabChange={handleTabChange}
                                profile={userDetails}
                                myTeams={myTeams}
                            />
                        </Col>
                    </Row>
                </>
                : <Preloader />
            }

            <Modal title="Take a tour | Profile Page" open={isModalOpen} onOk={handleTakeTour} onCancel={() => setIsModalOpen(false)}>
                <p>New to your profile page? Kindly take a tour to make things easy for you! See how it works.</p>
            </Modal>

            <Tour  open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} zIndex={1001} type="primary"/>
        </PageLayout>
    );
};

export default Profile;