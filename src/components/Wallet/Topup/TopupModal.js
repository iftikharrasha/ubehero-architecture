import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Statistic, Button, Form, Input, message, Modal  } from 'antd';
import { ArrowDownOutlined, SwapOutlined } from '@ant-design/icons';
import useProfile from '../../../hooks/useProfile';

const TopupModal = ({id, totalGems, isModalOpen, setIsModalOpen}) => {
    const { handleTodaysGemPrice } = useProfile();
    const [form] = Form.useForm();
    const [amount, setAmount] = useState(null);
    const onFinish = () => {
      message.success('Topup success!');
    };
    const onFinishFailed = () => {
      message.error('Topup failed!');
    };

    const handleInput = (e) => {
      setAmount(e.target.value);
      form.setFieldsValue({
        gem: e.target.value,
      });
    };

    const handleOk = () => {
      setIsModalOpen(false);
      message.success('Topup success!');
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
        <Modal title="TOPUP GEMS 💎" okText="CHECKOUT" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                                    prefix={<ArrowDownOutlined />}
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
                            label="How many tourmaline gems you want to purchase?"
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
                        {!amount ? null : <p className='text-center'>Payment total: ${(amount*0.10).toFixed(2)}</p>}
                        </Form>
                    </Card>
                    {/* <Card bordered={false} className='mt-3'>
                        <div style={{ padding: "1rem" }} className='drawModal'>
                            <h2 data-aos="fade" data-aos-delay="500" data-aos-duration="1000" data-aos-offset="0" data-aos-once="true">
                                Select <span className="yellow">How many tickets </span> <br /><span className="pink">you want to purchase?</span>
                            </h2>
                            <div className="drawContent">
                                <div className='hero__content__left__middle'>
                                    <div className='just'>
                                        <p>Total Price.</p>
                                        <h6>$</h6>
                                    </div>
                                    <h4>0.10</h4>
                                </div>
                                <div className="number">
                                    <div className="plus" >+</div>
                                    <input type="text" value="10"/>
                                    <div className="minus">-</div>
                                </div>
                            </div>
                        </div>
                    </Card> */}
                </Col>
            </Row>
        </Modal>
    );
};

export default TopupModal;