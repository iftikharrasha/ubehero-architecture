import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Empty, Spin } from 'antd';
import useProfile from '../../hooks/useProfile';
import Tournaments from '../Tournaments/Tournaments';

const PartyEvents = ({party}) => {
    const { _id } = party;
    const [partyEvents, setPartyEvents] = useState(null);
    const { handlePartyEventListHook } = useProfile();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const requests = await handlePartyEventListHook(_id);
            setPartyEvents(requests);
          } catch (error) {
            setPartyEvents([]);
            console.error('Error fetching friend list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    return (
        <div>
            <Row gutter={[6, 6]}>
                {
                    !partyEvents ? <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '30vh' }}><Spin /></div> :
                    partyEvents?.length > 0 ? (
                        partyEvents?.map((tournament, index) => (
                            <Col xs={24} sm={12} md={8} lg={12} xl={8} key={index}>
                                <Tournaments routeKey={tournament._id} tournament={tournament} details={false} totalJoined={tournament?.leaderboards?.length}/>
                            </Col>
                        ))
                        ) : (
                        <div style={{width: '100%'}}>
                            <Empty />
                        </div>
                )}
            </Row>
        </div>
    );
};

export default PartyEvents;