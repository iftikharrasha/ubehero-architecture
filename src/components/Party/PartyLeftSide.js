import React, { useContext, useState } from 'react';
import { Card, Button, Row, Tabs, Typography, Modal, Form, Avatar, Tag } from 'antd';
import { PartitionOutlined, MessageOutlined, CoffeeOutlined, CrownOutlined } from '@ant-design/icons';
import PartyTop from './PartyTop';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import AnswerQuestions from './AnswerQuestions';
import useParties from '../../hooks/useParties';
import InboxContext from '../../Contexts/InboxContext/InboxContext';

const { TabPane } = Tabs;
const { Meta } = Card;

const PartyLeftSide = ({party}) => {
    const { _id, title, owner, questions, members, unlocked } = party;
    const { handlePartyJoin } = useParties();


    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    const userId = profile?.data?._id;
    const uName = profile?.data?.userName;

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [form] = Form.useForm();

    const handleOk = async () => {
        setConfirmLoading(true);
        
        const formData = form.getFieldsValue();
        const answers = Object.values(formData);
        const addedAnswer = {
            partyId: _id,
            partyName: title,
            uId: userId,
            uName: uName,
            answers: answers,
        }
        console.log('answers', addedAnswer);

        const result = await handlePartyJoin(addedAnswer);
        if(result.success){
            setOpen(false);
            setConfirmLoading(false);
        }
    };
    
    const { setShowInbox, setPopUser } = useContext(InboxContext);
    const handleInboxPop = () => {
        setPopUser(owner);
        setShowInbox(true);
    };
    
    return (
        <div className="list-group sticky-top">
          <Tabs activeKey="currentBage">
              <TabPane
                  key="currentBage"
                  tab={
                      <Row justify="left" align="middle">
                          <PartitionOutlined style={{ fontSize: '16px', transform: 'rotate(180deg)' }} /> <span>Party Details</span>
                      </Row>
                  }
              >
                <Card>
                    <PartyTop party={party} />
                    <div className="instructions text-center">
                        <h2>{title}</h2>
                        <p>
                            Created at: December 28, 2023
                        </p>
                    </div>

                    <div className="d-flex justify-content-center">
                    {
                        unlocked ? 
                        <Tag color="green">
                            JOINED
                        </Tag> :
                        title === 'Underdogg' ? null :
                        !isLoggedIn ? null : owner?._id === userId ? null :
                        members?.requested?.includes(userId) ?
                        <Button type='default' disabled>
                            REQUEST PENDING
                        </Button> : 
                        members?.invited?.includes(userId) ?
                        <Button type='default'>
                            Accept Invitation
                        </Button> : 
                        <Button type='default' onClick={() => setOpen(true)}>
                            Join Now
                        </Button>
                    }
                    </div>
                </Card>

                <Card
                    style={{
                        boxShadow: 'none',
                        marginTop: '20px',
                    }}
                    className="popCard mt-5"
                    bordered
                    actions={!isLoggedIn ? null : owner?._id === userId ? null : [
                        <Row justify="center" align="middle">
                            <Button icon={<MessageOutlined  style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }} onClick={handleInboxPop}>CHAT</Button>
                        </Row>,
                        <Row justify="center" align="middle">
                            <Button icon={<CoffeeOutlined style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }}>FOLLOW</Button>
                        </Row>
                    ]}
                    >
                    <Meta
                        avatar={<Avatar src={owner?.photo} />}
                        title={<h6>{owner?.userName}</h6>}
                        description={<p className='mb-0'><CrownOutlined style={{ fontSize: '16px', color: 'gold', marginBottom: '0px' }}/> Party Owner</p>}
                    />
                </Card>
              </TabPane>
          </Tabs>

          <Modal
              title={<h4 className='text-center pb-5'>{`${title} - Member Joining Verification`}</h4>}
              centered
              open={open}
              okText='Join Now'
              onOk={handleOk}
              onCancel={() => setOpen(false)}
              confirmLoading={confirmLoading}
              width={1000}
              okButtonProps={{
                disabled: !isFieldsFilled,
              }}
            >
              <Row gutter={[16, 16]}>
                {
                    questions[0] === 'NA' ?
                    <Col span={8}>
                        <div className='text-center'>
                            <p>Are you sure you want to join?</p>
                        </div>
                    </Col> :
                    <AnswerQuestions questions={questions} form={form} setIsFieldsFilled={setIsFieldsFilled}/>
                }
              </Row>
            </Modal>
        </div>
    );
};

export default PartyLeftSide;