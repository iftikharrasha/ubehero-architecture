import React, { useState } from 'react';
import { Card, Button, Row, Tabs, Typography, Modal, Form } from 'antd';
import { PartitionOutlined } from '@ant-design/icons';
import PartyTop from './PartyTop';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import AnswerQuestions from './AnswerQuestions';
import useProfile from '../../hooks/useProfile';

const { TabPane } = Tabs;

const PartyLeftSide = ({party}) => {
    const { _id, title, owner, questions, members } = party;
    const { handlePartyJoin } = useProfile();


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
                    <PartyTop
                        party={party} 
                    />
                    <div className="instructions text-center">
                        <h2>{title}</h2>
                        <p>
                            Created at: December 28, 2023
                        </p>
                    </div>

                    {
                        !isLoggedIn ? null : owner?._id === userId ? null :
                        members.requested.includes(userId) ?
                        <Button type='default' disabled>
                            REQUEST PENDING
                        </Button> : 
                        <Button type='default' onClick={() => setOpen(true)}>
                            Join Now
                        </Button>
                    }
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