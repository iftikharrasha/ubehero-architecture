import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useProfile from "../../hooks/useProfile";

const Settings = ({profile}) => {
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const { handleProfileDraftUpdate, errorMessage } = useProfile();

    const handleBirthtDateChange = (date) => {
        setUpdatedProfile((prevProfile) => {
            return {...updatedProfile, dateofBirth: date.toISOString()}
        });
    };
  
    const handleProfileUpdate = (e) => {
      e.preventDefault();
      handleProfileDraftUpdate(updatedProfile);
    };

    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ padding: "40px 0px" }}
        >
        <h5 className='mb-5'>
            Update your <strong className='text-primary '>Profile</strong>
        </h5>
            <Form className="w-50">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter First Name" 
                        value={updatedProfile.firstName}
                        onChange={(e) =>
                        setUpdatedProfile({
                            ...updatedProfile,
                            firstName: e.target.value,
                        })
                    }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Last Name" 
                        value={updatedProfile.lastName}
                        onChange={(e) =>
                        setUpdatedProfile({
                            ...updatedProfile,
                            lastName: e.target.value,
                        })
                    }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" value={updatedProfile.gender} onChange={(e) =>
                        setUpdatedProfile({
                            ...updatedProfile, 
                            gender: e.target.value,
                        })
                    }>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="Male">Female</option>
                        <option value="other">Other</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Date of birth</Form.Label>
                    <br />
                    <DatePicker
                        selected={updatedProfile?.dateofBirth && new Date(updatedProfile?.dateofBirth)}
                        onChange={handleBirthtDateChange}
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

                <Button variant="success" type="submit" onClick={(e) => handleProfileUpdate(e)}>
                    Save
                </Button>
                <Button variant="secondary" type="submit" className='ms-3'>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default Settings;