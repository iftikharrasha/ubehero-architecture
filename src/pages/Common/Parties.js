import React, { useEffect, useState } from 'react';
import { Avatar, Card, Row, Typography, Tag, Empty } from 'antd';
import { UsergroupAddOutlined, PartitionOutlined } from '@ant-design/icons';
import PageLayout from '../../components/PageLayout/PageLayout';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useParties from '../../hooks/useParties';

const { Meta } = Card;
const { Paragraph } = Typography;

const Parties = () => {
    const { handlePartiesList } = useParties();
    const profile = useSelector(state => state.profile);
    const userId = profile?.data?._id;

    const [mainParty, setMainParty] = useState([]);
    const [otherParties, setOtherParties] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const parties = await handlePartiesList();
            const separatedItem = parties.find((item) => item.title === 'Underdogg');
            const remainingItems = parties.filter((item) => item.title !== 'Underdogg');
            setMainParty(separatedItem);
            setOtherParties(remainingItems);
          } catch (error) {
            setMainParty([]);
            setOtherParties([]);
            console.error('Error fetching parties list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    return (
        <PageLayout>
                <div className='d-flex'>
                {
                    mainParty?.length === 0 ? <Empty/> :
                    <Card
                        style={{
                            width: 300,
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)', 
                            backgroundImage: `url('https://i.pinimg.com/originals/8a/a8/55/8aa85540c13730a91335563aa77d52f4.gif')`, 
                            backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                        }}
                        // cover={
                        //     <img
                        //         alt="example"
                        //         src={separatedItem.coverPhoto}
                        //     />
                        // }
                        actions={[
                            <Row justify="center" align="middle">
                                <Tag color={`${mainParty?.status === 'active' ? 'green' : 'gold'}`}>{mainParty?.status}</Tag>
                            </Row>,
                            <Row justify="center" align="middle">
                                <>
                                    <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                    <span className="ps-1" style={{ fontSize: '14px' }}>{mainParty?.privacy}</span>
                                </>
                            </Row>,
                            <Row justify="center" align="middle">
                                <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>0/{mainParty?.members?.invited?.length}</span>
                            </Row>,
                        ]}
                        >
                        <Meta
                            avatar={<Avatar src={mainParty?.photo} />}
                            title={<div><Link to={`/party/details/${mainParty?._id}`}><Paragraph className='mb-0'>{mainParty?.title}</Paragraph></Link></div>}
                            description={`Owner: ${mainParty?.owner?.userName}`}
                        />
                    </Card>
                }
                </div>
                <Paragraph className='mt-5' style={{fontSize: '20px'}}>OTHER PARTIES</Paragraph>
                <div className='d-flex'>
                    {
                        otherParties?.length === 0 ? <Empty/> :
                        otherParties?.map((item, index) => (
                            <Card key={index}
                                    style={{
                                        width: 300,
                                        margin: '0 1rem 0 1rem',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)', 
                                        backgroundImage: `url('https://i.makeagif.com/media/8-25-2018/VYuAzC.gif')`, 
                                        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                                    }}
                                    // cover={
                                    //     <img
                                    //         alt="example"
                                    //         src={item.coverPhoto}
                                    //     />
                                    // }
                                    actions={[
                                        <Row justify="center" align="middle">
                                            <Tag color={`${item?.status === 'active' ? 'green' : 'gold'}`}>{item?.status}</Tag>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <>
                                                <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                                <span className="ps-1" style={{ fontSize: '14px' }}>{item?.privacy}</span>
                                            </>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>0/{item?.members?.invited?.length}</span>
                                        </Row>,
                                    ]}
                                >
                                <Meta
                                    avatar={<Avatar src={item?.photo} />}
                                    title={<div><Link to={`/party/details/${item?._id}`}><Paragraph className='mb-0'>{item?.title}</Paragraph></Link></div>}
                                    description={`Owner: ${item?.owner?.userName}`}
                                />
                            </Card>
                        ))
                    }
                </div>
        </PageLayout>
    );
};

export default Parties;