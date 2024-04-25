import React from 'react';
import { Card, Row, Tag, Avatar, Typography, Tooltip } from 'antd';
import { UsergroupAddOutlined, CrownOutlined, PartitionOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

const TeamCard = ({item, id}) => {
    return (
        <Card
            style={{
                width: 300,
                margin: '0 1rem 0 1rem',
            }}
            cover={
                <img
                    alt="example"
                    src={item.coverPhoto}
                    style={{
                        maxHeight: 140,
                        objectFit: 'cover'
                    }}
                />
            }
            actions={[
                <Row justify="center" align="middle">
                    <Tag color={`${item?.status === 'active' ? 'green' : 'gold'}`}>{item.status}</Tag>
                </Row>,
                <Row justify="center" align="middle">
                    <>
                        <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                        <span className="ps-1" style={{ fontSize: '14px' }}>{item.category}</span>
                    </>
                </Row>,
                <Row justify="center" align="middle">
                    <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>{item.members.mates.length+1}/{item.size}</span>
                </Row>
                ,
            ]}
            >
            <Meta
                avatar={<Avatar src={item.photo} />}
                title={<div><Link to={`/team/${item._id}`}><Paragraph className='mb-0'>
                    {item.captainId._id === id ? <CrownOutlined style={{ fontSize: '18px', color: 'gold' }}/> : ""} {item.teamName}</Paragraph></Link></div>}
                // description={`Created At: ${moment(item.createdAt).format('ll')}`}
                description={
                    <div className="d-flex">
                        <Avatar.Group
                            shape="square"
                            maxCount={14}
                            size="small"
                            maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            }}
                        >
                            <Tooltip title={`${item.captainId.userName}`} placement="top">
                                <Avatar src={item.captainId.photo}/>
                            </Tooltip>
                            {
                                item.members.mates.map((mate, index) => (
                                    <Tooltip title={`${mate.userName}`} placement="top">
                                        <Avatar key={index}
                                            src={mate.photo}
                                        />
                                    </Tooltip>
                                ))
                            }
                            {
                            item.members.invited.map((mate, index) => (
                                <Tooltip title={`${mate.userName} (pending)`} placement="top">
                                    {/* <Avatar key={index}
                                        src={mate.photo}
                                    /> */}
                                    <Avatar icon={<UserOutlined/>} 
                                    style={{
                                        backgroundColor: 'gray',
                                    }}/>
                                </Tooltip>
                            ))
                            }
                        </Avatar.Group>
                    </div>
                }
            />
        </Card>
    );
};

export default TeamCard;