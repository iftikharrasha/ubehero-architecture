import React, { useState } from 'react';
import moment from "moment";

import { Row, Steps, Image, Popover, Card, Button } from 'antd';
import useTimer from '../../../hooks/useTimer';
import axios from 'axios';

const { Meta } = Card;

const TournamentStage = ({ tournament, purchased }) => {
    const { step } = useTimer(tournament.dates);
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
        
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/credentials/${tournament._id}`, config);
        
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
      

    return (
        <div className='mb-3'>
            <Card >
                <Meta
                    title={
                        "Timeline"
                    }
                    avatar={
                        <Image
                            width={150}
                            src={tournament.tournamentThumbnail}
                        />
                    }
                    description={
                        <div>
                            <Row justify="center" align="middle">
                                <Steps
                                    // percent={60}
                                    current={step - 1}
                                    size="small"
                                    items={[
                                        {
                                            title: step > 1 ? 'Registration Closed': 'Registration Open' ,
                                            description: moment(tournament.dates?.registrationStart).format('lll'),
                                            status: step > 1 ? 'finish': null,
                                        },
                                        {
                                            title: 'Lineups',
                                            description: purchased ? <Popover content={content} title="Lobby Credentials" trigger="click" open={popoverVisible && loadingCompleted} onOpenChange={setPopoverVisible}>
                                                            <Button type="dashed" size="small" loading={loadings[0]} className='mt-1' onClick={() => enterLobby(0)}>Join Lobby</Button>
                                                        </Popover> : 
                                                         moment(tournament.dates?.registrationEnd).format('lll'),
                                            status: step > 2 ? 'finish': null,
                                        },
                                        {
                                            title: 'Started',
                                            description: moment(tournament.dates?.tournamentStart).format('lll'),
                                            status: step > 3 ? 'finish': null,
                                        },
                                        {
                                            title: 'Finished',
                                            description: moment(tournament.dates?.tournamentEnd).format('lll'),
                                            status: step > 4 ? 'finish': null,
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