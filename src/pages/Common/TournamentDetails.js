import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PageLayout from '../../components/PageLayout/PageLayout';
import Leaderboard from '../../components/Tournaments/Leaderboards/Leaderboards';
import { fetchTournamentDetails } from '../../redux/slices/tournamentSlice'
import { fetchLeaderboards } from '../../redux/slices/leaderboardSlice';
import Preloader from '../../components/PageLayout/Preloader';
import Prizes from '../../components/Tournaments/Prizes/Prizes';
import ChatRoom from '../../components/Tournaments/ChatRoom/ChatRoom';
import { useLocation, useHistory  } from 'react-router-dom';
import CheckoutForm from '../../components/Tournaments/Checkout/CheckoutForm';
import io from 'socket.io-client';
import CheckoutLayout from '../../components/Common/Checkout/CheckoutLayout';

let initialSocketId = null;

const TournamentDetails = () => { 
    const isLoggedIn = useSelector(state => state.profile.signed_in);
    const purchasedItems = useSelector(state => state.profile?.data?.purchasedItems);
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

    const tournaments = useSelector((state) => state.tournaments.data)
    const tournamentDetails = tournaments.find(t => t._id === id);
    const versionTournament = tournamentDetails ? tournamentDetails.version : 0;

    const leaderboards = useSelector((state) => state.leaderboards.data)
    const leaderboardDetails = leaderboards[id];
    const versionLeaderboard = leaderboardDetails ? leaderboardDetails.version : 0;

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
        setRouteKey('order');
    };

    const handleCancel = () => {
        history.goBack()
    };

    //socket implementation
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
  
    useEffect(() => {
      const chatRoomSocket = io.connect(`${process.env.REACT_APP_API_LINK}/chatRoom`, {
        transports: ['websocket'],
        cors: {
          origin: `${process.env.REACT_APP_CLIENT_ORIGIN}`,
          methods: ['GET', 'POST'],
        },
      });
  
      setSocket(chatRoomSocket);
  
      // Listen for pong event
      chatRoomSocket.on("pong", (receivedDate, pingReceivedAt, pongSocketId) => {

        const createdAt = new Date().getTime();
        const latency = createdAt - receivedDate;
        console.log(`Received pong of ${chatRoomSocket.id} at ${pingReceivedAt} with latency ${latency}ms`);

        if(!initialSocketId){
            console.log("pongSocketId, initialSocketId", pongSocketId, initialSocketId)
            initialSocketId = pongSocketId;
        }

        // Compare the socketId with the initial socketId to see if the socket is still connected
        if(initialSocketId){
            if (pongSocketId !== initialSocketId) {
                initialSocketId = null;
                console.log('Socket disconnected for inactivity!');
                setIsConnected(false);

                chatRoomSocket.emit("leave_room", { createdAt });
            }
        }
      });

      // Listen for disconnect event
      chatRoomSocket.on('disconnect', () => {
        initialSocketId = null;
        console.log('Socket disconnected with disconnect event');
        setIsConnected(false);
      });
  
      // Disconnect socket on unmount
      return () => {
        chatRoomSocket.disconnect();
      };
    }, []);
  
    useEffect(() => {
      let interval;
      if (socket) {
        interval = setInterval(() => {
          socket.emit("ping");
        }, 15000);
        setIsConnected(true);
      }
    
      return () => clearInterval(interval);
    }, [socket]);

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
                                <h6 className='mb-3'>Category: {tournamentDetails.gameType} | Mode: {tournamentDetails.settings.mode} | Version: {tournamentDetails.version} | Joined: {tournamentDetails.leaderboards.length}</h6>
                                {
                                    !isLoggedIn ? <Link to={`/login`}><button>Join Now</button></Link> :
                                    purchasedItems.tournaments?.includes(tournamentDetails._id) ? <Link to={`/tournament/details/${tournamentDetails._id}`}><button>Purchased</button></Link> :
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
                                setUnreadCount(0);
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
                                <Leaderboard leaderboards={leaderboardDetails.leaderboards}/>
                            </Tab>
                            <Tab eventKey="prizes" title="Prizes">
                                <Prizes prizes={tournamentDetails.prizes}/>
                            </Tab>
                            {
                                purchasedItems?.tournaments?.includes(tournamentDetails._id) && (
                                    <Tab eventKey="chatroom" title={`ChatRoom (${unreadCount})`}>
        
                                        {
                                            socket ? <ChatRoom 
                                                        socket={socket}
                                                        isConnected={isConnected}
                                                        tournamentDetails={tournamentDetails} 
                                                        leaderboards={leaderboardDetails.leaderboards}
                                                        routeKey={routeKey}
                                                        unreadCount={unreadCount}
                                                        setUnreadCount={setUnreadCount}
                                                    />
                                            : <Preloader/>
                                        }
                                        
                                    </Tab>
                                )
                            }
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