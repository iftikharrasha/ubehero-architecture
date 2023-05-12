import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../hooks/useTournament';

const InternalCreateDraft = () => {
    const { handleTournamentDraftCreate, errorMessage } = useTournament();
    const [createData, setCreateData] = useState({ tournamentName: "", category: "", date: new Date() });

    const handleRegStartDateChange = (date) => {
        setCreateData({
          ...createData,
          date: date,
        });
    };
  
    const handleTournamentCreate = (e) => {
      e.preventDefault();
      handleTournamentDraftCreate(createData);
    };

    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ padding: "40px 0px" }}
        >
        <h5 className='mb-5'>
            Create a new <strong className='text-primary '>Tournament</strong>
        </h5>
            <Form className="w-25" onSubmit={handleTournamentCreate}>
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
                    <Form.Label>category</Form.Label>
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
                        <option value="csgo">csgo</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Estimated Registration Date</Form.Label>
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

export default InternalCreateDraft;