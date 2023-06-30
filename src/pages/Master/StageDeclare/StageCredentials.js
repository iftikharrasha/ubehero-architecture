import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../../hooks/useTournament';
import { Button, Divider, Modal, Result, Space } from "antd";

const StageCredentials = ({ tId, updatedTournament, setUpdatedTournament }) => {
    const { handleTournamentCredential, errorMessage } = useTournament();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Credentials are sensitive, make sure you have valid credentials.');
    
    const showModal = () => {
      setOpen(true);
    };

    const handlePublish = () => {
        setModalText('Publishing please wait...');
        setConfirmLoading(true);
        handleTournamentCredential(updatedTournament);
        //   setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        //   }, 2000);
        };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <h5>
                Phase 2: Drop the credentials for <strong> {updatedTournament.tournamentName}</strong>
            </h5>

            {
                updatedTournament?.credentials?.roomId || updatedTournament?.credentials?.roomPassword ?
                <Result 
                    status="success"
                    title="Credentials Published!"
                    subTitle="Please make sure you are inside the game and making it fun."
                    extra={[
                        <Button type="primary" key="console">
                            Dashboard
                        </Button>,
                        <Button key="buy">Change Credentials</Button>,
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
                    <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                        <Form.Label>Room ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter Room ID" 
                            value={updatedTournament?.credentials?.roomId}
                            onChange={(e) =>
                            setUpdatedTournament({
                                ...updatedTournament,
                                credentials: {
                                    ...updatedTournament.credentials,
                                    roomId: e.target.value,
                                },
                            })
                        }/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                        <Form.Label>Room Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter Room Password" 
                            value={updatedTournament?.credentials?.roomPassword}
                            onChange={(e) =>
                            setUpdatedTournament({
                                ...updatedTournament,
                                credentials: {
                                    ...updatedTournament.credentials,
                                    roomPassword: e.target.value,
                                },
                            })
                        }/>
                    </Form.Group>

                    {
                        errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                    }

                    {/* <Button variant="success" type="submit" onClick={(e) => handleTournamentUpdate(e, 'master', 'pending')} className='ms-3'>
                        Submit
                    </Button> */}

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
};

export default StageCredentials;