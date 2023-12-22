import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Modal, Popconfirm, Row, message, Form, Typography } from 'antd';
import { UsergroupAddOutlined, PlusCircleOutlined, PartitionOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddTeam from './AddTeam';
import { useSelector } from 'react-redux';
import useProfile from '../../hooks/useProfile';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

const MyTeams = ({myTeams}) => {
    const limit = 2;
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [memberError, setMemberError] = useState(null);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const uId = useSelector((state) => state.profile.data._id);
    const { handleTeamCreation, handleVerifyMembers } = useProfile();

    const confirm = (e) => {
        message.success('Clicked');
    };

    const handleOk = async () => {
      setConfirmLoading(true);
      
      const formData = form.getFieldsValue();
      let addTeam = {
        ...formData,
        captainId: uId,
      }

      const result = await handleVerifyMembers(addTeam.members);
      if(result.success){
        addTeam = {
            ...addTeam,
            members: {
                invited: result.data
            },
        }
        console.log(addTeam)
        const team = await handleTeamCreation(addTeam);
        if(team.success){
            setOpen(false);
            setConfirmLoading(false);
        }
      }else{
        setMemberError(result.message);
        setConfirmLoading(false);
      }
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h2 className='mb-4'>My Teams: {myTeams.length}</h2>
                <Button danger onClick={() => setOpen(true)}>Create Team</Button>
            </div>
            <div className='d-flex'>
                {
                    myTeams.length === 0 ? <p className="mt-3">No teams found!</p> :
                        myTeams.map((item, index) => (
                            <Card key={index}
                                style={{
                                width: 300,
                                margin: '0 1rem 0 1rem',
                            }}
                                cover={
                                    <img
                                        alt="example"
                                        src={item.coverPhoto}
                                    />
                                }
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
                                    title={<div><Link to={`/team/${item._id}`}><Paragraph className='mb-0'>{item.teamName}</Paragraph></Link></div>}
                                    description={`Created At: ${moment(item.createdAt).format('ll')}`}
                                />
                            </Card>
                        ))
                }
                
            </div>

            <Modal
              title={<h4 className='text-center pb-5'>Create a new team:</h4>}
              centered
              open={open}
              okText='Connect'
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={() => setOpen(false)}
              width={1000}
              okButtonProps={{
                disabled: !isFieldsFilled,
              }}
            >
              <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <AddTeam limit={limit} form={form} setIsFieldsFilled={setIsFieldsFilled} memberError={memberError} setMemberError={setMemberError}/>
                    </Col>
              </Row>
            </Modal>
        </div>
    );
};

export default MyTeams;