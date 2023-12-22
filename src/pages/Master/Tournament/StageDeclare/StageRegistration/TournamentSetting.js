import React from 'react';
import { Row, Col, Steps, Card } from "antd";
import Form from 'react-bootstrap/Form';

const TournamentSetting = ({updatedTournament, setUpdatedTournament}) => {
    return (
        <> 
            <Row gutter={[16, 16]} className="pt-3">
                <Col span={16}>
                    <Form.Group className="mb-3" controlId="formEntryMode">
                        <Form.Label>Entry Mode</Form.Label>
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
                            <option value="">Select entry mode</option>
                            <option value="solo">Solo</option>
                            <option value="team">Team</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCompetitionMode">
                        <Form.Label>Competition Mode</Form.Label>
                        <Form.Control as="select" value={updatedTournament?.settings?.competitionMode} 
                        onChange={(e) =>
                            setUpdatedTournament({
                                ...updatedTournament, 
                                settings: {
                                    ...updatedTournament.settings,
                                    competitionMode: e.target.value,
                                },
                            })
                        }>
                            <option value="">Select game mode</option>
                            <option value="ladder">Ladder</option>
                            <option value="knockout">Knockout</option>
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
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                            <option value="128">128</option>
                            <option value="256">256</option>
                        </Form.Control>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="formBasicRound">
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
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </Form.Control>
                    </Form.Group> */}
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
                                    <div>Entry modes:</div>
                                    <ul>
                                        <li><strong>solo:</strong> single player entry</li>
                                        <li><strong>team:</strong> team with friends entry</li>
                                    </ul>
                                    <div className="mt-2">Competition modes:</div>
                                    <ul>
                                        <li><strong>ladder:</strong> one participant moves up by taking the spot of the player above him</li>
                                        <li><strong>bracket:</strong> Sequence of battles of single-elimination between participants</li>
                                    </ul>
                                    <div className="mt-2">Maximum participants in the tournament can be 2/4/8/16/32/64/128/256</div>
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

            {
                updatedTournament?.settings?.rounds == 1 && 
                <p>This tournament will have bracket of {updatedTournament?.settings?.maxParticipitant} participants, playing {updatedTournament?.settings?.maxParticipitant - 1} single elimination matches each in round of {Math.log2(updatedTournament?.settings?.maxParticipitant)}!</p>
            } 
        </>
    );
};

export default TournamentSetting;