import { Avatar, Card, Col, Input, List, Row, Tag, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import DOMPurify from 'dompurify';
import moment from "moment";
import { useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import useProfile from '../../hooks/useProfile';

const { Meta } = Card;
const { TextArea } = Input;

const Ticket = () => {
    const { id } = useParams();
    const { handleTicketDetails, handleCreateSupportComment, handleSupportStatus } = useProfile();
    const profile = useSelector((state) => state.profile.data)
    const role = useSelector((state) => state.profile.role)
    const [comment, setComment] = useState(null);
    const [commentLoading, setCommentLoading] = useState(false);
    const [resolveLoading, setResolveLoading] = useState(false);

    const [ticketThread, setTicketThread] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const thread = await handleTicketDetails(id);
            setTicketThread(thread);
          } catch (error) {
            setTicketThread(null);
            console.error('Error fetching ticket thread:', error);
          }
        };
      
        fetchData(); 
    }, []);

    const onChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        setCommentLoading(true);

        try {
            const commented = await handleCreateSupportComment(id, ticketThread?.issuedBy, comment);
            if (commented) {
                setComment('');
                setCommentLoading(false);
                
                window.location.reload();
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            setCommentLoading(false);
        }
    };

    const handleResolveSupport = async () => {
        setResolveLoading(true);

        try {
            const solved = await handleSupportStatus(id);
            if (solved) {
                setResolveLoading(false);
                
                window.location.reload();
            }
        } catch (error) {
            console.error('Error resolving this ticket:', error);
            setResolveLoading(false);
        }
    };
    return (
        <PageLayout>
            {
                !ticketThread ? 
                <Spin
                    indicator={
                    <LoadingOutlined
                        style={{
                        fontSize: 24,
                        }}
                        spin
                    />
                    }
                />
                :
                <Row>
                    <Col span={18}>
                        <Card style={{width: '100%'}}>
                            <h4>{ticketThread?.title} <br /> <Tag className='mt-2 mb-4' color={ticketThread?.status === 'solved' ? 'green' : 'volcano'}>{ticketThread?.status}</Tag></h4>
                            
                            {
                            ticketThread?.thread?.length === 0 ? null :
                            <Meta
                                description={
                                <div
                                    id="scrollableDiv"
                                    style={{
                                        maxHeight: '100%',
                                        overflow: 'auto',
                                        padding: '0 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                >
                                    <List
                                        dataSource={ticketThread?.thread}
                                        renderItem={(item) => (
                                            <List.Item 
                                                key={item?._id}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item?.author?.photo} />}
                                                    title={<>{item?.author?.userName}<br /><span style={{fontSize: "14px"}}>{moment(item?.createdAt).local().format("LLL")}</span></>}
                                                    description={
                                                        <div className='rules mt-2' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.comment) }} />
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                }
                            />
                                    
                            }
                            
                            <Card style={{width: '100%'}}>
                                {
                                    ticketThread?.status === 'solved' ? 
                                    <Meta
                                      avatar={<Avatar src={ticketThread?.solvedBy?.photo} />}
                                      title={`${ticketThread?.solvedBy?.userName} | Customer Support | Underdog`}
                                      description="This issue is resolved and closed for comments. You can create a follow-up on the support page, Thank you!"
                                    />
                                    :
                                    <Meta
                                        avatar={<Avatar size={20} src={profile?.photo} />}
                                        description={
                                            <>
                                                <TextArea showCount maxLength={300} value={comment} onChange={onChange} placeholder="write a comment.." />
                                                <Button type="primary" className='mt-2' disabled={!comment ? true : false} onClick={handleSubmit} loading={commentLoading}>Submit</Button>
                                            </>
                                        }
                                    />
                                }
                            </Card>
                        </Card>
                    </Col>
                    <Col span={5} offset={1}>
                        <Card
                            title="Ticket Details"
                            bordered={false}
                            style={{
                                width: '100%',
                            }}
                        >
                            <p>Ticket ID: {ticketThread?._id}</p>
                            <p>Created At: {moment(ticketThread?.createdAt).local().format("LLL")}</p>
                            <p>Issued By: {ticketThread?.issuedBy?.userName}</p>
                            <p>Tag: <Tag color='cyan'>{ticketThread?.tag}</Tag></p>
                            <p>Status: <Tag color={ticketThread?.status === 'solved' ? 'green' : 'volcano'}>{ticketThread?.status}</Tag></p>
                        </Card>

                        {
                            ticketThread?.status === 'solved' ? null : 
                            role !== 'admin' ? null :
                            <Card
                                bordered={false}
                                style={{
                                    width: '100%',
                                    marginTop: '20px'
                                }}
                            >
                            <>
                                <h2>"Do you want to close this ticket?"</h2>
                                <Button size='small' type='primary' danger onClick={handleResolveSupport} loading={resolveLoading}>Yes, This problem is solved</Button>
                            </>
                        </Card>
                        }
                    </Col>
                </Row>
            }
        </PageLayout>
    );
};

export default Ticket;