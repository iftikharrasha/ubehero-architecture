import React from 'react';
import { Space, Form, Input, Select } from 'antd';

const { Option } = Select;

const AddGameAccount = ({ item, form, setIsFieldsFilled }) => {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    return (
        <Form
            form={form}
            name="complex-form"
            onFinish={onFinish}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            layout='vertical'
            onFieldsChange={() => {
                // Check if all three fields are filled
                const fields = form.getFieldsValue();
                const allFieldsFilled = Object.values(fields).every((field) => field);
                setIsFieldsFilled(allFieldsFilled);
            }}
            >
            <Form.Item>
                <Space.Compact>
                <Form.Item
                    label='Platform'
                    name={['platform']}
                    style={{
                    width: 200,
                    margin: '0 8px',
                    }}
                    rules={[
                    {
                        required: true,
                        message: 'Platform is required',
                    },
                    ]}
                >
                    <Select placeholder="Select platform">
                    {item.platforms.map((platform, index) => (
                        <Option value={platform} key={index}>{platform}</Option>
                    ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='In Game Name'
                    name={['playerIgn']}
                    style={{
                    width: 300,
                    margin: '0 8px',
                    }}
                    rules={[
                    {
                        required: true,
                        message: 'In game name required',
                    },
                    ]}
                >
                    <Input
                    placeholder="Enter In Game Name"
                    />
                </Form.Item>
                <Form.Item
                    label={<span className='text-capital'>{item.settings.accountTag} ID</span>}
                    name={['playerId']}
                    style={{
                    width: 300,
                    margin: '0 8px',
                    }}
                    rules={[
                    {
                        required: true,
                        message: `${item.settings.accountTag} ID is required`,
                    },
                    ]}
                >
                    <Input
                    placeholder={`Enter ${item.settings.accountTag} ID`}
                    />
                </Form.Item>
                </Space.Compact>
            </Form.Item>
            {/* <Form.Item label=" " colon={false}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item> */}
        </Form> 
    );
};

export default AddGameAccount;