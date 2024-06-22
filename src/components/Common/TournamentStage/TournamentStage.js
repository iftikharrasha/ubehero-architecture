import React, { useState } from 'react';
import moment from "moment";
import axios from 'axios';
import { Row, Steps, Popover, Card, Button, Tag } from 'antd';
import { useHistory  } from 'react-router-dom';
import useTimer from '../../../hooks/useTimer';

const { Meta } = Card;

const TournamentStage = ({ compMode, currentMatch, finalMatch, setRouteKey, tournament, purchased }) => {
    const { step } = useTimer(tournament?.dates);
    const [loadings, setLoadings] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [loadingCompleted, setLoadingCompleted] = useState(false);
    const [credentials, setCredentials] = useState({});

    const content = (
        Object.keys(credentials).length > 0 ?
        <div>
          <p className='mb-0'>RoomID: {credentials.roomId}</p>
          <p className='mb-0'>Password: {credentials.roomPassword}</p>
        </div> : 
        <p className='mb-0'>Not Announced Yet!</p>
    );

    const enterLobby = async (index) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
      
        try {
            let config = {};
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers };
        
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/credentials/${tournament?._id}`, config);
        
            // Assuming response.data contains the credentials
            setCredentials(response.data.data);
            setLoadingCompleted(true);
        } catch (error) {
            // Handle the error appropriately (e.g., show error message, reset loading state)
            console.log("Error occurred while fetching credentials:", error);
            setLoadingCompleted(false);
        } finally {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }
    };

    const history = useHistory();
    const handleResult = () => {
        history.push(`/tournament/details/${tournament?._id}/result`);
        setRouteKey('result');
    };
    
    const handleBracket = () => {
        history.push(`/tournament/details/${tournament?._id}/bracket`);
        setRouteKey('bracket');
    };

    return (
        <div className='mb-4 tournamentStage'>
            <Card >
                <Meta
                    title={
                        <h4>{tournament?.tournamentName}</h4>
                    }
                    // avatar={
                    //     <Image
                    //         width={150}
                    //         src={tournament?.tournamentThumbnail}
                    //     />
                    // }
                    description={
                        <div>
                            <Row justify="center" align="middle">
                                <Steps
                                    // percent={10}
                                    current={step - 1}
                                    size="small"
                                    items={compMode === 'knockout' ? 
                                    [
                                        {
                                            title: step > 1 ? 'Registration Closed': 'Registration Open' ,
                                            description: !tournament?.dates?.registrationEnd ? 'Set the timing from Dates tab' : 
                                                        step > 1 ? `${moment(tournament?.dates?.registrationEnd).format('lll')}` : `Till ${moment(tournament?.dates?.registrationEnd).format('lll')}`,
                                            status: step > 1 ? 'finish': null,
                                        },
                                        // {
                                        //     title: step > 1 ? 'Bracket Locked' : 'Bracket Locks',
                                        //     description: step >= 2 && purchased  ? 
                                        //                 <Button type="dashed" size="small" loading={loadings[0]} className='mt-1' onClick={handleBracket}>
                                        //                     View Bracket
                                        //                 </Button> : 
                                        //                 `${moment(tournament?.dates?.registrationEnd).format('lll')}`,
                                        //     status: step > 2 ? 'finish': null,
                                        // },
                                        {
                                            title: step > 2 ? 'Preparation Ended' : 'Preparation Starts',
                                            description: !tournament?.dates?.registrationEnd ? 'Set the timing from Dates tab' : 
                                                        step < 2 ? `${moment(tournament?.dates?.registrationEnd).format('lll')}` : 
                                                        step === 2 && purchased ? 
                                                            <>
                                                                <Tag color="success" style={{marginTop: '2px'}}>Live</Tag>
                                                                <Popover content={content} title={`Lobby: ${currentMatch?.name}`} trigger="click" open={popoverVisible && loadingCompleted} onOpenChange={setPopoverVisible}>
                                                                    <Button type="dashed" size="small" loading={loadings[0]} className='mt-1' onClick={() => enterLobby(0)}>
                                                                        {tournament?.credentials?.roomId || tournament?.credentials?.roomPassword ? 'Join Lobby' : 'Announcement'}
                                                                    </Button>
                                                                </Popover>
                                                            </> : 
                                                        `${moment(tournament?.dates?.registrationEnd).format('lll')}`,
                                            status: step > 2 ? 'finish': null,
                                        },
                                        {
                                            title: currentMatch?.name,
                                            description: !tournament?.dates?.tournamentStart ? 'Set the timing from Dates tab' : 
                                                        step === 3 ? <Tag color="success" style={{marginTop: '2px'}}>Live</Tag> : `${moment(currentMatch?.startTime).format('lll')}`,
                                            status: step > 3 ? 'finish': null,
                                        },
                                        {
                                            title: tournament?.settings?.currentMatchId === tournament?.settings?.matches ? 'Battle Ends' : finalMatch?.name,
                                            description: !tournament?.dates?.tournamentEnd ? 'Set the timing from Dates tab' : 
                                                        step === 4 ? 
                                                        <Button type="dashed" size="small" className='mt-1' onClick={handleResult}>
                                                            View Result
                                                        </Button> : 
                                                        `${moment(finalMatch?.startTime).format('lll')}`,
                                            status: step === 4 ? 'finish': null,
                                        },
                                    ] : 
                                    [
                                        {
                                            title: step > 1 ? 'Registration Closed': 'Registration Open' ,
                                            description: !tournament?.dates?.registrationEnd ? 'Set the timing from Dates tab' :  
                                                        step > 1 ? `${moment(tournament?.dates?.registrationEnd).format('lll')}` : `Till ${moment(tournament?.dates?.registrationEnd).format('lll')}`,
                                            status: step > 1 ? 'finish': null,
                                        },
                                        {
                                            title: step > 2 ? 'Preparation Ended' : 'Preparation Starts',
                                            description: !tournament?.dates?.registrationEnd ? 'Set the timing from Dates tab' :  
                                                        step < 2 ? `${moment(tournament?.dates?.registrationEnd).format('lll')}` : 
                                                        step === 2 && purchased ? 
                                                        <>
                                                            <Tag color="success" style={{marginTop: '2px'}}>Live</Tag>
                                                            <Popover content={content} title="Lobby Credentials:" trigger="click" open={popoverVisible && loadingCompleted} onOpenChange={setPopoverVisible}>
                                                                <Button type="dashed" size="small" loading={loadings[0]} className='mt-1' onClick={() => enterLobby(0)}>Join Lobby</Button>
                                                            </Popover> 
                                                        </>: 
                                                        `${moment(tournament?.dates?.registrationEnd).format('lll')}`,
                                            status: step > 2 ? 'finish': null,
                                        },
                                        {
                                            title: step >= 3 ? 'Battle Started' : 'Battle Starts',
                                            description: !tournament?.dates?.tournamentStart ? 'Set the timing from Dates tab' :  
                                                        step === 3 ? <Tag color="success" style={{marginTop: '2px'}}>Live</Tag> : `${moment(tournament?.dates?.tournamentStart).format('lll')}`,
                                            status: step > 3 ? 'finish': null,
                                        },
                                        {
                                            title: step === 4 ? 'Battle Ended' : 'Battle Ends',
                                            description: !tournament?.dates?.tournamentEnd ? 'Set the timing from Dates tab' : 
                                                        step === 4 ? 
                                                        <Button type="dashed" size="small" className='mt-1' onClick={handleResult}>
                                                            View Result
                                                        </Button> : 
                                                        `${moment(tournament?.dates?.tournamentEnd).format('lll')}`,
                                            status: step === 4 ? 'finish': null,
                                        },
                                    ]}
                                />
                            </Row>
                        </div>
                    }
                />
            </Card>
        </div>
    );
};

export default TournamentStage;