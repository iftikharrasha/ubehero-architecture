import React from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Row, Col, Steps, Input, Card, Button, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useProfile from "../../../hooks/useProfile";

const { Option } = Select;

const MasterCreateParty = () => {
    const [form] = Form.useForm();
    const [partyQuestion, setPartyQuestion] = useState(null);
    const [okayToCreate, setOkayToCreate] = useState(null);
    const { handlePartyCreate, errorMessage } = useProfile();
    // const [createData, setCreateData] = useState({ title: "", owner: "", privacy: "", questions: ["NA"] });
    // console.log(createData)
  
    const onFinish = (values) => {
      console.log(values)
      handlePartyCreate(values, 'master');
    };

    const onFieldsChange = (_, allFields) => {
        const titleField = allFields.find((field) => field.name[0] === 'title');
        const privacyField = allFields.find((field) => field.name[0] === 'privacy');
        const questionsField = allFields.find((field) => field.name[0] === 'questions');

        const isTitleFilled = titleField && titleField.value;
        const isPrivacyFilled = privacyField && privacyField.value;
        // const isQuesFilled = questionsField && questionsField.value && questionsField.value.length >= 3 && !questionsField.value.includes(undefined) && !questionsField.value.includes('');
        // console.log('allFields', allFields);
        // console.log('finalDecide', isQuesFilled);
        // console.log('length', questionsField?.value?.length);

        setOkayToCreate(isTitleFilled && isPrivacyFilled);
        setPartyQuestion(questionsField?.value?.length);
    };

    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ padding: "40px 0px" }}
        >
            <h5 className='mb-5'>
                Create your <strong className='text-primary '>Party</strong>
            </h5>

            <Row gutter={[16, 16]} className="pt-3">
                <Col span={12}>
                <Form className="w-100" layout='vertical' form={form} onFinish={onFinish} onFieldsChange={onFieldsChange}>
                    <Form.Item
                        name="title"
                        label="Party name"
                        style={{
                            width: '100%',
                        }}
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="privacy"
                        label="Party Privacy"
                        style={{
                            width: '100%',
                        }}
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Select
                            placeholder="Choose privacy"
                            allowClear
                        >
                            <Option value="public">public</Option>
                            <Option value="inviteonly">invite only</Option>
                        </Select>
                    </Form.Item>

                        <p>Add up to three questions to verify member joining (optional)</p>
                        <Form.List
                            name="questions"
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please enter a question.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input
                                                    placeholder="write a question"
                                                    style={{
                                                        width: '95%',
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
                                        partyQuestion >= 3 ? '' :
                                        <Form.Item
                                            style={{
                                                width: '100%',
                                            }}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                icon={<PlusOutlined />}
                                            >
                                                Add Question
                                            </Button>
            
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    }
                                </>
                            )}
                        </Form.List>

                        {
                            errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                        }


                        {
                            !okayToCreate ? '' :
                            <Button type="primary" htmlType="submit">
                                Create Party
                            </Button>
                        }
                    </Form>
                </Col>
                <Col span={12}>
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
                                        <li>Your <strong>party title</strong> should clearly summarize the essence of the party you are creating.</li>
                                        <li>Selecting the right <strong>privacy</strong> makes it easier for you to track people thats joining the party.</li>
                                    </ul>
                                    <div>Pricacy Types:</div>
                                    <ul>
                                        <li><strong>Public:</strong> anyone can request to join the party</li>
                                        <li><strong>Invitation Only:</strong> You choose to invite people that joins the party.</li>
                                    </ul>
                                    <div>Membership Questions:</div>
                                    <ul>
                                        <li>Ask pending members up to three questions when they request to join your group.</li>
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
        </div>
    );
};

export default MasterCreateParty;