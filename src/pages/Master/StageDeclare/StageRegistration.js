import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../../hooks/useTournament';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "axios";
import FileUploadPopUp from "../../../components/Common/FileUploadPopUp/FileUploadPopUp";
import { Button, Divider, Result, Space } from "antd";

const StageRegistration = ({ tId, previewURL, setPreviewURL, updatedTournament, setUpdatedTournament }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const { handleTournamentDraftUpdate, errorMessage, setErrorMessage } = useTournament();

    const handleRegDateChange = (date, field) => {
        setUpdatedTournament((prevTournament) => {
            if(field === 'start'){
                return {
                    ...prevTournament,
                    dates: {
                        ...prevTournament.dates,
                        registrationStart: date.toISOString(),
                    },
                };
            }else{
                return {
                    ...prevTournament,
                    dates: {
                        ...prevTournament.dates,
                        registrationEnd: date.toISOString(),
                    },
                };
            }
        });
    };
    
    const handleTournamentDateChange = (date, field) => {
        setUpdatedTournament((prevTournament) => {
            if(field === 'start'){
                return {
                    ...prevTournament,
                    dates: {
                        ...prevTournament.dates,
                        tournamentStart: date.toISOString(),
                    },
                };
            }else{
                return {
                    ...prevTournament,
                    dates: {
                        ...prevTournament.dates,
                        tournamentEnd: date.toISOString(),
                    },
                };
            }
        });
    };
  
    const handleTournamentUpdate = (e, role, status) => {
      e.preventDefault();
      handleTournamentDraftUpdate(updatedTournament, role, status);
    };

    const [routeKey, setRouteKey] = useState('overview');
    const tabList = [
        { eventKey: 'overview', title: 'Overview' },
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


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setErrorMessage(null);
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const handleFileSelect = (event) => {
        setErrorMessage(null);
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewURL(URL.createObjectURL(file));
    };
    
    const [picProgress, setPicProgress] = useState(0);
    const handleTournamentImageUploadToS3 = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
    
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/upload/${tId}`, formData, {
                    // headers: {
                    //     "Content-Type": "multipart/form-data",
                    //     Authorization: " Bearer " + token,
                    // },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        setPicProgress(percentCompleted);
                    },
                });
                if(response.data.status === 200){
                    setPicProgress(0);
                    setSelectedFile(null)
                    setPreviewURL(response.data.data.imageUrl)
                    handleClose();
                    return setUpdatedTournament({
                        ...updatedTournament, 
                        tournamentThumbnail: response.data.data.imageUrl
                    });
                }else{
                    setPicProgress(0);
                    setSelectedFile(null)
                    setPreviewURL(updatedTournament.tournamentThumbnail)
                    setErrorMessage(response.data.error.message);
                }
            } catch (error) {
                // Handle error
                console.log(error);
            }
        }
    };

    return (
        <>
        {
            updatedTournament.status === 'active' ? 
            <>
                <h5>
                    Registration Phase
                </h5>

                <Result 
                    status="success"
                    title="Tournament is Live!"
                    subTitle="Registration phase is going on, kindly standby for phase 2"
                    extra={[
                        <Button type="primary" key="console">
                            Dashboard
                        </Button>,
                        <Button key="buy">Join Room</Button>,
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
                        <Tab eventKey="overview" title="1. Overview">
                            <h2>Overview</h2>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Tournament Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter Name" 
                                    value={updatedTournament.tournamentName}
                                    onChange={(e) =>
                                    setUpdatedTournament({
                                        ...updatedTournament,
                                        tournamentName: e.target.value,
                                    })
                                }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicGender">
                                <Form.Label>category</Form.Label>
                                <Form.Control as="select" 
                                value={updatedTournament.category} 
                                onChange={(e) =>
                                    setUpdatedTournament({
                                        ...updatedTournament, 
                                        category: e.target.value,
                                    })
                                }>
                                    <option value="">Select category</option>
                                    <option value="pubg">pubg</option>
                                    <option value="freefire">freefire</option>
                                    <option value="warzone">warzone</option>
                                    <option value="csgo">csgo</option>
                                </Form.Control>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="dates" title="2. Dates">
                            <h2>Dates</h2>
                            <Form.Group className="mb-3" controlId="formBasicDateRS">
                                <Form.Label>Registration Start Date</Form.Label>
                                <br />
                                <DatePicker
                                    selected={updatedTournament?.dates?.registrationStart && new Date(updatedTournament.dates.registrationStart)}
                                    onChange={(e) => handleRegDateChange(e, 'start')}
                                    minDate={new Date()} // prevent past dates
                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // set format
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDateRE">
                                <Form.Label>Registration End Date</Form.Label>
                                <br />
                                <DatePicker
                                    selected={updatedTournament?.dates?.registrationEnd && new Date(updatedTournament.dates.registrationEnd)}
                                    onChange={(e) => handleRegDateChange(e, 'end')}
                                    minDate={new Date()} // prevent past dates
                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // set format
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDateTS">
                                <Form.Label>Tournament Start Date</Form.Label>
                                <br />
                                <DatePicker
                                    selected={updatedTournament?.dates?.tournamentStart && new Date(updatedTournament.dates.tournamentStart)}
                                    onChange={(e) => handleTournamentDateChange(e, 'start')}
                                    minDate={new Date()} // prevent past dates
                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // set format
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDateTE">
                                <Form.Label>Tournament End Date</Form.Label>
                                <br />
                                <DatePicker
                                    selected={updatedTournament?.dates?.tournamentEnd && new Date(updatedTournament.dates.tournamentEnd)}
                                    onChange={(e) => handleTournamentDateChange(e, 'end')}
                                    minDate={new Date()} // prevent past dates
                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // set format
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                />
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="settings" title="3. Settings">
                            <h2>Settings</h2>
                            <Form.Group className="mb-3" controlId="formBasicMode">
                                <Form.Label>Game Mode</Form.Label>
                                <Form.Control as="select" value={updatedTournament?.settings?.mode} 
                                onChange={(e) =>
                                    setUpdatedTournament({
                                        ...updatedTournament, 
                                        settings: {
                                            ...updatedTournament.settings,
                                            mode: e.target.value,
                                        },
                                    })
                                }>
                                    <option value="">Select mode</option>
                                    <option value="solo">solo</option>
                                    <option value="team">team</option>
                                    <option value="open">open</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicMax">
                                <Form.Label>Max Participants</Form.Label>
                                <Form.Control as="select" 
                                value={updatedTournament?.settings?.maxParticipitant} 
                                onChange={(e) =>
                                    setUpdatedTournament({
                                        ...updatedTournament, 
                                        settings: {
                                            ...updatedTournament.settings,
                                            maxParticipitant: e.target.value,
                                        },
                                    })
                                }>
                                    <option value="">Select how many people can join</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                    <option value="16">16</option>
                                    <option value="32">32</option>
                                    <option value="52">52</option>
                                    <option value="64">64</option>
                                    <option value="128">128</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicRound">
                                <Form.Label>Game Rounds</Form.Label>
                                <Form.Control as="select" value={updatedTournament?.settings?.rounds} 
                                onChange={(e) =>
                                    setUpdatedTournament({
                                        ...updatedTournament, 
                                        settings: {
                                            ...updatedTournament.settings,
                                            rounds: e.target.value,
                                        },
                                    })
                                }>
                                    <option value="">Has rounds?</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </Form.Control>
                            </Form.Group>

                            {
                                updatedTournament?.settings?.rounds == 1 && 
                                <p>Bracket here!</p>
                            }
                        </Tab>
                        <Tab eventKey="pricing" title="4. Pricing">
                            <h2>Pricing</h2>
                            <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                                <Form.Label>Enter Joining Fee</Form.Label>
                                <Form.Control type="number" placeholder="Enter Fee" 
                                    value={updatedTournament?.settings?.joiningFee}
                                    onChange={(e) =>
                                    setUpdatedTournament({
                                        ...updatedTournament,
                                        settings: {
                                            ...updatedTournament.settings,
                                            joiningFee: e.target.value,
                                        },
                                    })
                                }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicFeeType">
                                <Form.Label>Fee Type</Form.Label>
                                <Form.Control as="select" 
                                value={updatedTournament?.settings?.feeType} 
                                onChange={(e) =>
                                    setUpdatedTournament({
                                        ...updatedTournament, 
                                        settings: {
                                            ...updatedTournament.settings,
                                            feeType: e.target.value,
                                        },
                                    })
                                }>
                                    <option value="">Select fee type</option>
                                    <option value="money">money</option>
                                    <option value="gems">gems</option>
                                    <option value="xp">xp</option>
                                </Form.Control>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="thumbnail" title="5. Thumbnail">
                            <h2>Thumbnail</h2>
                            <Form.Group className="mb-3" controlId="formBasicRound">
                                {
                                    !previewURL ? 
                                    <section className="p-4 d-flex justify-content-center align-items-center w-50 mx-auto border border-warning mb-5 rounded  file-upload file-upload-blank" onClick={handleShow}>
                                        <div className="file-upload-message text-center text-red">
                                            <i className="fas fa-cloud-upload-alt file-upload-cloud-icon"></i>
                                            <p className="file-upload-default-message">Click here to upload a file</p>
                                        </div>
                                    </section>
                                    :
                                    <section className="p-4 d-flex justify-content-center align-items-center w-50 mx-auto border border-warning file-upload file-uploaded mb-5 rounded" style={{backgroundImage: `url(${updatedTournament.tournamentThumbnail})`}} onClick={handleShow}>
                                        <div className="file-upload-message text-center">
                                            <i className="fas fa-cloud-upload-alt file-upload-cloud-icon"></i>
                                            <p className="file-upload-default-message">Click here to change thumbnail</p>
                                        </div>
                                    </section>
                                }
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="descriptions" title="6. Descriptions">
                            <h2>Rules</h2>
                            <p>This section will be avaible when rules are described!</p>
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

                
                {/* popup for user profile */}
                <FileUploadPopUp show={show} handleClose={handleClose} previewURL={previewURL} selectedFile={selectedFile} handleFileSelect={handleFileSelect} handleTournamentImageUploadToS3={handleTournamentImageUploadToS3} picProgress={picProgress} errorMessage={errorMessage}/>
            </>
        }
        </>
    );
};

export default StageRegistration;