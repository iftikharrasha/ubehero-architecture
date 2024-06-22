import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Statistic, Button, Form, Input, message, Modal  } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SwapOutlined } from '@ant-design/icons';
import useProfile from '../../../hooks/useProfile';

const WithdrawModal = ({id, totalGems, isModalOpen, setIsModalOpen}) => {
    const { handleTodaysGemPrice } = useProfile();
    const [form] = Form.useForm();
    const [amount, setAmount] = useState(null);
    const onFinish = () => {
      message.success('Withdraw success!');
    };
    const onFinishFailed = () => {
      message.error('Withdraw failed!');
    };

    const handleInput = (e) => {
      setAmount(e.target.value);
      form.setFieldsValue({
        gem: e.target.value,
      });
    };

    const onFill = () => {
      setAmount(totalGems);
      form.setFieldsValue({
        gem: totalGems,
      });
    };

    const handleOk = () => {
      setIsModalOpen(false);
      message.success('Withdraw success!');
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const [gemPrice, setGemPrice] = useState(null);
    console.log(gemPrice)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const gem = await handleTodaysGemPrice();
            setGemPrice(gem);
          } catch (error) {
            console.error('Error fetching gem price:', error);
          }
        };
      
        fetchData(); 
    }, []);

    
  const changeColor = gemPrice?.change >= 0 ? '#3f8600' : '#cf1322';

    return (
        <Modal title="WITHDRAW GEMS 💎" okText="WITHDRAW" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p className='mt-3'>Total tourmaline gems you have: {totalGems}</p>
            <Row gutter={16}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p>Today's exchange rate:</p>
                                <Statistic
                                    title={
                                    <span>Tourmaline Gem ~ 
                                        <img alt="aquamarine" src="https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                        1
                                    </span>}
                                    value={gemPrice ? (gemPrice?.price).toFixed(2) : 0}
                                    precision={2}
                                    valueStyle={{
                                        color: 'lime',
                                    }}
                                    prefix={<SwapOutlined />}
                                    suffix={<span>$</span>}
                                />
                            </div>
                            <Card bordered={false}>
                                <Statistic
                                    title="SINCE LAST PRICE"
                                    value={gemPrice ? (gemPrice?.change).toFixed(2) : 0}
                                    precision={2}
                                    valueStyle={{
                                        color: changeColor,
                                    }}
                                    prefix={gemPrice?.change >= 0 ? <ArrowUpOutlined /> : <ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </div>
                    </Card>
                    <Card bordered={false} className='mt-3'>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                        <Form.Item
                            name="gem"
                            label="Gems you want to withdraw:"
                            rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'gem',
                                warningOnly: true,
                            },
                            // {
                            //     type: 'string',
                            //     min: 6,
                            // },
                            ]}
                        >
                            <Input placeholder="input gem amount" value={amount} onChange={handleInput}/>
                        </Form.Item>
                        <Button htmlType="button" size="small" onClick={onFill}>
                            AUTO FILL
                        </Button>
                        {!amount ? null : <p className='text-center'>Amount you'll receive: ${(amount*0.10).toFixed(2)}</p>}
                        </Form>
                    </Card>
                </Col>
                {/* <Col span={6}>
                </Col> */}
            </Row>
        </Modal>
    );
};

export default WithdrawModal;