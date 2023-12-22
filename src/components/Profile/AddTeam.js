import React, { useState } from 'react';
import { Space, Form, Input, Select, Button, Alert } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
};


const AddTeam = ({ limit, form, setIsFieldsFilled, memberError, setMemberError }) => {
    const [memberAdd, setMemberAdd] = useState(false);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFieldsChange = (_, allFields) => {
        setMemberError(null);
        const categoryField = allFields.find((field) => field.name[0] === 'category');
        const teamNameField = allFields.find((field) => field.name[0] === 'teamName');
        const namesField = allFields.find((field) => field.name[0] === 'members');

        const isCategoryFilled = categoryField && categoryField.value;
        const isTeamNameFilled = teamNameField && teamNameField.value;
        const isNamesFilled = namesField && namesField.value && namesField.value.length >= limit && !namesField.value.includes(undefined) && !namesField.value.includes('');
        console.log('finalDecide', isNamesFilled);
        console.log('added', namesField?.value?.length);

        setMemberAdd(namesField?.value?.length);
        setIsFieldsFilled(isCategoryFilled && isTeamNameFilled && isNamesFilled);
    };

    return (
        <>
            <Form
                form={form}
                name="combined-form"
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout='vertical'
                onFieldsChange={onFieldsChange}
            >
                <Form.Item>
                    <Space.Compact>
                        <Form.Item
                            label='Game Name'
                            name={['category']}
                            style={{
                                width: 200,
                                margin: '0 8px',
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'you must select a game',
                                },
                            ]}
                        >
                            <Select placeholder="Select a game">
                                <Option value="">Select category</Option>
                                <Option value="pubg">pubg</Option>
                                <Option value="freefire">freefire</Option>
                                <Option value="warzone">warzone</Option>
                                <Option value="fifa">fifa</Option>
                                <Option value="rocket league">rocket league</Option>
                                <Option value="clash of clans">clash of clans</Option>
                                <Option value="clash royale">clash royale</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Team Name'
                            name={['teamName']}
                            style={{
                                width: 300,
                                margin: '0 8px',
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Team name is required',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter Team Name"
                            />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>

                <Form.List
                    name="members"
                    rules={[
                        {
                            validator: async (_, members) => {
                                if (!members || members.length < 2) {
                                    return Promise.reject(new Error('At least 2 members need to be added'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Members' : ''}
                                    required={true}
                                    key={field.key}
                                    style={{
                                        width: '100%',
                                        marginLeft: '8px',
                                    }}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input member's username.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="members username"
                                            style={{
                                                width: 200,
                                            }}
                                        />
                                    </Form.Item>
                                    {fields.length >= 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            {
                                memberAdd === limit ? '' :
                                <Form.Item
                                    style={{
                                        width: '100%',
                                        marginLeft: '8px',
                                    }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Add Member
                                    </Button>
    
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            }
                        </>
                    )}
                </Form.List>

                {/* <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}


            </Form>
            {
            memberError ? 
            <div className="d-flex">
                <Alert 
                    message={memberError}
                    description="Make sure you typed the username correctly!"
                    type="warning"
                    showIcon 
                    closable={false}
                /> 
            </div>: null
            }
        </>
    );
};

export default AddTeam;