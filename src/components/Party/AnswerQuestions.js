import React, { useState } from 'react';
import { Space, Form, Input, Col } from 'antd';

const AnswerQuestions = ({ questions, form, setIsFieldsFilled }) => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFieldsChange = (_, allFields) => {
        const answers = allFields.map((field) => field.value);
        setIsFieldsFilled(answers.every((answer) => answer));
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
                {
                    questions.map((ques, index) => (
                        <Col span={8} key={index}>
                            <Form.Item>
                                <Space.Compact>
                                    <Form.Item
                                        label={ques}
                                        name={[`answer-${index}`]}
                                        style={{
                                            width: 300,
                                            margin: '0 8px',
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'please answer this question',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Type here"
                                        />
                                    </Form.Item>
                                </Space.Compact>
                            </Form.Item>
                            
                        </Col>
                    ))
                }
            </Form>
        </>
    );
};

export default AnswerQuestions;