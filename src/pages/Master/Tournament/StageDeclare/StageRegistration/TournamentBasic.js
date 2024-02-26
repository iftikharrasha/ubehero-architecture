import React, { useState } from 'react';
import { Row, Col, Steps, Card, Checkbox, Radio } from "antd";
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

const TournamentBasic = ({updatedTournament, setUpdatedTournament}) => {
    const myParties = useSelector((state) => state.profile.data.parties.owner);
    const games = useSelector(state => state.statics.games);
    const fP = games.find((game) => game.gameTitle === updatedTournament.category)
    const [filteredPlatforms, setFilteredPlatforms] = useState(fP.eligiblePlatforms);
    const [filteredCrossPlatforms, setFilteredCrossPlatforms] = useState(fP.crossPlatforms);

    const onCategoryChange = (e) => {
        const p = games.find((game) => game.gameTitle === e.target.value);
        setFilteredPlatforms(p.eligiblePlatforms);
        setFilteredCrossPlatforms(p.crossPlatforms);
        setUpdatedTournament({
            ...updatedTournament,
            category: e.target.value,
            platforms: [],
            crossPlatforms: [],
        });
    };
    
    const onPlatformChange = (e) => {
        setUpdatedTournament({
            ...updatedTournament,
            platforms: [e.target.value],
            crossPlatforms: e.target.value === 'cross' ? filteredCrossPlatforms : [],
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

                <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label>Game Category</Form.Label>
                    <Form.Control as="select" value={updatedTournament.category} onChange={(e) => onCategoryChange(e)}>
                        <option value="">Select category</option>
                        {games.map((game, i) => {
                            return <option key={i} value={game.gameTitle}>{game.gameTitle}</option>;
                        })}
                    </Form.Control>
                </Form.Group>

                {
                    filteredPlatforms ?
                    <Form.Group className="mb-3" controlId="formBasicPlatform">
                        <Form.Label>Tournament Platforms</Form.Label>
                        <div>
                            <Radio.Group onChange={onPlatformChange} value={updatedTournament.platforms[0]}>
                                {filteredPlatforms.map((platform, i) => {
                                    return (
                                        <Radio key={i} value={platform} style={{ lineHeight: '32px' }}>
                                            {platform === 'cross' ? `Cross-Play (${filteredCrossPlatforms.join(', ')})` : platform}
                                        </Radio>
                                    );
                                })}
                            </Radio.Group>
                        </div>
                    </Form.Group> : null
                }

                <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label>Choose Party</Form.Label>
                    <Form.Control as="select" value={updatedTournament.party} onChange={(e) =>
                        setUpdatedTournament({
                        ...updatedTournament,
                        party: e.target.value,
                        })
                    }>
                        <option value="">Select category</option>
                        <option value="65851d4304cf34c8d4649e2e">Underdogg</option>
                        {
                            
                            myParties.map((party) => (
                                <option value={party._id}>{party.title}</option>
                            ))
                        }
                    </Form.Control>
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