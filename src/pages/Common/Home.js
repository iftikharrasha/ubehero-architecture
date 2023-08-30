import React, { useEffect, useState } from 'react';
import Tournaments from '../../components/Tournaments/Tournaments';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useSelector } from 'react-redux';
import { fetchTournaments } from '../../redux/slices/tournamentSlice'
import { fetchStatics } from '../../redux/slices/staticSlice'
import { useDispatch } from 'react-redux';
import Landing from '../../components/Landing/Landing';
import useWindowSize from '../../hooks/useWindowSize';

import { Col, Empty, Pagination, Row, Tabs } from 'antd';
import { ThunderboltOutlined, TrophyOutlined, AimOutlined, HourglassOutlined } from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const { TabPane } = Tabs;

const Home = () => {
    const dispatch = useDispatch();
    const versionTournaments = useSelector(state => state.tournaments.version);
    const savedItems = useSelector((state) => state.tournaments.wishList);
    const versionLanding = useSelector(state => state.statics.version);
    const country = useSelector(state => state.statics.country);
    const isLoggedIn = useSelector(state => state.profile.signed_in);
    const { windowWidth } = useWindowSize();

    useEffect(() => {
        dispatch(fetchStatics({ versionLanding, country }));
    }, [country])

    useEffect(() => {
        dispatch(fetchTournaments({versionTournaments}));
    }, [])

    const landing = useSelector((state) => state.statics.landing)
    const tournaments = useSelector((state) => state.tournaments.data)
    const purchasedItems = useSelector(state => state.profile?.data?.purchasedItems?.tournaments);

    //filter tournaments and get the common one that the user purchased
    const [roomsJoined, setRoomsJoined] = useState([]);
    const [notJoinedRooms, setNotJoinedRooms] = useState([]);
    
    useEffect(() => {
        if(purchasedItems){
            const myRooms = tournaments.filter(tournament => purchasedItems.some(itemId => tournament._id === itemId));
            setRoomsJoined(myRooms);
        }
    }, [purchasedItems, tournaments]);
    
    useEffect(() => {
        if(isLoggedIn){
            if(roomsJoined.length > 0){
                const notJoinedTournaments = tournaments.filter((tournament) =>
                    !roomsJoined.some(room => room._id === tournament._id)
                );
                setNotJoinedRooms(notJoinedTournaments)
            }else{
                setNotJoinedRooms(tournaments)
            }
        }else{
            setNotJoinedRooms(tournaments)
        }
    }, [roomsJoined, tournaments, isLoggedIn]);

    // Tournaments Pagination configuration
    const [currentTournamentsPage, setCurrentTournamentsPage] = useState(1);
    const handleTournamentsPageChange = (page) => {
        setCurrentTournamentsPage(page);
    };
     const tournamentsPageSize = windowWidth < 575.98 ? 1 : // Extra small screens
                                 windowWidth < 991.98 ? 2 : // Medium screens
                                 windowWidth < 1199.98 ? 4 : // Large screens
                                 4; // Extra large screens
    const totalTournaments = notJoinedRooms ? notJoinedRooms.length : 0;
    const startIndex = (currentTournamentsPage - 1) * tournamentsPageSize;
    const endIndex = startIndex + tournamentsPageSize;
    const visibleTournaments = notJoinedRooms ? notJoinedRooms.slice(startIndex, endIndex) : [];


    // Joined Pagination configuration
    const [currentJoinedPage, setCurrentJoinedPage] = useState(1);
    const handleJoinedPageChange = (page) => {
        setCurrentJoinedPage(page);
    };
    const joinedPageSize = windowWidth < 575.98 ? 1 : // Extra small screens
                           windowWidth < 991.98 ? 2 : // Medium screens
                           windowWidth < 1199.98 ? 4 : // Large screens
                           4; // Extra large screens
    const joinedStartIndex = (currentJoinedPage - 1) * joinedPageSize;
    const joinedEndIndex = joinedStartIndex + joinedPageSize;
    const visibleJoinedRooms = roomsJoined ? roomsJoined.slice(joinedStartIndex, joinedEndIndex) : [];

    const location = useLocation();
    const history = useHistory();
    const [routeKey, setRouteKey] = useState('featured');

    useEffect(() => {
        if (location.pathname.endsWith('ongoing')) {
            setRouteKey('ongoing');
        } else if (location.pathname.endsWith('joined')) {
            setRouteKey('joined');
        }else {
            setRouteKey('featured');
        }
    }, [location]);

    const handleTabChange = (key) => {
        setRouteKey(key);
        switch (key) {
            case 'featured':
                history.push(`/`);
                break;
            case 'ongoing':
                history.push(`/tournament/ongoing`);
                break;
            case 'joined':
                history.push(`/tournament/joined`);
                break;
            default:
                break;
        }
    };

    return (
        <PageLayout>
            {landing && <Landing landing={landing} />}
            <Tabs activeKey={routeKey} onChange={handleTabChange} tabPosition={windowWidth < 991.98 ? "top" : "left"}>
                <TabPane
                    key="featured"
                    tab={
                        <Row justify="left" align="middle">
                            <TrophyOutlined style={{ fontSize: '1rem' }}/> <span style={{ fontSize: '1rem' }}>FEATURED</span>
                        </Row>
                    }
                >
                    <Row gutter={[6, 6]}>
                        {visibleTournaments.length > 0 ? (
                            visibleTournaments.map((tournament, index) => (
                                <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                    <Tournaments routeKey={tournament._id} tournament={tournament} details={false} totalJoined={tournament?.leaderboards?.length}/>
                                </Col>
                            ))
                            ) : (
                            <div style={{width: '100%'}}>
                                <Empty />
                            </div>
                        )}
                    </Row>
                    <div className="pagination-container">
                        <Pagination
                            hideOnSinglePage={true}
                            current={currentTournamentsPage}
                            onChange={handleTournamentsPageChange}
                            total={totalTournaments}
                            pageSize={tournamentsPageSize}
                        />
                    </div>
                </TabPane>
                {isLoggedIn ? 
                <TabPane
                    key="joined"
                    tab={
                        <Row justify="left" align="middle">
                            <AimOutlined style={{ fontSize: '1rem' }}/> <span style={{ fontSize: '1rem' }}>JOINED</span>
                        </Row>
                    }
                >
                    <Row gutter={[6, 6]}>
                        {
                            visibleJoinedRooms.length > 0 ? (
                                visibleJoinedRooms.map((tournament, index) => (
                                    <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                        <Tournaments routeKey={tournament._id} tournament={tournament} details={false} totalJoined={tournament?.leaderboards?.length}/>
                                    </Col>
                                ))
                            ) : (
                            <div style={{width: '100%'}}>
                                <Empty />
                            </div>
                            )
                        }
                    </Row>
                    <Pagination
                        hideOnSinglePage={true}
                        current={currentJoinedPage}
                        onChange={handleJoinedPageChange}
                        total={roomsJoined.length}
                        pageSize={joinedPageSize}
                    />
                </TabPane> : null}
                <TabPane
                    key="saved"
                    tab={
                        <Row justify="left" align="middle">
                            <ThunderboltOutlined style={{ fontSize: '1rem' }}/> <span style={{ fontSize: '1rem' }}>SAVED</span>
                        </Row>
                    }
                >
                    {
                        savedItems.length > 0 ? (
                            savedItems.map((tournament, index) => (
                                <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                    <Tournaments routeKey={tournament._id} tournament={tournament} details={false} totalJoined={tournament?.leaderboards?.length}/>
                                </Col>
                            ))
                        ) : (
                        <div style={{width: '100%'}}>
                            <Empty />
                        </div>
                        )
                    }
                </TabPane>
                <TabPane
                    key="archived"
                    tab={
                        <Row justify="left" align="middle">
                            <HourglassOutlined style={{ fontSize: '1rem' }}/> <span style={{ fontSize: '1rem' }}>ARCHIVED</span>
                        </Row>
                    }
                >
                    <Empty/>
                </TabPane>
            </Tabs>
        </PageLayout>
    );
};

export default Home;