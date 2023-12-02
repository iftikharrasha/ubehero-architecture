import React from 'react';
import { Row, Col, Steps, Card } from "antd";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";

const TournamentDate = ({updatedTournament, setUpdatedTournament}) => {
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

    return (
        <Row gutter={[16, 16]} className="pt-3">
            <Col span={16}>
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
                                    <li>The <strong>registration start</strong> date will be based on the region you've selected</li>
                                    <li>The <strong>registration end</strong> date should have at least 24h difference from the start time</li>
                                    <li>The delay between registration end and <strong>tournament start</strong> is called preparation time</li>
                                    <li>At least 24 hours <strong>preparation time</strong> time is needed to make sure everone is ready</li>
                                    <li>At this point in time make sure you are <strong>ready</strong> to start the tournament too</li>
                                    <li>Add an estimated <strong>tournament end</strong>ing time</li>
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

export default TournamentDate;