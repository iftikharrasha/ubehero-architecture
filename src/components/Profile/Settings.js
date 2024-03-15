import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useProfile from "../../hooks/useProfile";

import { LockOutlined, UserOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Tabs, Row, Col, Empty, Modal } from 'antd';
import GameAccount from "./GameAccount";
import GameAccountOfProfileModal from "./GameAccountOfProfileModal";

const { Option } = Select;
const { TabPane } = Tabs;

const Settings = ({profile, settingsRouteKey, handleTabChange}) => {
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const { handleProfileDraftUpdate, handleGameAccountAdd, errorMessage } = useProfile();
    const gameAccounts = profile.gameAccounts;
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [gameSelected, setGameSelected] = useState(null);
    const [gameAccountError, setGameAccountError] = useState(null);

    const [form] = Form.useForm();

    const handleBirthtDateChange = (date) => {
        setUpdatedProfile((prevProfile) => {
            return {...updatedProfile, dateofBirth: date.toISOString()}
        });
    };

    const handleProfileUpdate = (values) => {
        console.log(values);
        // handleProfileDraftUpdate(updatedProfile);
    };


    const handleOk = async () => {
        setConfirmLoading(true);
        
        const formData = form.getFieldsValue();
        const addedPlatform = {
            ...formData,
            uId: profile._id,
            tag: gameSelected.tag,
            crossPlay: gameSelected.crossPlatforms.includes(formData.platform)
        }
        
        let samePlatformExists = null;
        const myGameAccounts = gameAccounts.filter(g => g.category === formData.category);
        samePlatformExists = myGameAccounts.find(g => g.platform === formData.platform);

        if (samePlatformExists) {
            setGameAccountError({
                message: `You already have a ${formData.platform} account connected for ${formData.category} `,
                description: `Kindly use your ${formData.platform} to play ${formData.category}`,
            });
            setConfirmLoading(false);
            return;
        }

        if(gameSelected.crossPlatforms.includes(formData.platform)){
            const similarCrossPlatformAccount = myGameAccounts.find(account => gameSelected.crossPlatforms.includes(account.platform));
            if(similarCrossPlatformAccount){
                setGameAccountError({
                    message: `You already have a cross-platform account connected for ${formData.category} `,
                    description: `Kindly use your ${similarCrossPlatformAccount.platform} to play ${formData.category}`,
                });
                setConfirmLoading(false);
                return;
            }
        }
        
        const result = await handleGameAccountAdd(addedPlatform);
        if(result.success){
            setOpen(false);
            setConfirmLoading(false);
        }
    };

    return (
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
                    
                <div className="d-flex justify-content-end">
                    <Button danger onClick={() => setOpen(true)}>Create Game Account</Button>
                </div>
                <Row gutter={[16, 16]} className="mt-4">
                    {
                        gameAccounts.length === 0 ? 
                        <Empty/> :
                        gameAccounts.map((account, index) => (
                            <Col span={8} key={index}>
                                <GameAccount account={account} cover={false}/>
                            </Col>
                        ))
                    }
                </Row>
            
                <Modal
                    title={<h4 className='text-center pb-5'>Create your game account</h4>}
                    centered
                    open={open}
                    okText='Create'
                    onOk={handleOk}
                    onCancel={() => setOpen(false)}
                    confirmLoading={confirmLoading}
                    width={1000}
                    okButtonProps={{
                        disabled: !isFieldsFilled,
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <GameAccountOfProfileModal 
                            form={form} 
                            setIsFieldsFilled={setIsFieldsFilled} 
                            gameSelected={gameSelected}
                            setGameSelected={setGameSelected}
                            gameAccountError={gameAccountError}
                        >
                        </GameAccountOfProfileModal>
                    </Row>
                </Modal>
            </TabPane>
        </Tabs>
    );
};

export default Settings;