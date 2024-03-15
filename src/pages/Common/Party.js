import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import Preloader from '../../components/PageLayout/Preloader';
import PartyLeftSide from '../../components/Party/PartyLeftSide';
import PartyTop from '../../components/Party/PartyTop';

import { Tabs, Row, Modal, Tour, Col, Empty } from 'antd';
import PartyBottom from '../../components/Party/PartyBottom';
import { fetchPartyDetails } from '../../redux/slices/partySlice';
import PartyRightSide from '../../components/Party/PartyRightSide';
import useProfile from '../../hooks/useProfile';

const Party = () => { 
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const parties = useSelector((state) => state.parties.data)
    const partyDetails = parties.find(t => t._id === id);
    const versionParty = partyDetails ? partyDetails.version : 0;

    // const [routeKey, setRouteKey] = useState('mystats');
    // const [statsRouteKey, setStatsRouteKey] = useState('games');
    // const [settingsRouteKey, setSettingsRouteKey] = useState('personal');
    // const [socialsRouteKey, setSocialsRouteKey] = useState('friends');
    // const [friendRouteKey, setFriendRouteKey] = useState('friendlist');

    // const badges = useSelector((state) => state.profile.badges);

    useEffect(() => {
        dispatch(fetchPartyDetails({ id, versionParty }));
    }, [])

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

    

    
    const [partySocialPosts, setPartySocialPosts] = useState(null);
    const { handlePartySocialPosts } = useProfile();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const posts = await handlePartySocialPosts(id);
            setPartySocialPosts(posts);
          } catch (error) {
            setPartySocialPosts([]);
            console.error('Error fetching post list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    return (
        <PageLayout>
            {
                partyDetails ? 
                <div className='profile'>
                    <Row>
                        <Col span={5}>
                            <PartyLeftSide 
                                party={partyDetails} 
                            />
                        </Col>
                        <Col span={12} offset={1}>
                            {
                                partySocialPosts ? <PartyBottom party={partyDetails} data={partySocialPosts}/> : 
                                <Empty/>
                            }
                            
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
                        </Col>
                        <Col span={5} offset={1}>
                            <PartyRightSide id={partyDetails._id}/>
                        </Col>
                    </Row>
                </div>
                : <Preloader />
            }
        </PageLayout>
    );
};

export default Party;
