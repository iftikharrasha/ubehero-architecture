import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useLocation, useHistory  } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import { fetchTournamentDetails } from '../../redux/slices/tournamentSlice';
import { fetchLeaderboards } from '../../redux/slices/leaderboardSlice';
import { fetchBrackets } from '../../redux/slices/bracketSlice';
import Preloader from '../../components/PageLayout/Preloader';
import Prizes from '../../components/Tournaments/Prizes/Prizes';
import ChatRoom from '../../components/Tournaments/ChatRoom/ChatRoom';
import CheckoutForm from '../../components/Common/Checkout/CheckoutForm';
import CheckoutLayoutSolo from '../../components/Common/Checkout/CheckoutLayoutSolo';
import useTour from '../../hooks/useTour';
import useTimer from '../../hooks/useTimer';
import TournamentStage from '../../components/Common/TournamentStage/TournamentStage';
import Bracket from '../../components/Tournaments/Bracket/Bracket';
import axios from 'axios';
import Matches from '../../components/Tournaments/Matches/Matches';
import Results from '../../components/Tournaments/Results/Results';
import DOMPurify from 'dompurify';

import { Tabs, Row, Modal, Tour, Col, Card, Empty, message } from 'antd';
import { TrophyOutlined, MessageOutlined, CrownOutlined, PartitionOutlined, ProjectOutlined, OrderedListOutlined } from '@ant-design/icons';
import TournamentSide from '../../components/Tournaments/TournamentSide';
import useTournament from '../../hooks/useTournament';
import CheckoutLayoutTeam from '../../components/Common/Checkout/CheckoutLayoutTeam';
import LeaderboardsTeam from '../../components/Tournaments/Leaderboards/LeaderboardsTeam';
import LeaderboardsSolo from '../../components/Tournaments/Leaderboards/LeaderboardsSolo';

const { TabPane } = Tabs;

let initialSocketId = null;

