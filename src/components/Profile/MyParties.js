import React from 'react';
import { Avatar, Card, Row, Col, Typography, Tag, Tabs } from 'antd';
import { UsergroupAddOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;
const { TabPane } = Tabs;

const MyParties = ({myParties, statsRouteKey, handleTabChange}) => {
    return (
        <>
        <Tabs activeKey={statsRouteKey} onChange={handleTabChange}  tabPosition="left">
            <TabPane
                key="Parties"
                tab={
                    <Row justify="left" align="middle">
                        <ProjectOutlined  style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Parties</span>
                    </Row>
                }
            >
                <div className='d-flex mt-2'>
                    {
                        myParties?.length === 0 ? <p className="mt-3">No parties found!</p> :
                        myParties?.map((item, index) => (
                            <Card key={index}
                                style={{
                                    width: 300,
                                    margin: '0 1rem 0 1rem',
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
                                        <Tag color={`${item?.status === 'active' ? 'green' : 'gold'}`}>{item?.status}</Tag>
                                    </Row>,
                                    <Row justify="center" align="middle">
                                        <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}>{item?.privacy}</span>
                                    </Row>,
                                    <Row justify="center" align="middle">
                                        <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> 
                                        <span className="ps-1" style={{ fontSize: '14px' }}>0/{item?.members?.invited?.length}</span>
                                    </Row>,
                                ]}
                                >
                                <Meta
                                    avatar={<Avatar src={item?.photo} />}
                                    title={<Link to={`/party/details/${item?._id}`}>
                                                <Paragraph className='mb-0'>{item?.title}</Paragraph>
                                            </Link>}
                                    description={`Owner: ${item?.owner?.userName}`}
                                />
                            </Card>
                        ))
                    }
                    
                </div>
            </TabPane> 
            <TabPane
                key="posts"
                tab={
                    <Row justify="left" align="middle">
                        <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Posts</span>
                    </Row>
                }
            >
                <Row gutter={[16, 16]}>
                    
                </Row>
            </TabPane>
        </Tabs>
        </>
    );
};

export default MyParties;