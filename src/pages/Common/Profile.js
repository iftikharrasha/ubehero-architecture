import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import Preloader from '../../components/PageLayout/Preloader';
import ProfileSide from '../../components/Profile/ProfileSide';
import { fetchMyTeams } from '../../redux/slices/teamSlice';
import { fetchProfileDetails, fetchProfileBadges } from '../../redux/slices/profileSlice'
import ProfileBottom from '../../components/Profile/ProfileBottom';
import ProfileTop from '../../components/Profile/ProfileTop';

import { Tabs, Row, Modal, Tour, Col } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';

import useTour from '../../hooks/useTour';
import useProfile from '../../hooks/useProfile';
import { fetchParties } from '../../redux/slices/partySlice';

const { TabPane } = Tabs;

const Profile = () => { 
    const { tourDoneOfPages, checkInTourStorage, addTourToStorage } = useTour();
    // const { id } = useParams(); this might be problamatic and fetch others profile?

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.profile.data)
    const version = userDetails ? userDetails.version : 0;
    const id = userDetails._id;

    const [routeKey, setRouteKey] = useState('mystats');
    const [statsRouteKey, setStatsRouteKey] = useState('games');
    const [settingsRouteKey, setSettingsRouteKey] = useState('personal');
    const [socialsRouteKey, setSocialsRouteKey] = useState('friends');
    const [friendRouteKey, setFriendRouteKey] = useState('friendlist');

    const myTeams = useSelector((state) => state.myTeams.data)
    const versionTeams = useSelector((state) => state.myTeams.version)
    
    // const separatedItem = parties.find((item) => item.title === 'Underdogg');
    // const remainingItems = parties.filter((item) => item.title !== 'Underdogg');

    
    const myParties = useSelector((state) => state.parties.data);
    const versionParty = useSelector((state) => state.parties.version);

    const badges = useSelector((state) => state.profile.badges);

    useEffect(() => {
        dispatch(fetchProfileDetails({ id, version }));
        dispatch(fetchProfileBadges({ id, version }));
    }, [])

    useEffect(() => {
        if(routeKey === 'teams'){
          dispatch(fetchMyTeams({ id, versionTeams }));
        }else if(routeKey === 'parties'){
          dispatch(fetchParties({ versionParty }));
        }
    }, [routeKey])

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.pathname.endsWith('games')) {
            setRouteKey('mystats');
            setStatsRouteKey('games');
        } else if (location.pathname.endsWith('badges')) {
            setRouteKey('mystats');
            setStatsRouteKey('badges');
        } else if (location.pathname.endsWith('socials')) {
            setRouteKey('socials');
            setSocialsRouteKey('friends');
            setFriendRouteKey('friendlist');
        } else if (location.pathname.endsWith('friends')) {
            setRouteKey('socials');
            setSocialsRouteKey('friends');
            setFriendRouteKey('friendlist');
        } else if (location.pathname.endsWith('friendlist')) {
            setRouteKey('socials');
            setSocialsRouteKey('friends');
            setFriendRouteKey('friendlist');
        } else if (location.pathname.endsWith('requests')) {
            setRouteKey('socials');
            setSocialsRouteKey('friends');
            setFriendRouteKey('requests');
        } else if (location.pathname.endsWith('pendings')) {
            setRouteKey('socials');
            setSocialsRouteKey('friends');
            setFriendRouteKey('pendings');
        } else if (location.pathname.endsWith('followers')) {
            setRouteKey('socials');
            setSocialsRouteKey('followers');
        } else if (location.pathname.endsWith('teams')) {
            setRouteKey('teams');
        } else if (location.pathname.endsWith('parties')) {
            setRouteKey('parties');
        } else if (location.pathname.endsWith('settings')) {
            setRouteKey('settings');
            setSettingsRouteKey('personal');
        } else if (location.pathname.endsWith('personal')) {
            setRouteKey('settings');
            setSettingsRouteKey('personal');
        } else if (location.pathname.endsWith('gameaccounts')) {
            setRouteKey('settings');
            setSettingsRouteKey('gameaccounts');
        } else {
            setRouteKey('mystats');
            setStatsRouteKey('games');
        }
    }, [location]);

    const handleTabChange = (key) => {
      switch (key) {
        case 'mystats':
          history.push(`/profile/${id}`);
          break;
        case 'games':
          history.push(`/profile/${id}/games`);
          break;
        case 'badges':
          history.push(`/profile/${id}/badges`);
          break;
        case 'socials':
          history.push(`/profile/${id}/socials`);
          break;
        case 'friends':
          history.push(`/profile/${id}/friends`);
          break;
        case 'friendlist':
          history.push(`/profile/${id}/friendlist`);
          break;
        case 'requests':
          history.push(`/profile/${id}/requests`);
          break;
        case 'pendings':
          history.push(`/profile/${id}/pendings`);
          break;
        case 'followers':
          history.push(`/profile/${id}/followers`);
          break;
        case 'teams':
          history.push(`/profile/${id}/teams`);
          break;
        case 'parties':
          history.push(`/profile/${id}/parties`);
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

    const gameStats = [
      {
        category: "FIFA",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgawCVKb4ZCy_2whtPFbMsKifk95urcBKgF1UiW2PF50YuxbpIg-s64MVOK4UGp1wE4Qk&usqp=CAU",
        played: 0,
        win: 0,
        defeat: 0,
      },
      {
        category: "PUBG",
        img: "https://cdn.exputer.com/wp-content/uploads/2022/07/PUBG-Patch-18.2-Adds-More-Graphical-Options-For-Next-Gen-Consoles.jpg.webp",
        played: 0,
        win: 0,
        defeat: 0,
      },
      {
        category: "WARZONE",
        img: "https://e24reactor-s3-bucket.s3.amazonaws.com/images/tournaments/5442ff27-ed75-49c8-a2c9-6631f34264e2-download.jpg",
        played: 0,
        win: 0,
        defeat: 0,
      },
      {
        category: "CSGO",
        img: "https://i.pinimg.com/originals/7b/23/2c/7b232ccb015d9c21143b6ccd67038e63.jpg",
        played: 0,
        win: 0,
        defeat: 0,
      },
      {
        category: "FREEFIRE",
        img: "https://d.newsweek.com/en/full/1987539/garena-free-fire-keyart.webp?w=1600&h=900&q=88&f=e35a53dbb53ee0455d23e0afef5da942",
        played: 0,
        win: 0,
        defeat: 0,
      },
      {
        category: "ROCKET LEAGUE",
        img: "https://variety.com/wp-content/uploads/2020/07/rocket-league.jpg?w=1000&h=563&crop=1&resize=1000%2C563",
        played: 0,
        win: 0,
        defeat: 0,
      },
      {
        category: "CLASH CLANS",
        img: "https://media.newyorker.com/photos/590977c9019dfc3494ea2f7f/master/w_2560%2Cc_limit/Johnston-Clash-Clans.jpg",
        played: 0,
        win: 0,
        defeat: 0,
      },
      {
        category: "CLASH ROYALE",
        img: "https://www.touchtapplay.com/wp-content/uploads/2016/03/how-to-fix-clash-royale-connection-problems.jpg?fit=1000%2C592",
        played: 0,
        win: 0,
        defeat: 0,
      },
    ]

    return (
        <PageLayout>
            {
                userDetails && badges ? 
                <div className='profile'>
                  {/* <div className='profileBg'>
                      <img src='https://res.cloudinary.com/duoalyur6/image/upload/v1695208606/MOSHED-2023-9-20-17-12-57_i7hti1.gif' alt="cover" />
                  </div> */}
                    <Row>
                        <Col span={5}>
                            <ProfileSide 
                                ref1TSummery1={ref1TSummery1}
                                ref1TSummery2={ref1TSummery2}
                                ref1TSummery3={ref1TSummery3} 
                                ref1TSummery4={ref1TSummery4} 
                                profile={userDetails} 
                            />
                        </Col>
                        <Col span={18} offset={1}>
                            <ProfileTop
                                ref3ProfilePic={ref3ProfilePic} 
                                ref4CoverPhoto={ref4CoverPhoto} 
                                profile={userDetails} 
                                badges={badges}
                            />
                            <ProfileBottom
                                ref2GamingStats={ref2GamingStats} 
                                ref2Teams={ref2Teams} 
                                ref2Settings={ref2Settings}
                                routeKey={routeKey} 
                                settingsRouteKey={settingsRouteKey}
                                socialsRouteKey={socialsRouteKey}
                                statsRouteKey={statsRouteKey}
                                friendRouteKey={friendRouteKey}
                                handleTabChange={handleTabChange}
                                profile={userDetails}
                                myTeams={myTeams}
                                myParties={myParties}
                                badges={badges}
                                gameStats={gameStats}
                            />
                        </Col>
                    </Row>
                </div>
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
