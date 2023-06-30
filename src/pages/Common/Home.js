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
import { StockOutlined } from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

const Home = () => {
    const dispatch = useDispatch();
    const versionTournaments = useSelector(state => state.tournaments.version);
    const versionLanding = useSelector(state => state.statics.version);
    const country = useSelector(state => state.statics.country);
    const { windowWidth } = useWindowSize();

    useEffect(() => {
        dispatch(fetchStatics({ versionLanding, country }));
    }, [country])

    useEffect(() => {
        dispatch(fetchTournaments({versionTournaments}));
    }, [])

    const landing = useSelector((state) => state.statics.landing)
    const tournaments = useSelector((state) => state.tournaments.data)

    //filter tournaments and get the common one that the user purchased
    const [roomsJoined, setRoomsJoined] = useState([]);
    const purchasedItems = useSelector(state => state.profile?.data?.purchasedItems?.tournaments);
    
    useEffect(() => {
        if(purchasedItems){
            const myRooms = tournaments.filter(tournament => purchasedItems.some(itemId => tournament._id === itemId));
            setRoomsJoined(myRooms)
        }
    }, [purchasedItems, tournaments]);

    // Tournaments Pagination configuration
    const [currentTournamentsPage, setCurrentTournamentsPage] = useState(1);
    const handleTournamentsPageChange = (page) => {
        setCurrentTournamentsPage(page);
    };
     const tournamentsPageSize = windowWidth < 575.98 ? 1 : // Extra small screens
                                 windowWidth < 991.98 ? 2 : // Medium screens
                                 windowWidth < 1199.98 ? 4 : // Large screens
                                 4; // Extra large screens
    const totalTournaments = tournaments ? tournaments.length : 0;
    const startIndex = (currentTournamentsPage - 1) * tournamentsPageSize;
    const endIndex = startIndex + tournamentsPageSize;
    const visibleTournaments = tournaments ? tournaments.slice(startIndex, endIndex) : [];


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
    const [routeKey, setRouteKey] = useState('tournaments');

    useEffect(() => {
        if (location.pathname.endsWith('ongoing')) {
            setRouteKey('ongoing');
        } else if (location.pathname.endsWith('joined')) {
            setRouteKey('joined');
        }else {
            setRouteKey('tournaments');
        }
    }, [location]);

    const handleTabChange = (key) => {
        setRouteKey(key);
        switch (key) {
            case 'tournaments':
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
                    key="tournaments"
                    tab={
                        <Row justify="left" align="middle">
                            <StockOutlined /> <span>Tournaments</span>
                        </Row>
                    }
                >
                    <Row gutter={[16, 16]}>
                        {visibleTournaments.length > 0 ? (
                            visibleTournaments.map((tournament, index) => (
                                <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                    <Tournaments routeKey={tournament._id} tournament={tournament} details={false} />
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
                <TabPane
                    key="joined"
                    tab={
                        <Row justify="left" align="middle">
                            <StockOutlined /> <span>Joined</span>
                        </Row>
                    }
                >
                    <Row gutter={[16, 16]}>
                        {
                            visibleJoinedRooms.length > 0 ? (
                                visibleJoinedRooms.map((tournament, index) => (
                                    <Col xs={24} sm={12} md={8} lg={12} xl={6} key={index}>
                                        <Tournaments routeKey={tournament._id} tournament={tournament} details={false} />
                                    </Col>
                                ))
                            ) : (
                            <div style={{width: '100%'}}>
                                <Empty />
                            </div>
                        )}
                    </Row>
                    <Pagination
                        hideOnSinglePage={true}
                        current={currentJoinedPage}
                        onChange={handleJoinedPageChange}
                        total={roomsJoined.length}
                        pageSize={joinedPageSize}
                    />
                </TabPane>
            </Tabs>
        </PageLayout>
    );
};

export default Home;