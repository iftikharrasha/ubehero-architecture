import React from 'react';
import { Row, Col, Steps, Card, Checkbox } from "antd";
import Form from 'react-bootstrap/Form';

const CheckboxGroup = Checkbox.Group;

const TournamentBasic = ({updatedTournament, setUpdatedTournament}) => {
    const platformOptions = [
        { label: 'PSN', value: 'psn', disabled: updatedTournament.platforms.includes('mobile') || updatedTournament.platforms.includes('nintendo') },
        { label: 'XBOX', value: 'xbox', disabled: updatedTournament.platforms.includes('mobile') || updatedTournament.platforms.includes('nintendo') },
        { label: 'PC', value: 'pc', disabled: updatedTournament.platforms.includes('mobile') || updatedTournament.platforms.includes('nintendo') },
        { label: 'Mobile', value: 'mobile', disabled: updatedTournament.platforms.includes('psn') || updatedTournament.platforms.includes('xbox') || updatedTournament.platforms.includes('pc') || updatedTournament.platforms.includes('nintendo') },
        { label: 'Nintendo', value: 'nintendo', disabled: updatedTournament.platforms.includes('psn') || updatedTournament.platforms.includes('xbox') || updatedTournament.platforms.includes('pc') || updatedTournament.platforms.includes('mobile') },
    ];

    const onChange = (checkedValues) => {
        setUpdatedTournament({
          ...updatedTournament,
          platforms: checkedValues,
        });
    };

    return (
        <Row gutter={[16, 16]} className="pt-3">
            <Col span={16}>
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

                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Game Category</Form.Label>
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
                        <option value="fifa">fifa</option>
                        <option value="rocket league">rocket league</option>
                        <option value="clash of clans">clash of clans</option>
                        <option value="clash royale">clash royale</option>
                        {/* <option value="csgo">csgo</option> */}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPlatform">
                    <Form.Label>Tournament Platforms</Form.Label>
                    <div>
                        <CheckboxGroup options={platformOptions} value={updatedTournament.platforms} onChange={onChange} />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRegion">
                    <Form.Label>Tournament Region</Form.Label>
                    <Form.Control as="select" 
                    value={updatedTournament.region} 
                    onChange={(e) =>
                        setUpdatedTournament({
                            ...updatedTournament, 
                            region: e.target.value,
                        })
                    }>
                        <option value="">Select region</option>
                        <option value="africa">africa</option>
                        <option value="asia">asia</option>
                        <option value="middle east">middle east</option>
                        <option value="europe">europe</option>
                        <option value="central america">central america</option>
                        <option value="north america">north america</option>
                        <option value="south america">south america</option>
                        <option value="oceania">oceania</option>
                        <option value="global">global</option>
                    </Form.Control>
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
                                <ul>
                                    <li>Your <strong>title</strong> should clearly summarize the essence of the tournament you are hosting.</li>
                                    <li>Selecting the right games <strong>category</strong> makes it easier for people to find your tournament.</li>
                                    <li>Select the <strong>platforms</strong> your gamers might use to play with</li>
                                    <li>Select the <strong>region</strong> the gamers are expected to join from</li>
                                    <li><strong>DO NOT</strong> use vulgar or inappropriate language in the title</li>
                                </ul>
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

export default TournamentBasic;