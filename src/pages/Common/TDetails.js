import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useLocation, useHistory  } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import Leaderboard from '../../components/Tournaments/Leaderboards/Leaderboards';
import { fetchTournamentDetails } from '../../redux/slices/tournamentSlice'
import { fetchLeaderboards } from '../../redux/slices/leaderboardSlice';
import Preloader from '../../components/PageLayout/Preloader';
import Prizes from '../../components/Tournaments/Prizes/Prizes';
import ChatRoom from '../../components/Tournaments/ChatRoom/ChatRoom';
import CheckoutForm from '../../components/Tournaments/Checkout/CheckoutForm';
import CheckoutLayout from '../../components/Common/Checkout/CheckoutLayout';

import { Tabs, Row, Modal, Tour, Col } from 'antd';
import { StockOutlined, TrophyOutlined, MessageOutlined } from '@ant-design/icons';

import TournamentSide from '../../components/Tournaments/TournamentSide';
import useTour from '../../hooks/useTour';
import useTimer from '../../hooks/useTimer';
import TournamentStage from '../../components/Common/TournamentStage/TournamentStage';
import useAuth from '../../hooks/useAuth';

const { TabPane } = Tabs;

let initialSocketId = null;

const TournamentDetails = () => { 
    const { checkInTourStorage, addTourToStorage } = useTour();
    const { loggedInUser } = useAuth();
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
        } else if (location.pathname.endsWith('result')) {
            setRouteKey('result');
        } else if (location.pathname.endsWith('checkout')) {
            setRouteKey('checkout');
        }else {
            setRouteKey('leaderboards');
        }
    }, [location]);

    const handleTabChange = (key) => {
        setRouteKey(key);
        setUnreadCount(0);
        switch (key) {
            case 'leaderboards':
                history.push(`/tournament/details/${id}`);
                break;
            case 'prizes':
                history.push(`/tournament/details/${id}/prizes`);
                break;
            case 'result':
                history.push(`/tournament/details/${id}/result`);
                break;
            case 'chatroom':
                history.push(`/tournament/details/${id}/chatroom`);
                break;
            default:
                break;
        }
    };

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

    const [loadings, setLoadings] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [loadingCompleted, setLoadingCompleted] = useState(false);

    const content = (
        <div>
          <p className='mb-0'>RoomID: 12213sdasd</p>
          <p className='mb-0'>Password: fdasd#Q4</p>
        </div>
    );

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
      
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
          });
          setLoadingCompleted(true); // Set loading completion flag after 6 seconds
        }, 3000);
    };

    //To reset the loading state and hide the popover when clicking outside
    // const handleContainerClick = () => {
    //     setPopoverVisible(false); // Hide the popover
    //     setLoadings([]); // Reset the loading state
    //     setLoadingCompleted(false); // Reset the loading completion flag
    // };

    /* this is to handler the modal of tour */
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const alreadyToured = checkInTourStorage('tournamentTour')
        if(!alreadyToured){
            setIsModalOpen(true);
        }
    }, [])
    
    const handleTakeTour = () => {
        addTourToStorage('tournamentTour')
        setIsModalOpen(false);
        setTourOpen(true)
    };
    /* */

    /* this is to handler the site tour */
    const ref1TSummery1 = useRef(null);
    const ref1TSummery2 = useRef(null);
    const ref1TSummery3 = useRef(null);
    const ref2Leaderboard = useRef(null);
    const ref2Prize = useRef(null);
    const ref3Timeline = useRef(null);
    const ref4Credentials = useRef(null);
    const [tourOpen, setTourOpen] = useState(false);
    
    const steps = [
        {
          title: 'Summery card',
          description: 'ref1TSummery1.',
          target: () => ref1TSummery1.current,
        },
        {
          title: 'Time Left.',
          description: 'ref1TSummery2',
          target: () => ref1TSummery2.current,
        },
        {
          title: 'Join Now.',
          description: 'ref1TSummery3',
          target: () => ref1TSummery3.current,
        },
        {
          title: 'Leaderboard',
          description: 'ref2Leaderboard',
          target: () => ref2Leaderboard.current,
        },
        {
          title: 'Prize',
          description: 'ref2Prize',
          target: () => ref2Prize.current,
        },
        {
          title: 'Tournament Timeline.',
          description: 'ref3Timeline',
          target: () => ref3Timeline.current,
        },
        {
          title: 'Get Credentials.',
          description: 'ref4Credentials',
          target: () => ref4Credentials.current,
        },
        {
          title: 'Completed! Enjoy The Game',
          description: 'DONE',
        },
    ];
    /* */

    const { step, buttonStatus, timeLeftPercent } = useTimer(tournamentDetails.dates);

    return (
        <PageLayout>

            {
                tournamentDetails && leaderboardDetails ? 
                    routeKey === 'order' ?
                        <CheckoutForm 
                            method={method} 
                            tournament={tournamentDetails}
                        />  : 
                        <Row>
                            <Col span={4}>
                                <TournamentSide 
                                    ref1TSummery1={ref1TSummery1}
                                    ref1TSummery2={ref1TSummery2}
                                    ref1TSummery3={ref1TSummery3}
                                    isLoggedIn={isLoggedIn}
                                    routeKey={routeKey}
                                    tournament={tournamentDetails} 
                                    purchasedItems={purchasedItems}
                                    handleCancel={handleCancel}
                                    handleCheckout={handleCheckout}
                                    step={step}
                                    buttonStatus={buttonStatus}
                                    timeLeftPercent={timeLeftPercent}
                                />
                            </Col>
                            <Col span={19} offset={1}>
                                <TournamentStage 
                                    setRouteKey={setRouteKey}
                                    tournament={tournamentDetails} 
                                    purchased={purchasedItems?.tournaments?.includes(id) ? true : false }
                                />

                                <Tabs activeKey={routeKey} onChange={handleTabChange}>
                                    <TabPane
                                        key="leaderboards"
                                        tab={
                                            <Row justify="left" align="middle" ref={ref2Leaderboard}>
                                                <StockOutlined /> <span>Leaderboards</span>
                                            </Row>
                                        }
                                    >
                                        <Leaderboard leaderboards={leaderboardDetails.leaderboards}/>
                                    </TabPane>
                                    <TabPane
                                        key="prizes"
                                        tab={
                                            <Row justify="left" align="middle" ref={ref2Prize}>
                                                <TrophyOutlined /> <span>Prizes</span>
                                            </Row>
                                        }
                                    >
                                        <Prizes prizes={tournamentDetails.prizes}/>
                                    </TabPane>
                                    <TabPane
                                        key="result"
                                        tab={
                                            <Row justify="left" align="middle">
                                                <TrophyOutlined /> <span>Result</span>
                                            </Row>
                                        }
                                    >
                                        <h4>Master hasn't published the result yet!</h4>
                                    </TabPane>
                                    {
                                        purchasedItems?.tournaments?.includes(tournamentDetails._id) && (
                                            <TabPane
                                                key="chatroom"
                                                tab={
                                                    <Row justify="left" align="middle">
                                                        <MessageOutlined /> <span>{`ChatRoom (${unreadCount})`}</span>
                                                    </Row>
                                                }
                                            >
                
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
                                                
                                            </TabPane>
                                        )
                                    }

                                    {
                                        tournamentDetails.masterProfile._id === loggedInUser.id && 
                                        <TabPane
                                            key="chatroom"
                                            tab={
                                                <Row justify="left" align="middle">
                                                    <MessageOutlined /> <span>{`ChatRoom (${unreadCount})`}</span>
                                                </Row>
                                            }
                                        >
            
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
                                            
                                        </TabPane>
                                    }
                                </Tabs>
                                
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
                            </Col>
                        </Row>
                    : <Preloader />
                }

                <Modal title="Take a tour | Tournament Page" open={isModalOpen} onOk={handleTakeTour} onCancel={() => setIsModalOpen(false)}>
                    <p>New to our tournament page? Kindly take a tour to make things easy for you! See how it works.</p>
                </Modal>

                <Tour  open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} zIndex={1001} type="primary"/>
        </PageLayout>
    );
};

export default TournamentDetails;