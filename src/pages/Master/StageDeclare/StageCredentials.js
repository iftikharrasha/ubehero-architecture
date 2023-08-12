import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../../hooks/useTournament';
import { Button, Divider, Modal, Result, Space } from "antd";
import { Link } from "react-router-dom";

const StageCredentials = ({ tId, compMode, currentMatch, updatedTournament }) => {
    const { handleTournamentCredential, errorMessage } = useTournament();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [credentials, setCredentials] = useState({
        roomId: compMode === 'knockout' ? currentMatch?.credentials?.roomId : updatedTournament?.credentials?.roomId,
        roomPassword: compMode === 'knockout' ? currentMatch?.credentials?.roomPassword : updatedTournament?.credentials?.roomPassword
    });

    console.log("currentMatch", credentials)

    const [modalText, setModalText] = useState('Credentials are sensitive, make sure you have valid credentials.');
    
    const showModal = () => {
      setOpen(true);
    };

    const handlePublish = () => {
        setModalText('Publishing please wait...');
        setConfirmLoading(true);
        // updatedTournament = {
        //     ...updatedTournament,
        //     credentials: credentials,
        // };

        handleTournamentCredential(tId, credentials);
        //   setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        //   }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    let content; 
    let mode = compMode === 'knockout' ? 1 : 2;
    switch (mode) {
        case 1:
            content = (
                <>
                    <h5>
                        Phase 2: <strong>Preparation Time {compMode === 'knockout' ? `| ${currentMatch?.name}` : null}</strong>
                    </h5>
        
                    {
                        currentMatch?.credentials?.roomId || currentMatch?.credentials?.roomPassword ?
                        <Result 
                            status="success"
                            title="Credentials Published!"
                            subTitle="Please make sure you are inside the game and making it fun."
                            extra={[
                                <Button type="primary" key="master">
                                    <Link to={`/master/${updatedTournament.masterProfile._id}`}>Dashboard</Link>
                                </Button>,
                                <Button key="chatroom">
                                    <Link to={`/tournament/details/change-cred`}>Change Credentials</Link>
                                </Button>,
                            ]}
                        /> :
                        <Form className="w-100 px-5 pb-4">
                            <Divider orientation="right">
                                <Space>
                                    <Button type="primary" onClick={showModal}>
                                        Publish
                                    </Button>
                                </Space>
                            </Divider>
        
                            <h6 className="mb-4">{compMode === 'knockout' ? `Drop the lobby credentials for ${currentMatch?.name}` : `Drop the lobby credentials for the match`}</h6>
        
                            <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                                <Form.Label>Room ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter Room ID" 
                                    value={currentMatch?.credentials?.roomId}
                                    onChange={(e) =>
                                        setCredentials({
                                        ...credentials,
                                        roomId: e.target.value,
                                    })
                                }/>
                            </Form.Group>
        
                            <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                                <Form.Label>Room Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter Room Password" 
                                    value={currentMatch?.credentials?.roomPassword}
                                    onChange={(e) =>
                                        setCredentials({
                                        ...credentials,
                                        roomPassword: e.target.value,
                                    })
                                }/>
                            </Form.Group>
        
                            {
                                errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                            }
        
                            <Modal
                                title="Are you sure you want to publish credentials?"
                                open={open}
                                onOk={handlePublish}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <p>{modalText}</p>
                            </Modal>
                        </Form>
                    }  
                </>
            );
        break;

        case 2:
            content = (
                <>
                    <h5>
                        Phase 2: <strong>Preparation Time {compMode === 'knockout' ? `| ${currentMatch?.name}` : null}</strong>
                    </h5>
        
                    {
                        updatedTournament?.credentials?.roomId || updatedTournament?.credentials?.roomPassword ?
                        <Result 
                            status="success"
                            title="Credentials Published!"
                            subTitle="Please make sure you are inside the game and making it fun."
                            extra={[
                                <Button type="primary" key="master">
                                    <Link to={`/master/${updatedTournament.masterProfile._id}`}>Dashboard</Link>
                                </Button>,
                                <Button key="chatroom">
                                    <Link to={`/tournament/details/change-cred`}>Change Credentials</Link>
                                </Button>,
                            ]}
                        /> :
                        <Form className="w-100 px-5 pb-4">
                            <Divider orientation="right">
                                <Space>
                                    <Button type="primary" onClick={showModal}>
                                        Publish
                                    </Button>
                                </Space>
                            </Divider>
        
                            <h6 className="mb-4">{compMode === 'knockout' ? `Drop the lobby credentials for ${currentMatch?.name}` : `Drop the lobby credentials for the match`}</h6>
        
                            <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                                <Form.Label>Room ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter Room ID" 
                                    value={updatedTournament?.credentials?.roomId}
                                    onChange={(e) =>
                                        setCredentials({
                                        ...credentials,
                                        roomId: e.target.value,
                                    })
                                }/>
                            </Form.Group>
        
                            <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                                <Form.Label>Room Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter Room Password" 
                                    value={updatedTournament?.credentials?.roomPassword}
                                    onChange={(e) =>
                                        setCredentials({
                                        ...credentials,
                                        roomPassword: e.target.value,
                                    })
                                }/>
                            </Form.Group>
        
                            {
                                errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                            }
        
                            <Modal
                                title="Are you sure you want to publish credentials?"
                                open={open}
                                onOk={handlePublish}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <p>{modalText}</p>
                            </Modal>
                        </Form>
                    }  
                </>
            );
        break;

        default:
            content = null;
    }

    return (
        content
    );
};

export default StageCredentials;