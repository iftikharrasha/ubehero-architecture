import React, { useEffect } from 'react';
import { Avatar, Card, List, Row, Space, Typography, Popconfirm, message } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, UsergroupAddOutlined, PlusCircleOutlined, PartitionOutlined } from '@ant-design/icons';
import PageLayout from '../../components/PageLayout/PageLayout';
import { fetchParties } from '../../redux/slices/partySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

const Parties = () => {
    const dispatch = useDispatch();
    const parties = useSelector((state) => state.parties.data);
    const versionParty = useSelector((state) => state.parties.version);

    useEffect(() => {
        dispatch(fetchParties(versionParty));
    }, []);

    const separatedItem = parties.find((item) => item.title === 'Underdogg');
    const remainingItems = parties.filter((item) => item.title !== 'Underdogg');
    console.log('here', separatedItem, remainingItems)

    const confirm = (e) => {
        message.success('Clicked');
    };
    return (
        <PageLayout>
                {
                    !separatedItem ? '' :
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
                                    <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>0/{separatedItem.members.invited.length}</span>
                                </Row>,
                                <Row justify="center" align="middle">
                                    <>
                                        <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}>{separatedItem.category}</span>
                                    </>
                                </Row>,
                                <Popconfirm
                                    title="Save this for later?"
                                    onConfirm={confirm}
                                    okText="Yes"
                                >
                                    <PlusCircleOutlined style={{ fontSize: '18px' }}/>
                                </Popconfirm>
                                ,
                            ]}
                            >
                            <Meta
                                avatar={<Avatar src={separatedItem.photo} />}
                                title={<div><Link to={`/party/details/${separatedItem._id}`}><Paragraph className='mb-0'>{separatedItem.title}</Paragraph></Link></div>}
                                description={`Owner: ${separatedItem.owner.userName}`}
                            />
                        </Card>
                }
                <Paragraph className='mt-5' style={{fontSize: '20px'}}>OTHER PARTIES</Paragraph>
                <div className='d-flex'>
                    
                    {
                        remainingItems.length === 0 ? <p className="mt-3">No party found!</p> :
                            remainingItems.map((item, index) => (
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
                                            <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>0/{item.members.invited.length}</span>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <>
                                                <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                                <span className="ps-1" style={{ fontSize: '14px' }}>{item.category}</span>
                                            </>
                                        </Row>,
                                        <Popconfirm
                                            title="Save this for later?"
                                            onConfirm={confirm}
                                            okText="Yes"
                                        >
                                            <PlusCircleOutlined style={{ fontSize: '18px' }}/>
                                        </Popconfirm>
                                        ,
                                    ]}
                                >
                                <Meta
                                    avatar={<Avatar src={item.photo} />}
                                    title={<div><Link to={`/party/details/${item._id}`}><Paragraph className='mb-0'>{item.title}</Paragraph></Link></div>}
                                    description={`Owner: ${item.owner.userName}`}
                                />
                            </Card>
                        ))
                    }
                    
                </div>
        </PageLayout>
    );
};

export default Parties;