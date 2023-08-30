import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../hooks/useTournament';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const MasterCreateDraft = () => {
    const { handleTournamentDraftCreate, errorMessage } = useTournament();
    const [createData, setCreateData] = useState({ tournamentName: "", category: "", region: "", platforms: [], date: new Date() });
    // console.log(createData)

    const platformOptions = [
        { label: 'PSN', value: 'psn', disabled: createData.platforms.includes('mobile') || createData.platforms.includes('nintendo') },
        { label: 'XBOX', value: 'xbox', disabled: createData.platforms.includes('mobile') || createData.platforms.includes('nintendo') },
        { label: 'PC', value: 'pc', disabled: createData.platforms.includes('mobile') || createData.platforms.includes('nintendo') },
        { label: 'Mobile', value: 'mobile', disabled: createData.platforms.includes('psn') || createData.platforms.includes('xbox') || createData.platforms.includes('pc') || createData.platforms.includes('nintendo') },
        { label: 'Nintendo', value: 'nintendo', disabled: createData.platforms.includes('psn') || createData.platforms.includes('xbox') || createData.platforms.includes('pc') || createData.platforms.includes('mobile') },
    ];

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

    const onChange = (checkedValues) => {
        setCreateData({
          ...createData,
          platforms: checkedValues,
        });
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
                    <Form.Control as="select" value={createData.category} onChange={(e) =>
                        setCreateData({
                        ...createData,
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
                        <CheckboxGroup options={platformOptions} value={createData.platforms} onChange={onChange} />
                    </div>
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