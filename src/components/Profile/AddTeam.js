import React, { useState } from 'react';
import { Space, Form, Input, Select, Button, Alert, message, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

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


const AddTeam = ({ userName, limit, form, setIsFieldsFilled, teamError, setTeamError, filteredCrossPlatforms, setFilteredCrossPlatforms }) => {
    const [memberAdd, setMemberAdd] = useState(false);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFieldsChange = (_, allFields) => {
        setTeamError(null);
        const categoryField = allFields.find((field) => field.name[0] === 'category');
        const teamNameField = allFields.find((field) => field.name[0] === 'teamName');
        const namesField = allFields.find((field) => field.name[0] === 'members');

        const isCategoryFilled = categoryField && categoryField.value;
        const isTeamNameFilled = teamNameField && teamNameField.value;
        const isNamesFilled = namesField && namesField.value && namesField.value.length >= limit && !namesField.value.includes(undefined) && !namesField.value.includes('');
        // console.log('finalDecide', isNamesFilled);
        // console.log('added', namesField?.value?.length);

        setMemberAdd(namesField?.value?.length);
        setIsFieldsFilled(isCategoryFilled && isTeamNameFilled && isNamesFilled);
    };

    
    const games = useSelector(state => state.statics.games);
    const [filteredPlatforms, setFilteredPlatforms] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const onCategoryChange = (value) => {
        const p = games.find((game) => game.gameTitle === value);
        setFilteredPlatforms(p.eligiblePlatforms);
        setFilteredCrossPlatforms(p.crossPlatforms);
        setSelectedPlatform(null);
    };

    const onPlatformChange = (e) => {
        setSelectedPlatform(e.target.value);
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
                                message: 'You must select a game',
                            },
                            ]}
                        >
                            <Select placeholder="Select Game" onChange={onCategoryChange}>
                                {games.filter(game => game.type !== 'solo').map((item, i) => (
                                    <Option key={i} value={item.gameTitle}>
                                    {item.gameTitle}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Space.Compact>

                    <Space.Compact className='mt-4'>
                        {filteredPlatforms ? (
                            <Form.Item
                                label="Select the version of the game your team will play together"
                                name={['platform']}
                                style={{
                                    width: '100%',
                                    margin: '0 8px',
                                }}
                                rules={[
                                    {
                                    required: true,
                                    message: 'You must select a platform',
                                    },
                            ]}
                            >
                            <Radio.Group onChange={onPlatformChange} value={selectedPlatform}>
                                {filteredPlatforms.map((platform, i) => (
                                <Radio key={i} value={platform} style={{ lineHeight: '32px' }}>
                                    {platform === 'cross'
                                    ? `Cross-Play (${filteredCrossPlatforms.join(', ')})`
                                    : platform}
                                </Radio>
                                ))}
                            </Radio.Group>
                            </Form.Item>
                        ) : null}
                    </Space.Compact>
                </Form.Item>

                <Form.List
                    name="members"
                    rules={[
                        {
                            required: true,
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
                            <p style={{margin: '0 8px 10px 8px'}}>Leader: {userName}</p>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Teammates' : ''}
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
                                            placeholder="teammates username"
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
                                        Add Teammate
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
            teamError ? 
            <div className="d-flex">
                <Alert 
                    message={teamError.message}
                    description={teamError.description}
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