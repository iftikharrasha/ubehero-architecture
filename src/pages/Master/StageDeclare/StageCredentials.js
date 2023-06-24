import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../../hooks/useTournament';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TournamentStage from "../../../components/Common/TournamentStage/TournamentStage";
import { Button, Divider, Space } from "antd";

const StageCredentials = ({ tId, updatedTournament, setUpdatedTournament }) => {

    const { handleTournamentDraftUpdate, errorMessage } = useTournament();
  
    const handleTournamentUpdate = (e, role, status) => {
      e.preventDefault();
      handleTournamentDraftUpdate(updatedTournament, role, status);
    };

    const [routeKey, setRouteKey] = useState('credentials');

    return (
        <>
            <h5 className='my-5 text-center'>
                Drop the credentials for <strong className='text-primary '> {updatedTournament.tournamentName}</strong>
            </h5>
                    
            <Form className="w-100 px-5">
                <Divider orientation="right">
                    <Space>
                        <Button type="primary" onClick={(e) => handleTournamentUpdate(e, 'master', 'draft')}>
                            Save Draft
                        </Button>
                        <Button type="primary" onClick={(e) => handleTournamentUpdate(e, 'master', 'pending')}>
                            Submit
                        </Button>
                    </Space>
                </Divider>
                <Tabs
                    id="controlled-tab-example"
                    className="mb-3"
                    activeKey={routeKey}
                >
                    <Tab eventKey="credentials" title="7. Credentials">
                        <h2>Credentials</h2>
                        <p>This section will be unlocked once the registrationEnds!</p>
                    </Tab>
                </Tabs>

                {
                    errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                }

                {/* <Button variant="success" type="submit" onClick={(e) => handleTournamentUpdate(e, 'master', 'pending')} className='ms-3'>
                    Submit
                </Button>
                <Button variant="primary" type="submit" onClick={(e) => handleTournamentUpdate(e, 'master', 'draft')} className='ms-3'>
                    Save Draft
                </Button> */}
            </Form>
        </>
    );
};

export default StageCredentials;