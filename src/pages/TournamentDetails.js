import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PageLayout from '../components/PageLayout/PageLayout';
import Tournaments from '../components/Tournaments/Tournaments';
import Leaderboard from '../components/Tournaments/Leaderboards/Leaderboards';
import { fetchTournamentDetails } from '../redux/slices/tournamentSlice'
import { fetchLeaderboards } from '../redux/slices/leaderboardSlice';
import Preloader from '../components/PageLayout/Preloader';
import Prizes from '../components/Tournaments/Prizes/Prizes';
import ChatRoom from '../components/Tournaments/ChatRoom/ChatRoom';
import { fetchChatRoom } from '../redux/slices/chatRoomSlice';
import { useLocation, useHistory  } from 'react-router-dom';
import Checkout from '../components/Tournaments/Checkout/Checkout';
import CheckoutForm from '../components/Tournaments/Checkout/CheckoutForm';
import CheckoutLayout from '../components/Common/Checkout/CheckoutLayout';

const TournamentDetails = () => { 
    const isLoggedIn = useSelector(state => state.profile.signed_in);
    const [routeKey, setRouteKey] = useState('leaderboards');
    const { id } = useParams();

    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname.endsWith('chatroom')) {
            setRouteKey('chatroom');
        } else if (location.pathname.endsWith('prizes')) {
            setRouteKey('prizes');
        } else if (location.pathname.endsWith('checkout')) {
            setRouteKey('checkout');
        }else {
            setRouteKey('leaderboards');
        }
    }, [location]);

    useEffect(() => {
        dispatch(fetchTournamentDetails({ id, versionTournament }));
        dispatch(fetchLeaderboards({ id, versionLeaderboard }));
    }, [])

    useEffect(() => {
        if(routeKey === 'chatroom'){
            dispatch(fetchChatRoom({ id, versionChatroom }));
        }
    }, [routeKey])

    const tournaments = useSelector((state) => state.tournaments.data)
    const tournamentDetails = tournaments.find(t => t._id === id);
    const versionTournament = tournamentDetails ? tournamentDetails.version : 0;

    const leaderboards = useSelector((state) => state.leaderboards.data)
    const leaderboardDetails = leaderboards[id];
    const versionLeaderboard = leaderboardDetails ? leaderboardDetails.version : 0;
    
    const chatroom = useSelector((state) => state.chatroom.data)
    const chatroomDetails = chatroom[id];
    const versionChatroom = chatroomDetails ? chatroomDetails.version : 0;
    
    // console.log('1. versionChatroomC:', versionChatroom);

    const [method, setMethod]  = useState('');
    const handlePaymentMethod = (e, m) => {
        e.preventDefault();
        setMethod(m)
    };

    const handleCheckout = () => {
        history.push(`/tournament/details/${id}/checkout`);
        setRouteKey('checkout');
    };

    const handleOrder = () => {
        // history.push(`/tournament/details/${id}/order`);
        setRouteKey('order');
    };

    const handleCancel = () => {
        history.goBack()
    };

    return (
        <PageLayout>
            {
                tournamentDetails && leaderboardDetails ? 
                <>
                    {routeKey === 'order' ? null :
                    <>
                        <div className='card d-flex mb-3 p-3' 
                            style={{position: 'relative'}}
                        >
                            <div className='row'>
                            <div className='col-md-3'>
                                <img className="img-fluid" src={tournamentDetails.tournamentThumbnail} alt='thumb' />
                            </div>
                            <div className='col-md-9'>
                                <div className='card-body'>
                                <h5 className='card-title'>{tournamentDetails.tournamentName} | Registration Ends: {tournamentDetails.dates.registrationEnd}</h5>
                                <h6 className='mb-3'>Category: {tournamentDetails.gameType} | Mode: {tournamentDetails.settings.mode} | version: {tournamentDetails.version}</h6>
                                {
                                    !isLoggedIn ? <Link to={`/login`}><button>Join Now</button></Link> :
                                    tournamentDetails.purchased ? <Link to={`/tournament/details/${tournamentDetails._id}`}><button>Purchased</button></Link> :
                                                routeKey === 'checkout' ? <button to={`/`} className="btn btn-success" onClick={handleCancel}>Cancel</button> 
                                                : <button to={`/tournament/details/${tournamentDetails._id}/checkout`} className="btn btn-success" onClick={handleCheckout}>Join Now</button> 
                                }
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* this is the default tab view of the page */}
                        <Tabs
                            id="controlled-tab-example"
                            className="mb-3"
                            activeKey={routeKey}
                            onSelect={(k) => {
                                setRouteKey(k);
                                switch (k) {
                                    case 'leaderboards':
                                        history.push(`/tournament/details/${id}`);
                                        break;
                                    case 'prizes':
                                        history.push(`/tournament/details/${id}/prizes`);
                                        break;
                                    case 'chatroom':
                                        history.push(`/tournament/details/${id}/chatroom`);
                                        break;
                                    default:
                                        break;
                                }
                            }}
                        >
                            <Tab eventKey="leaderboards" title="Leaderboards">
                                <Leaderboard leaderboards={leaderboardDetails}/>
                            </Tab>
                            <Tab eventKey="prizes" title="Prizes">
                                <Prizes prizes={tournamentDetails.prizes}/>
                            </Tab>
                            <Tab eventKey="chatroom" title="Chatroom">

                                {
                                    chatroomDetails ? <ChatRoom 
                                                            tournamentDetails={tournamentDetails} 
                                                            leaderboardDetails={leaderboardDetails} 
                                                            chatroomDetails={chatroomDetails}
                                                        />
                                    : <Preloader/>
                                }
                                
                            </Tab>
                        </Tabs>
                    </>
                    }
                    

                    {/* this is the tab for checkout when clicked the checkout button */}
                    {routeKey === 'checkout' ? (
                        <CheckoutLayout 
                            remark='reg'
                            routeKey={routeKey} 
                            item={tournamentDetails} 
                            handleOrder={handleOrder} 
                            handlePaymentMethod={handlePaymentMethod} 
                            method={method} 
                            setMethod={setMethod}
                        />
                    ) : null}

                    {/* this is the order form to checkout when clicked the final checkout button */}
                    {routeKey === 'order' ? (
                        <CheckoutForm 
                            method={method} 
                            tournament={tournamentDetails}
                        />
                    ) : null}
                </>
                : <Preloader />
            }
        </PageLayout>
    );
};

export default TournamentDetails;