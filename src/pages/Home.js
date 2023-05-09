import React, { useEffect } from 'react';
import Tournaments from '../components/Tournaments/Tournaments';
import PageLayout from '../components/PageLayout/PageLayout';
import { useSelector } from 'react-redux';
import { fetchTournaments } from '../redux/slices/tournamentSlice'
import { fetchStatics } from '../redux/slices/staticSlice'
import { useDispatch } from 'react-redux';
import Landing from '../components/Landing/Landing';
import Preloader from '../components/PageLayout/Preloader';

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

    return (
        <PageLayout>
            {
                landing ? <Landing landing={landing}/> : null
            }
            
            <div className="row">
            {
                tournaments ? 
                    tournaments.map((tournament, index) => (
                        <div className=" col-lg-4 col-sm-6" key={index}>
                            <Tournaments routeKey={tournament._id} tournament={tournament} details={false}/>
                        </div>
                    )) : <Preloader />
            }
            </div>
        </PageLayout>
    );
};

export default Home;