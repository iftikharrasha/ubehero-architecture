import React from 'react';
import { Row, Col, Steps, Card } from "antd";
import Form from 'react-bootstrap/Form';

const TournamentPrice = ({updatedTournament, setUpdatedTournament}) => {
    return (
        <Row gutter={[16, 16]} className="pt-3">
            <Col span={16}>
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
                        <option value="free">free</option>
                        <option value="money">money</option>
                        <option value="gems">gems</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicJoiningFee">
                    <Form.Label>Entry Fee ({updatedTournament?.settings?.feeType})</Form.Label>
                    <Form.Control type="number" placeholder="Enter Fee" 
                        value={updatedTournament?.settings?.joiningFee}
                        disabled={updatedTournament?.settings?.feeType === 'free'}
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
            </Col>
            <Col span={8}>
                <Steps
                    progressDot
                    current={1}
                    direction="vertical"
                    items={[
                        {
                        title: `Tips`,
                        description: 
                            <Card bordered>
                                <div>Joining Fee Types:</div>
                                <ul>
                                    <li><strong>free:</strong> no payment needed</li>
                                    <li><strong>gems:</strong> payment with gems</li>
                                    <li><strong>money:</strong> payment with money</li>
                                </ul>
                                <div className="mt-2">Example:</div>
                                <div>If you put the Fee Type "gems" and the Joining Fee "5", this mean players need to pay 5 gems to enter into this tournament</div>
                            </Card>,
                        },
                        {
                            title: '',
                            description: '',
                        },
                    ]}
                />
            </Col>
        </Row>
    );
};

export default TournamentPrice;