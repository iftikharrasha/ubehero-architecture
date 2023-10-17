import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import Preloader from '../../components/PageLayout/Preloader';
import ProfileSide from '../../components/Profile/ProfileSide';
import { fetchMyTeams } from '../../redux/slices/teamSlice';
import { fetchProfileDetails } from '../../redux/slices/profileSlice'
import ProfileBottom from '../../components/Profile/ProfileBottom';
import ProfileTop from '../../components/Profile/ProfileTop';

import { Tabs, Row, Modal, Tour, Col } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';

import useTour from '../../hooks/useTour';
import useProfile from '../../hooks/useProfile';

const { TabPane } = Tabs;

const Profile = () => { 
    const { tourDoneOfPages, checkInTourStorage, addTourToStorage } = useTour();
    const { id } = useParams();

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.profile.data)
    const version = userDetails ? userDetails.version : 0;

    const [routeKey, setRouteKey] = useState('mystats');
    const [statsRouteKey, setStatsRouteKey] = useState('games');
    const [settingsRouteKey, setSettingsRouteKey] = useState('personal');
    const [socialsRouteKey, setSocialsRouteKey] = useState('friends');
    const [friendRouteKey, setFriendRouteKey] = useState('friendlist');

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
        }else if (location.pathname.endsWith('requests')) {
            setRouteKey('socials');
            setSocialsRouteKey('friends');
            setFriendRouteKey('requests');
        }else if (location.pathname.endsWith('pendings')) {
            setRouteKey('socials');
            setSocialsRouteKey('friends');
            setFriendRouteKey('pendings');
        }else if (location.pathname.endsWith('followers')) {
            setRouteKey('socials');
            setSocialsRouteKey('followers');
        }  else if (location.pathname.endsWith('teams')) {
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
    
    const badges = [
      {
        title: "underdog",
        icon: "https://props.com/wp-content/uploads/Underdog-Fantasy-Icon-100x100.webp",
        instruction: "created the account",
        level: 1,
        completed: 100,
        total: 120,
        earned: 120,
        claimed: true,
      },
      {
        title: "captain",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441978/Booster_Frame-6_aq0kta.png",
        instruction: "when you create a team and recruited all the players",
        level: 1,
        completed: 0,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "warlock",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Diamond_Spell_Specialist_a42lce.png",
        instruction: "when you join a tournament which means you've annouced war",
        level: 2,
        completed: 10,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "defender",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Gold_The_Collector_qb27ea.png",
        instruction: "when you win or defend three battles in a row",
        level: 3,
        completed: 33,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "kingsguard",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Booster_Frame-1_rmpdoh.png",
        instruction: "when you successfully win the tournament as a team mate",
        level: 5,
        completed: 75,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "knighthood",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Booster_Frame-7_giy05h.png",
        instruction: "when you successfully win the tournament as a captain",
        level: 0,
        completed: 100,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "kingslayer",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696519458/Bronze_Routine_Player_fmgpvs.png",
        instruction: "when you finished as a runner up in a tournament",
        level: 0,
        completed: 0,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "contender",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Booster_Frame-9_i66d9c.png",
        instruction: "when you win three tournaments in a row",
        level: 0,
        completed: 0,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "loyalist",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Booster_Frame-10_gwxe56.png",
        instruction: "when you participate two tournaments with your team",
        level: 0,
        completed: 75,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "specialist",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Booster_Frame-4_o0mzdn.png",
        instruction: "when at least one of your teams has all the players added",
        level: 0,
        completed: 33,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "booster",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Booster_Frame-8_w17u8p.png",
        instruction: "when at least one of your teams has all the players added",
        level: 0,
        completed: 10,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "dedicated",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Diamond_Star_Selector_samusd.png",
        instruction: "when at least one of your teams has all the players added",
        level: 0,
        completed: 100,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "reactor",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Diamond_Superhost_bwvtek.png",
        instruction: "when at least one of your teams has all the players added",
        level: 0,
        completed: 0,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "popular",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696441977/Booster_Frame_i5qkpt.png",
        instruction: "when you gain 500 followers withing our gaming community",
        level: 0,
        completed: 50,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "grand maester",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696519458/Gold_Superhost_lni5br.png",
        instruction: "when you collaborate with the master and master decides to reward you",
        level: 0,
        completed: 75,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "gaming machine",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696519458/Gold_Star_Selector_q9umt7.png",
        instruction: "when you play at least three different games within our platform",
        level: 0,
        completed: 100,
        total: 5,
        earned: 0,
        claimed: false,
      },
      {
        title: "patriot",
        icon: "https://res.cloudinary.com/duoalyur6/image/upload/v1696519458/Booster_bag_shmoc0.png",
        instruction: "when you win at least one country based tournament",
        level: 0,
        completed: 0,
        total: 5,
        earned: 0,
        claimed: false,
      },
    ]

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

    const [myBadgeList, setMyBadgeList] = useState(null);
    const { handleBadgeListHook } = useProfile();
    console.log("myBadgeList", myBadgeList)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const badges = await handleBadgeListHook();
            setMyBadgeList(badges);
          } catch (error) {
            setMyBadgeList([]);
            console.error('Error fetching friend list:', error);
          }
        };
      
        fetchData();
    }, []);

    return (
        <PageLayout>
            {
                userDetails ? 
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