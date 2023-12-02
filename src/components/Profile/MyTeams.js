import React from 'react';
import { Avatar, Card, Popconfirm, Row, message } from 'antd';
import { UsergroupAddOutlined, PlusCircleOutlined, PartitionOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Meta } = Card;

const MyTeams = ({myTeams}) => {
    const confirm = (e) => {
        message.success('Clicked');
    };

    return (
        <div>
            <h2 className='mb-4'>My Teams: {myTeams.length}</h2>
            <div className='d-flex justify-between'>
                {
                    myTeams.length === 0 ? <p className="mt-3">No teams found!</p> :
                        myTeams.map((item, index) => (
                            <Card key={index}
                                style={{
                                width: 300,
                            }}
                                // cover={
                                //     <img
                                //         alt="example"
                                //         src={item.photo}
                                //     />
                                // }
                                actions={[
                                    <Row justify="center" align="middle">
                                        <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>0/{item.members.length}</span>
                                    </Row>,
                                    <Row justify="center" align="middle">
                                        <>
                                            <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                            <span className="ps-1" style={{ fontSize: '14px' }}>freefire</span>
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
                                    title={item.teamName}
                                    description={`Created At: ${moment(item.createdAt).format('ll')}`}
                                />
                            </Card>
                        ))
                }
                
            </div>
        </div>
    );
};

export default MyTeams;