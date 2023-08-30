import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTournament from '../../hooks/useTournament';

const InternalUpdateDraft = () => {
    const internalTournaments = useSelector(state => state.internalTournaments.data);
    const [updatedTournament, setUpdatedTournament] = useState({});
    const { tId } = useParams();

    const { handleTournamentDraftUpdate, handleTournamentDraftDelete, handleApprovalUpdate, errorMessage } = useTournament();

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
  
    const handleTournamentDelete = (e, id, role) => {
        e.preventDefault();
        handleTournamentDraftDelete(id, role);
    };

    const handleApproval = (e, role) => {
        e.preventDefault();
        handleApprovalUpdate(updatedTournament, role);
    };

    useEffect(() => {
        if(internalTournaments){
            const thisTournament = internalTournaments.find(tournament => tournament._id === tId);
            setUpdatedTournament(thisTournament)
        }
    }, [internalTournaments, tId]);

    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ padding: "40px 0px" }}
        >
        <h5 className='mb-5'>
            Update the <strong className='text-primary '>Tournament</strong>
        </h5>
            <Form className="w-50">
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
                    <Form.Control as="select" value={updatedTournament.category} onChange={(e) =>
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


                {
                    errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                }

                <Button variant="success" type="submit" onClick={(e) => handleApproval(e, 'internal')}>
                    Approve
                </Button>
                <Button variant="primary" type="submit" className='ms-3' onClick={(e) => handleTournamentUpdate(e, 'internal', 'revision')}>
                    Revision
                </Button>
                <Button variant="secondary" type="submit" className='ms-3' onClick={(e) => handleTournamentUpdate(e, 'internal', 'blocked')}>
                    Block
                </Button>
                <Button variant="danger" type="submit" className='ms-3' onClick={(e) => handleTournamentDelete(e, updatedTournament._id, 'internal')}>
                    Delete
                </Button>
            </Form>
        </div>
    );
};

export default InternalUpdateDraft;