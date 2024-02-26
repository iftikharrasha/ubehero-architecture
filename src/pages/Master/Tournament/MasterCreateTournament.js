import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../../hooks/useTournament';
import { Radio } from 'antd';
import { useSelector } from "react-redux";

const MasterCreateDraft = () => {
    const games = useSelector(state => state.statics.games);
    const [filteredPlatforms, setFilteredPlatforms] = useState(null);
    const [filteredCrossPlatforms, setFilteredCrossPlatforms] = useState([]);

    const { handleTournamentDraftCreate, errorMessage } = useTournament();
    const [createData, setCreateData] = useState({ tournamentName: "", category: "", region: "", platforms: [], crossPlatforms: [], party: "65851d4304cf34c8d4649e2e", date: new Date() });
    const myParties = useSelector((state) => state.profile.data.parties.owner);
    console.log(createData)

    const onCategoryChange = (e) => {
        const p = games.find((game) => game.gameTitle === e.target.value);
        setFilteredPlatforms(p.eligiblePlatforms);
        setFilteredCrossPlatforms(p.crossPlatforms);
        setCreateData({
            ...createData,
            category: e.target.value,
            platforms: [],
            crossPlatforms: [],
        });
    };
    
    const onPlatformChange = (e) => {
        setCreateData({
            ...createData,
            platforms: [e.target.value],
            crossPlatforms: e.target.value === 'cross' ? filteredCrossPlatforms : [],
        });
    };

    const handleRegStartDateChange = (date) => {
        setCreateData({
          ...createData,
          date: date,
        });
    };
  
    const handleTournamentCreate = (e, role) => {
      e.preventDefault();
      handleTournamentDraftCreate(createData, role);
    };

    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ padding: "40px 0px" }}
        >
        <h5 className='mb-5'>
            Create your draft for the <strong className='text-primary '>Tournament</strong>
        </h5>
            <Form className="w-25" onSubmit={(e) => handleTournamentCreate(e, 'master')}>
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tournament Name</Form.Label>
                <Form.Control type="name" placeholder="Enter Name" 
                    value={createData.tournamentName}
                    onChange={(e) =>
                    setCreateData({
                        ...createData,
                        tournamentName: e.target.value,
                    })
                }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label>Game Category</Form.Label>
                    <Form.Control as="select" value={createData.category} onChange={(e) => onCategoryChange(e)}>
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
                            <Radio.Group onChange={onPlatformChange} value={createData.platforms[0]}>
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
                    <Form.Control as="select" value={createData.party} onChange={(e) =>
                        setCreateData({
                        ...createData,
                        party: e.target.value,
                        })
                    }>
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
                    value={createData.region} 
                    onChange={(e) =>
                        setCreateData({
                            ...createData, 
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

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Estimated Registration Start Date</Form.Label>
                    <br />
                    <DatePicker
                        selected={createData.date}
                        onChange={handleRegStartDateChange}
                        minDate={new Date()} // prevent past dates
                        dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // set format
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        className="w-100"
                    />
                </Form.Group>


                {
                    errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                }

                <Button variant="primary" type="submit">
                    Create Draft
                </Button>
            </Form>
        </div>
    );
};

export default MasterCreateDraft;