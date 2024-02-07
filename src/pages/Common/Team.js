import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import Preloader from '../../components/PageLayout/Preloader';
import { fetchMyTeams, fetchTeamDetails } from '../../redux/slices/teamSlice';
import { fetchProfileDetails, fetchProfileBadges } from '../../redux/slices/profileSlice';
import TeamSide from '../../components/Team/TeamSide';
import TeamTop from '../../components/Team/TeamTop';
// import TeamBottom from '../../components/Team/TeamBottom';

import { Tabs, Row, Modal, Tour, Col, Card } from 'antd';
import TeamBottom from '../../components/Team/TeamBottom';

const Team = () => { 
    const dispatch = useDispatch();
    const { id } = useParams();

    // const userDetails = useSelector((state) => state.profile.data)  //delete
    // const version = userDetails ? userDetails.version : 0; //delete
    // const id = userDetails._id; //delete
    
    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    const userId = profile?.data?._id;

    const teams = useSelector((state) => state.myTeams.data)
    const teamDetails = teams.find(t => t._id === id);
    const version = teamDetails ? teamDetails.version : 0;

    // const [routeKey, setRouteKey] = useState('mystats');
    // const [statsRouteKey, setStatsRouteKey] = useState('games');
    // const [settingsRouteKey, setSettingsRouteKey] = useState('personal');
    // const [socialsRouteKey, setSocialsRouteKey] = useState('friends');
    // const [friendRouteKey, setFriendRouteKey] = useState('friendlist');

    // const badges = useSelector((state) => state.profile.badges);

    // useEffect(() => {
    //     dispatch(fetchTeamDetails({ id, version }));
    //     // dispatch(fetchProfileDetails({ id, version }));
    //     // dispatch(fetchProfileBadges({ id, version }));
    // }, [])

    // useEffect(() => {
    //     if(routeKey === 'teams'){
    //         dispatch(fetchMyTeams({ id, versionTeams }));
    //     }
    // }, [routeKey])

    // const location = useLocation();
    // const history = useHistory();

    // useEffect(() => {
    //     if (location.pathname.endsWith('games')) {
    //         setRouteKey('mystats');
    //         setStatsRouteKey('games');
    //     } else if (location.pathname.endsWith('badges')) {
    //         setRouteKey('mystats');
    //         setStatsRouteKey('badges');
    //     } else if (location.pathname.endsWith('socials')) {
    //         setRouteKey('socials');
    //         setSocialsRouteKey('friends');
    //         setFriendRouteKey('friendlist');
    //     } else if (location.pathname.endsWith('friends')) {
    //         setRouteKey('socials');
    //         setSocialsRouteKey('friends');
    //         setFriendRouteKey('friendlist');
    //     } else if (location.pathname.endsWith('friendlist')) {
    //         setRouteKey('socials');
    //         setSocialsRouteKey('friends');
    //         setFriendRouteKey('friendlist');
    //     }else if (location.pathname.endsWith('requests')) {
    //         setRouteKey('socials');
    //         setSocialsRouteKey('friends');
    //         setFriendRouteKey('requests');
    //     }else if (location.pathname.endsWith('pendings')) {
    //         setRouteKey('socials');
    //         setSocialsRouteKey('friends');
    //         setFriendRouteKey('pendings');
    //     }else if (location.pathname.endsWith('followers')) {
    //         setRouteKey('socials');
    //         setSocialsRouteKey('followers');
    //     }  else if (location.pathname.endsWith('teams')) {
    //         setRouteKey('teams');
    //     } else if (location.pathname.endsWith('settings')) {
    //         setRouteKey('settings');
    //         setSettingsRouteKey('personal');
    //     } else if (location.pathname.endsWith('personal')) {
    //         setRouteKey('settings');
    //         setSettingsRouteKey('personal');
    //     } else if (location.pathname.endsWith('gameaccounts')) {
    //         setRouteKey('settings');
    //         setSettingsRouteKey('gameaccounts');
    //     }else {
    //         setRouteKey('mystats');
    //         setStatsRouteKey('games');
    //     }
    // }, [location]);

    // const handleTabChange = (key) => {
    //   switch (key) {
    //     case 'mystats':
    //       history.push(`/profile/${id}`);
    //       break;
    //     case 'games':
    //       history.push(`/profile/${id}/games`);
    //       break;
    //     case 'badges':
    //       history.push(`/profile/${id}/badges`);
    //       break;
    //     case 'socials':
    //       history.push(`/profile/${id}/socials`);
    //       break;
    //     case 'friends':
    //       history.push(`/profile/${id}/friends`);
    //       break;
    //     case 'friendlist':
    //       history.push(`/profile/${id}/friendlist`);
    //       break;
    //     case 'requests':
    //       history.push(`/profile/${id}/requests`);
    //       break;
    //     case 'pendings':
    //       history.push(`/profile/${id}/pendings`);
    //       break;
    //     case 'followers':
    //       history.push(`/profile/${id}/followers`);
    //       break;
    //     case 'teams':
    //       history.push(`/profile/${id}/teams`);
    //       break;
    //     case 'settings':
    //       history.push(`/profile/${id}/settings`);
    //       break;
    //     case 'personal':
    //       history.push(`/profile/${id}/personal`);
    //       break;
    //     case 'gameaccounts':
    //       history.push(`/profile/${id}/gameaccounts`);
    //       break;
    //     default:
    //       break;
    //   }
    // };

    // const gameStats = [
    //   {
    //     category: "FIFA",
    //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgawCVKb4ZCy_2whtPFbMsKifk95urcBKgF1UiW2PF50YuxbpIg-s64MVOK4UGp1wE4Qk&usqp=CAU",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    //   {
    //     category: "PUBG",
    //     img: "https://cdn.exputer.com/wp-content/uploads/2022/07/PUBG-Patch-18.2-Adds-More-Graphical-Options-For-Next-Gen-Consoles.jpg.webp",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    //   {
    //     category: "WARZONE",
    //     img: "https://e24reactor-s3-bucket.s3.amazonaws.com/images/tournaments/5442ff27-ed75-49c8-a2c9-6631f34264e2-download.jpg",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    //   {
    //     category: "CSGO",
    //     img: "https://i.pinimg.com/originals/7b/23/2c/7b232ccb015d9c21143b6ccd67038e63.jpg",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    //   {
    //     category: "FREEFIRE",
    //     img: "https://d.newsweek.com/en/full/1987539/garena-free-fire-keyart.webp?w=1600&h=900&q=88&f=e35a53dbb53ee0455d23e0afef5da942",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    //   {
    //     category: "ROCKET LEAGUE",
    //     img: "https://variety.com/wp-content/uploads/2020/07/rocket-league.jpg?w=1000&h=563&crop=1&resize=1000%2C563",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    //   {
    //     category: "CLASH CLANS",
    //     img: "https://media.newyorker.com/photos/590977c9019dfc3494ea2f7f/master/w_2560%2Cc_limit/Johnston-Clash-Clans.jpg",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    //   {
    //     category: "CLASH ROYALE",
    //     img: "https://www.touchtapplay.com/wp-content/uploads/2016/03/how-to-fix-clash-royale-connection-problems.jpg?fit=1000%2C592",
    //     played: 0,
    //     win: 0,
    //     defeat: 0,
    //   },
    // ]

    return (
        <PageLayout>
            {
                teamDetails ? 
                <div className='profile'>
                    <div className='profileBg'>
                      <img src={teamDetails.coverPhoto} alt="cover" />
                    </div>
                    <Row>
                        <Col span={5}>
                            <TeamSide 
                                team={teamDetails}
                                isLoggedIn={isLoggedIn} 
                                userId={userId}
                            />
                        </Col>
                        <Col span={18} offset={1}>
                            <TeamTop
                                team={teamDetails} 
                                // badges={badges}
                            />
                            
                            <Card className="tabCard">
                                <TeamBottom/>
                                {/* <TeamBottom
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
                                /> */}
                            </Card>
                        </Col>
                    </Row>
                </div>
                : <Preloader />
            }
        </PageLayout>
    );
};

export default Team;
