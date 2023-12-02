import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../../../hooks/useTournament';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button, Divider, Result, Space } from "antd";
import { Link } from "react-router-dom";
import TournamentBasic from "./TournamentBasic";
import TournamentDate from "./TournamentDate";
import TournamentSetting from "./TournamentSetting";
import TournamentPrice from "./TournamentPrice";
import TournamentThumb from "./TournamentThumb";
import TournamentRule from "./TournamentRule";

const StageRegistration = ({ tId, previewURL, setPreviewURL, updatedTournament, setUpdatedTournament }) => {
    console.log(updatedTournament);

    const { handleTournamentDraftUpdate, errorMessage, setErrorMessage } = useTournament();
  
    const handleTournamentUpdate = (e, role, status) => {
      e.preventDefault();
      handleTournamentDraftUpdate(updatedTournament, role, status);
    };

    const [routeKey, setRouteKey] = useState('basic');
    const tabList = [
        { eventKey: 'basic', title: 'Basic' },
        { eventKey: 'dates', title: 'Dates' },
        { eventKey: 'settings', title: 'Settings' },
        { eventKey: 'pricing', title: 'Pricing' },
        { eventKey: 'thumbnail', title: 'Thumbnail' },
        { eventKey: 'descriptions', title: 'Descriptions' },
        // { eventKey: 'credentials', title: 'Credentials' },
        // { eventKey: 'result', title: 'Result' },
        // { eventKey: 'prize', title: 'Prize' },
    ];

    const handlePrev = () => {
        // Get the index of the current active tab
        const currentIndex = tabList.findIndex((tab) => tab.eventKey === routeKey);
        // Get the index of the previous tab
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        // Set the active tab key to the previous tab
        setRouteKey(tabList[prevIndex].eventKey);
    };

    const handleNext = () => {
        // Get the index of the current active tab
        const currentIndex = tabList.findIndex((tab) => tab.eventKey === routeKey);
        // Get the index of the next tab
        const nextIndex = currentIndex < tabList.length - 1 ? currentIndex + 1 : currentIndex;
        // Set the active tab key to the next tab
        setRouteKey(tabList[nextIndex].eventKey);
    };

    return (
        <>
        {
            updatedTournament.status === 'active' ? 
            <>
                <h5>
                    Phase 1: <strong>Registration Time</strong>
                </h5>

                <Result 
                    status="success"
                    title="Tournament is Live!"
                    subTitle="Registration phase is going on, kindly standby for phase 2"
                    extra={[
                        <Button type="primary" key="master">
                            <Link to={`/master/${updatedTournament.masterProfile._id}`}>Dashboard</Link>
                        </Button>,
                        <Button key="chatroom">
                            <Link to={`/tournament/details/${updatedTournament._id}/chatroom`}>Join Room</Link>
                        </Button>,
                    ]}
                />
            </> :
            <>
                <h5>
                    Phase 1: Finish the draft for<strong> {updatedTournament.tournamentName}</strong>
                </h5>
                        
                <Form className="w-100 px-5 pb-4">
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
                        // onSelect={(k) => {
                        //     setRouteKey(k);
                        // }}
                        // onSelect={(k) => {
                        //     setRouteKey(k);
                        //     switch (k) {
                        //         case 'mystats':
                        //             history.push(`/profile/${id}`);
                        //             break;
                        //         case 'settings':
                        //             history.push(`/profile/${id}/settings`);
                        //             break;
                        //         default:
                        //             break;
                        //     }
                        // }}
                    >
                        <Tab eventKey="basic" title="1. Basic">
                            <h2>Basic</h2>

                            <TournamentBasic 
                                updatedTournament={updatedTournament} 
                                setUpdatedTournament={setUpdatedTournament}
                            />
                        </Tab>
                        <Tab eventKey="dates" title="2. Dates">
                            <h2>Dates</h2>

                            <TournamentDate
                                updatedTournament={updatedTournament} 
                                setUpdatedTournament={setUpdatedTournament}
                            />
                        </Tab>
                        <Tab eventKey="settings" title="3. Settings">
                            <h2>Settings</h2>

                            <TournamentSetting
                                updatedTournament={updatedTournament} 
                                setUpdatedTournament={setUpdatedTournament}
                            />
                        </Tab>
                        <Tab eventKey="pricing" title="4. Pricing">
                            <h2>Pricing</h2>

                            <TournamentPrice
                                updatedTournament={updatedTournament} 
                                setUpdatedTournament={setUpdatedTournament}
                            />
                        </Tab>
                        <Tab eventKey="thumbnail" title="5. Thumbnail">
                            <h2>Thumbnail</h2>
                            
                            <TournamentThumb 
                                tId={tId} 
                                updatedTournament={updatedTournament} 
                                setUpdatedTournament={setUpdatedTournament} 
                                previewURL={previewURL} 
                                setPreviewURL={setPreviewURL} 
                                errorMessage={errorMessage} 
                                setErrorMessage={setErrorMessage}
                            />
                        </Tab>
                        <Tab eventKey="descriptions" title="6. Rules">
                            <h2>Rules</h2>

                            <TournamentRule
                                updatedTournament={updatedTournament} 
                                setUpdatedTournament={setUpdatedTournament}
                            />
                        </Tab>
                    </Tabs>

                    {
                        errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                    }

                    <Space>
                        <Button onClick={handlePrev}>
                            Prev
                        </Button>
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                    </Space>
                    {/* <Button variant="success" type="submit" onClick={(e) => handleTournamentUpdate(e, 'master', 'pending')} className='ms-3'>
                        Submit
                    </Button>
                    <Button variant="primary" type="submit" onClick={(e) => handleTournamentUpdate(e, 'master', 'draft')} className='ms-3'>
                        Save Draft
                    </Button> */}
                </Form>
            </>
        }
        </>
    );
};

export default StageRegistration;