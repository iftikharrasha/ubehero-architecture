import React, { useEffect, useState } from 'react';
import Tournaments from '../../components/Tournaments/Tournaments';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useSelector } from 'react-redux';
import { fetchTournaments } from '../../redux/slices/tournamentSlice'
import { fetchStatics } from '../../redux/slices/staticSlice'
import { useDispatch } from 'react-redux';
import Landing from '../../components/Landing/Landing';
import Preloader from '../../components/PageLayout/Preloader';

import { Pagination } from 'antd';

const Home = () => {
    const dispatch = useDispatch();
    const versionTournaments = useSelector(state => state.tournaments.version);
    const versionLanding = useSelector(state => state.statics.version);
    const country = useSelector(state => state.statics.country);

    useEffect(() => {
        dispatch(fetchStatics({ versionLanding, country }));
    }, [country])

    useEffect(() => {
        dispatch(fetchTournaments({versionTournaments}));
    }, [])

    const landing = useSelector((state) => state.statics.landing)
    const tournaments = useSelector((state) => state.tournaments.data)

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

     // Pagination configuration
    const pageSize = 4; // Number of tournaments to show per page
    const totalTournaments = tournaments ? tournaments.length : 0;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleTournaments = tournaments ? tournaments.slice(startIndex, endIndex) : [];

    return (
        <PageLayout>
            {landing && <Landing landing={landing} />}

            <div className="row">
                {visibleTournaments.length > 0 ? (
                    visibleTournaments.map((tournament, index) => (
                        <div className="col-lg-3 col-sm-6" key={index}>
                            <Tournaments routeKey={tournament._id} tournament={tournament} details={false} />
                        </div>
                    ))
                    ) : (
                    <Preloader />
                )}
            </div>

            <div className="pagination-container">
                <Pagination current={currentPage} onChange={handlePageChange} total={totalTournaments} pageSize={pageSize} />
            </div>
        </PageLayout>
    );
};

export default Home;