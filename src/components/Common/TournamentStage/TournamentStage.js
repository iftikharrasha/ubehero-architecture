import React, { useState } from 'react';
import moment from "moment";

import { Row, Steps, Image, Popover, Card, Button } from 'antd';
import useTimer from '../../../hooks/useTimer';

const { Meta } = Card;

const TournamentStage = ({ tournament }) => {
    const { step } = useTimer(tournament.dates);
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

    return (
        <div className='mb-3'>
            <Card >
                <Meta
                    title={
                        tournament.tournamentName
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
                                    current={step}
                                    size="small"
                                    items={[
                                        {
                                            title: step > 0 ? 'Registration Closed': 'Registration Open' ,
                                            description: moment(tournament.dates?.registrationStart).format('lll'),
                                            status: step > 0 ? 'finish': null,
                                        },
                                        {
                                            title: 'Lineups',
                                            description: <Popover content={content} title="Lobby Credentials" trigger="click" open={popoverVisible && loadingCompleted} onOpenChange={setPopoverVisible}>
                                                            <Button type="dashed" size="small" loading={loadings[0]} className='mt-1' onClick={() => enterLoading(0)}>Get Credentials</Button>
                                                        </Popover>,
                                            status: step > 1 ? 'finish': null,
                                        },
                                        {
                                            title: 'Started',
                                            description: moment(tournament.dates?.tournamentStart).format('lll'),
                                            status: step > 2 ? 'finish': null,
                                        },
                                        {
                                            title: 'Finished',
                                            description: moment(tournament.dates?.tournamentEnd).format('lll'),
                                            status: step > 3 ? 'finish': null,
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