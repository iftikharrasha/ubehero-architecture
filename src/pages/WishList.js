import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import Tournaments from '../components/Tournaments/Tournaments';

const WishList = () => {
    const wish = useSelector((state) => state.tournaments.wishList);

    return (
        <PageLayout>
            {
                wish.length === 0 && (
                    <p>Looks like you do not have any item selected! Check them out in the home page to <Link to="/">discover more</Link>.</p>
                )
            }
             
            {
                wish.map((tournament) => (<Tournaments routeKey={tournament._id} tournament={tournament} />))
            }
        </PageLayout>
    );
};

export default WishList;