const TournamentDetails = () => { 
    const { checkInTourStorage, addTourToStorage } = useTour();
    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    const purchasedItems = profile?.data?.purchasedItems;
    const userId = profile?.data?._id;
    const [routeKey, setRouteKey] = useState('leaderboards');
    const [connectedAccount, setConnectedAccount] = useState(null);
    const { handleTournamentPurchase } = useTournament();
    const [confirmCheckoutLoading, setConfirmCheckoutLoading] = useState(false);
    const { id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();

    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    const tournaments = useSelector((state) => state.tournaments.data)
    const tournamentDetails = tournaments.find(t => t._id === id);
    const versionTournament = tournamentDetails ? tournamentDetails.version : 0;

    const leaderboards = useSelector((state) => state.leaderboards.data)
    const leaderboardDetails = leaderboards[id];
    const versionLeaderboard = leaderboardDetails ? leaderboardDetails.version : 0;
    const entryType = leaderboardDetails?.entryType;
    console.log(leaderboardDetails)

    const brackets = useSelector((state) => state.brackets.data)
    const bracketDetails = brackets[id];
    const versionBracket = bracketDetails ? bracketDetails.version : 0;

    const compMode = tournamentDetails?.settings?.competitionMode;

    const teams = useSelector((state) => state.myTeams.data ? state.myTeams.data : []);
    const connectedTeam = teams.find((team) => {
        if(tournamentDetails.platforms.includes('cross')){
          const hasCommonItem = tournamentDetails.crossPlatforms.some(item => team.crossPlatforms.includes(item));
          return hasCommonItem && team.category === tournamentDetails.category;
        }else{
          return tournamentDetails.platforms.some(item => team.platforms.includes(item)) && team.category === tournamentDetails.category;
        }
    });

    const teamLeaderboards = 
    tournamentDetails?.settings?.mode === 'solo' ? [] :
    leaderboardDetails?.leaderboards?.reduce((acc, item) => {
        const members = item?.team?.members?.mates;
        const captainId = item?.team?.captainId;
        const players = [...members, captainId];
        return acc.concat(players.map(player => {
            return { gamer: player }; 
        }));
    }, []);

    useEffect(() => {
        dispatch(fetchTournamentDetails({ id, versionTournament }));
        dispatch(fetchLeaderboards({ id, versionLeaderboard }));
        if(compMode === 'knockout'){
            dispatch(fetchBrackets({ id, versionBracket }));
        }
    }, [])
    
    useEffect(() => {
        if (location.pathname.endsWith('chatroom')) {
            setRouteKey('chatroom');
        } else if (location.pathname.endsWith('prizes')) {
            setRouteKey('prizes');
        } else if (location.pathname.endsWith('result')) {
            setRouteKey('result');
        } else if (location.pathname.endsWith('checkout')) {
            setRouteKey('checkout');
        } else if (location.pathname.endsWith('bracket')) {
            setRouteKey('bracket');
        } else if (location.pathname.endsWith('matches')) {
            setRouteKey('matches');
        } else {
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
            case 'bracket':
                history.push(`/tournament/details/${id}/bracket`);
                break;
            case 'matches':
                history.push(`/tournament/details/${id}/matches`);
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

    const [method, setMethod]  = useState('');
    const handlePaymentMethod = (e, m) => {
        e.preventDefault();
        setMethod(m)
    };

    const handleCheckout = () => {
        history.push(`/tournament/details/${id}/checkout`);
        setRouteKey('checkout');
    };

    const handleOrder = async () => {
        setConfirmCheckoutLoading(true);
        if(tournamentDetails?.settings?.feeType === 'free'){
            setMethod('free');
            if(tournamentDetails?.settings?.mode === 'team'){
                const result = await handleTournamentPurchase(tournamentDetails, connectedTeam._id);
                if(result){
                    setConfirmCheckoutLoading(false);
                }
            }else{
                const result = await handleTournamentPurchase(tournamentDetails, connectedAccount._id);
                if(result){
                    setConfirmCheckoutLoading(false);
                }
            }
        }else if(tournamentDetails?.settings?.feeType === 'gems'){
            setMethod('gems');
            if(profile?.data?.stats?.totalGems > tournamentDetails?.settings?.joiningFee){
                console.log(profile?.data?.stats?.totalGems, tournamentDetails?.settings?.joiningFee)
                const result = await handleTournamentPurchase(tournamentDetails, connectedAccount._id);
                if(result){
                    setConfirmCheckoutLoading(false);
                }
            }else{
                messageApi.open({
                  type: 'warning',
                  content: 'Not enough gems in your account',
                  style: {
                    marginTop: '85vh',
                  },
                });
                setConfirmCheckoutLoading(false);
            }
        }else{
            setRouteKey('order');
            setConfirmCheckoutLoading(false);
        }
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

    const [results, setResults] = useState({});
    // console.log("results", results)

    useEffect(() => {
        const seeResults = async () => {
            try {
                let config = {};
                const token = localStorage.getItem('jwt');
                config.headers = { "Authorization": "Bearer " + token, ...config.headers };
            
                const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/result/${tournamentDetails._id}`, config);
            
                // Assuming response.data contains the results
                setResults(response.data.data);
            } catch (error) {
                // Handle the error appropriately (e.g., show error message, reset loading state)
                console.log("Error occurred while fetching results:", error);
            }
        };

        seeResults();
    }, []);

    return (
        <PageLayout>
            {contextHolder}
            <div className="tournamentDetails">
                <div className='tournamentBg'>
                    <img src={tournamentDetails.tournamentCover} alt="cover" />
                </div>
                <div className='tournamentInfo'>
                    {
                        tournamentDetails ? 
                            routeKey === 'order' ?
                                <CheckoutForm 
                                    method={method} 
                                    tournament={tournamentDetails}
                                    connectedAccount={connectedAccount}
                                />  : 
                                <Row>
                                    <Col span={5}>
                                        <TournamentSide 
                                            ref1TSummery1={ref1TSummery1}
                                            ref1TSummery2={ref1TSummery2}
                                            ref1TSummery3={ref1TSummery3}
                                            isLoggedIn={isLoggedIn}
                                            userId={userId}
                                            routeKey={routeKey}
                                            tournament={tournamentDetails} 
                                            totalJoined={leaderboardDetails?.leaderboards?.length}
                                            purchasedItems={purchasedItems}
                                            handleCancel={handleCancel}
                                            handleCheckout={handleCheckout}
                                            step={step}
                                            buttonStatus={buttonStatus}
                                            timeLeftPercent={timeLeftPercent}
                                        />
                                    </Col>
                                    <Col span={18} offset={1}>
                                        <TournamentStage 
                                            compMode={compMode}
                                            currentMatch={bracketDetails?.matches[tournamentDetails?.settings?.currentMatchId-1]}
                                            finalMatch={bracketDetails?.matches[tournamentDetails?.settings?.maxParticipitant-2]}
                                            setRouteKey={setRouteKey}
                                            tournament={tournamentDetails} 
                                            purchased={purchasedItems?.tournaments?.includes(id) ? true : false }
                                        />

                                        <Card className="tabCard">
                                            <Tabs activeKey={routeKey} onChange={handleTabChange}>
                                                <TabPane
                                                    key="leaderboards"
                                                    tab={
                                                        <Row justify="left" align="middle" ref={ref2Leaderboard}>
                                                            <ProjectOutlined  style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Leaderboards</span>
                                                        </Row>
                                                    }
                                                >
                                                    {
                                                        !leaderboardDetails ? <Preloader /> :
                                                            entryType === 'team' ?
                                                            <LeaderboardsTeam leaderboards={leaderboardDetails?.leaderboards}/> :
                                                            <LeaderboardsSolo leaderboards={leaderboardDetails?.leaderboards}/>
                                                    }
                                                </TabPane> 
                                                {
                                                    compMode === 'knockout' && 
                                                    <>
                                                    <TabPane
                                                        key="bracket"
                                                        tab={
                                                            <Row justify="left" align="middle">
                                                                <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Bracket</span>
                                                            </Row>
                                                        }
                                                    >
                                                        {
                                                            !bracketDetails ? <Preloader /> :
                                                            <Bracket matches={bracketDetails?.matches}/>
                                                        }
                                                    </TabPane>
                                                    <TabPane
                                                        key="matches"
                                                        tab={
                                                            <Row justify="left" align="middle">
                                                                <OrderedListOutlined style={{ fontSize: '16px' }} /> <span>Matches</span>
                                                            </Row>
                                                        }
                                                    >
                                                        {
                                                            !bracketDetails ? <Preloader /> :
                                                            <Matches
                                                                nowRunning={bracketDetails?.matches[tournamentDetails?.settings?.currentMatchId-1]}
                                                                finalOne={bracketDetails?.matches[tournamentDetails?.settings?.maxParticipitant-2]}
                                                                matches={bracketDetails.matches}
                                                            />
                                                        }
                                                    </TabPane>
                                                    </>
                                                }
                                                <TabPane
                                                    key="rules"
                                                    tab={
                                                        <Row justify="left" align="middle" ref={ref2Prize}>
                                                            <TrophyOutlined style={{ fontSize: '16px' }}/> <span>Rules</span>
                                                        </Row>
                                                    }
                                                >
                                                    <div className='rules' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tournamentDetails.settings.tournamentRules) }} />
                                                </TabPane>
                                                <TabPane
                                                    key="prizes"
                                                    tab={
                                                        <Row justify="left" align="middle" ref={ref2Prize}>
                                                            <TrophyOutlined style={{ fontSize: '16px' }}/> <span>Prizes</span>
                                                        </Row>
                                                    }
                                                >
                                                    <Prizes prizes={tournamentDetails.prizes}/>
                                                </TabPane>
                                                <TabPane
                                                    key="result"
                                                    tab={
                                                        <Row justify="left" align="middle">
                                                            <CrownOutlined style={{ fontSize: '16px' }}/> <span>Result</span>
                                                        </Row>
                                                    }
                                                >
                    
                                                {
                                                    results.length > 0 ? 
                                                    <Results results={results}/> : <Empty />
                                                }

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
                                                                            leaderboards={tournamentDetails?.settings?.mode === 'team' ? teamLeaderboards : leaderboardDetails?.leaderboards}
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
                                                    tournamentDetails.masterProfile._id === profile?.data?._id && 
                                                    <TabPane
                                                        key="chatroom"
                                                        tab={
                                                            <Row justify="left" align="middle">
                                                                <MessageOutlined /> <span>{`ChatRoom (${unreadCount})`}</span>
                                                            </Row>
                                                        }
                                                    >
                        
                                                        {
                                                            leaderboardDetails &&
                                                            socket ? <ChatRoom 
                                                                        socket={socket}
                                                                        isConnected={isConnected}
                                                                        tournamentDetails={tournamentDetails} 
                                                                        leaderboards={tournamentDetails?.settings?.mode === 'team' ? teamLeaderboards : leaderboardDetails?.leaderboards}
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
                                                tournamentDetails?.settings?.mode === 'solo' ?
                                                <CheckoutLayoutSolo 
                                                    item={tournamentDetails} 
                                                    handleOrder={handleOrder} 
                                                    handlePaymentMethod={handlePaymentMethod} 
                                                    method={method} 
                                                    setMethod={setMethod}
                                                    connectedAccount={connectedAccount}
                                                    setConnectedAccount={setConnectedAccount}
                                                    confirmCheckoutLoading={confirmCheckoutLoading}
                                                /> :
                                                <CheckoutLayoutTeam 
                                                    item={tournamentDetails} 
                                                    handleOrder={handleOrder} 
                                                    handlePaymentMethod={handlePaymentMethod} 
                                                    teams={teams}
                                                    connectedTeam={connectedTeam}
                                                    method={method} 
                                                    setMethod={setMethod}
                                                    confirmCheckoutLoading={confirmCheckoutLoading}
                                                />
                                            ) : null}
                                        </Card>
                                    </Col>
                                </Row>
                            : <Preloader />
                        }

                        <Modal title="Take a tour | Tournament Page" open={isModalOpen} onOk={handleTakeTour} onCancel={() => setIsModalOpen(false)}>
                            <p>New to our tournament page? Kindly take a tour to make things easy for you! See how it works.</p>
                        </Modal>

                        <Tour  open={tourOpen} onClose={() => setTourOpen(false)} steps={steps} zIndex={1001} type="primary"/>
                </div>
            </div>
        </PageLayout>
    );
};

export default TournamentDetails;