import React from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useProfile from "../../hooks/useProfile";

import { LockOutlined, UserOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Tabs, Row, Col, Empty } from 'antd';
import GameAccount from "./GameAccount";
import AddGameAccount from "./AddGameAccount";

const { Option } = Select;
const { TabPane } = Tabs;

const Settings = ({profile, routeKey, settingsRouteKey, handleTabChange}) => {
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const { handleProfileDraftUpdate, errorMessage } = useProfile();
    const gameAccounts = profile.gameAccounts;

    const handleBirthtDateChange = (date) => {
        setUpdatedProfile((prevProfile) => {
            return {...updatedProfile, dateofBirth: date.toISOString()}
        });
    };
  
    // const handleProfileUpdate = (e) => {
    //   e.preventDefault();
    //   handleProfileDraftUpdate(updatedProfile);
    // };

    const handleProfileUpdate = (values) => {
        console.log(values);
        // handleProfileDraftUpdate(updatedProfile);
    };

    return (
        <div
            className='d-flex'
        >
            {/* <Form className="w-50">
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
            </Form> */}

            <Tabs activeKey={settingsRouteKey} onChange={handleTabChange} tabPosition="left">
                <TabPane
                    key="personal"
                    tab={
                        <Row justify="left" align="middle">
                            <ProjectOutlined  style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Personal Info</span>
                        </Row>
                    }
                >
                    <Card
                        title={
                            <h5>
                                Update your <strong>Profile</strong>
                            </h5>
                        }
                        bordered={false}
                        style={{
                            width: '35rem',
                        }}
                    >
                    <Form name="normal_login"
                        className="login-form"
                        layout='vertical'
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleProfileUpdate}
                    >
                        <Form.Item  label="Enter Your Username"
                        name="userName"
                        className="pb-1"
                        rules={[
                            {
                            type: 'name',
                            message: 'The input is not valid name!',
                            },
                            {
                            required: true,
                            message: 'Please input your username!',
                            },
                        ]}
                        hasFeedback
                        >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item  label="Enter Your Email Address"
                        name="emailAddress"
                        className="pb-1"
                        rules={[
                            {
                            type: 'email',
                            message: 'The input is not valid Email!',
                            },
                            {
                            required: true,
                            message: 'Please input your Email!',
                            },
                        ]}
                        hasFeedback
                        >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                        name="mobileNumber"
                        label="Phone Number"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your phone number!',
                            },
                        ]}
                        >
                        <Input
                            style={{
                            width: '100%',
                            }}
                        />
                        </Form.Item>

                        <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                            required: true,
                            message: 'Please select gender!',
                            },
                        ]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            UPDATE
                        </Button>
                        </Form.Item>
                    </Form>
                    
                    {
                        errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                    }
                    </Card>
                </TabPane> 
                <TabPane
                    key="gameaccounts"
                    tab={
                        <Row justify="left" align="middle">
                            <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Game Accounts</span>
                        </Row>
                    }
                >
                       
                    <Row gutter={[16, 16]}>
                        {
                        gameAccounts.length === 0 ? 
                        <Empty/> :
                        // <AddGameAccount item={item} form={form} setIsFieldsFilled={setIsFieldsFilled}/> :
                        gameAccounts.map((account, index) => (
                            <Col span={8} key={index}>
                                <GameAccount account={account} cover={false}/>
                            </Col>
                        ))
                        }
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Settings;