import React, { useEffect, useState, useMemo } from 'react';
import { Row, Avatar, Modal, Card, Tag } from 'antd';
import { LikeOutlined, MessageOutlined, DislikeOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';
import PartyComments from './PartyComments';
import useParties from '../../../hooks/useParties';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ReportTags from '../Report/ReportTags';

const { Meta } = Card;

const PartySocialPopup = ({ unlocked, id, userId, isLoggedIn, readingItem, open, setOpen, handlePostReact, handlePostReact2 }) => {
    const { handleGetPartySocialPostComments, handleCreatePartySocialComment } = useParties();
    const [commentData, setCommentData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [comment, setComment] = useState(null);
    const profile = useSelector(state => state.profile);
    const profilePic = profile?.data?.photo;

    const debouncedLoadMoreData = useMemo(() => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(loadMoreData, 300); // Adjust the debounce delay as needed
        };
    }, []);

    useEffect(() => {
        if (open) {
            loadMoreData();
        } else {
            setCommentData([]); // Clear commentData when the popup is closed
        }
    }, [open]);

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const comments = await handleGetPartySocialPostComments(id, readingItem?._id);
            if (comments && comments.length > 0) {
                setCommentData([...commentData, ...comments]);
            }
            setLoading(false);
        } catch (error) {
            setCommentData([]);
            setLoading(false);
            console.error('Error fetching post list:', error);
        }
    };

    const handleSubmit = async () => {
        setCommentLoading(true);
        const newComment = {
            _id: commentData.length + 1,
            author: {
                _id: profile?.data?._id,
                userName: profile?.data?.userName,
                photo: profile?.data?.photo,
            },
            comment: comment,
            // "createdAt": "2023-07-02T16:31:01.818Z",
        };

        try {
            const commented = await handleCreatePartySocialComment(id, readingItem?._id, comment);
            if (commented) {
                setComment('');
                setCommentData([...commentData, newComment]);
                setCommentLoading(false);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            setCommentLoading(false);
        }
    };

    const [deletingId, setDeletingId] = useState(null);
    const [reportingId, setReportingId] = useState(null);
    const handleToggle = (id, type) => {
        if(type === 'check') {
            setDeletingId(id);
        }else if(type === 'close'){
            setDeletingId(null);
            setReportingId(null);
        }else if(type === 'delete'){
            setDeletingId(null);
        }else if(type === 'report'){
            setDeletingId(null);
            setReportingId(id);
        }
    }

    return (
        <Modal
            title={null}
            centered
            open={open}
            okText='Comment'
            onOk={handleSubmit}
            onCancel={() => setOpen(false)}
            confirmLoading={commentLoading}
            width={700}
            okButtonProps={{
                disabled: !comment,
            }}
        >
            <Row gutter={[16, 16]}>
                <Card
                    style={{
                        width: '100%',
                    }}
                    cover={
                            <>
                                {
                                     !readingItem?.thumbnail ? null :
                                     <img style={{ width: '100%' }}
                                         alt="example"
                                         src={readingItem?.thumbnail}
                                     />
                                }
                                <h4 className='ps-4 pt-4'>{`${readingItem?.title}`}</h4>
                                <div className='px-4'>
                                    {
                                        !isLoggedIn || !unlocked ? null :
                                        readingItem?._id === deletingId ?
                                        <div class="d-flex">
                                            <span style={{fontSize: "14px", marginRight: '5px', cursor: 'pointer'}}>
                                                Are you sure you want to delete this item?
                                            </span>
                                            <CheckOutlined style={{ color: '#52c41a', marginRight: '5px', cursor: 'pointer'}} onClick={() => handleToggle(readingItem?._id, 'delete')}/> 
                                            <CloseOutlined style={{ color: '#eb2f96', cursor: 'pointer'}} onClick={() => handleToggle(readingItem?._id, 'close')}/>
                                        </div> :
                                        readingItem?._id === reportingId ?
                                        <div class="d-flex">
                                            <div>
                                                <span style={{fontSize: "14px", marginRight: '5px', cursor: 'pointer'}}>
                                                    Report a problem
                                                </span>
                                                <ReportTags id={readingItem?._id} type="post"/>
                                            </div>
                                            <CloseOutlined style={{ color: '#eb2f96', cursor: 'pointer'}} onClick={() => handleToggle(readingItem?._id, 'close')}/>
                                        </div>  :
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span style={{fontSize: "14px"}}>
                                                {moment(readingItem?.createdAt).local().format("LLL")}
                                            </span>
                                            <div>
                                                <DeleteOutlined style={{ fontSize: '14px', marginLeft: '5px', color: '#eb2f96' }} onClick={() => handleToggle(readingItem?._id, 'check')}/> 
                                                <StopOutlined style={{ fontSize: '14px', marginLeft: '15px', color: '#eb2f96' }} onClick={() => handleToggle(readingItem?._id, 'report')}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                    }
                    actions={
                    !isLoggedIn || !unlocked ? [] :
                    [
                        <div style={{ cursor: 'pointer' }} onClick={() => handlePostReact2(readingItem, '+')}>
                            <LikeOutlined style={{ fontSize: '16px', color: readingItem?.reacts?.likes?.includes(userId) ? '#6abe39' : null }} /> 
                            <span className="ps-1" style={{ fontSize: '14px' }}>{readingItem?.reacts?.likes?.length}</span>
                        </div>,
                        <div style={{ cursor: 'pointer' }} onClick={() => handlePostReact2(readingItem, '-')}>
                            <DislikeOutlined style={{ fontSize: '16px', color: readingItem?.reacts?.dislikes?.includes(userId) ? '#F030C0' : null }} /> 
                            <span className="ps-1">{readingItem?.reacts?.dislikes?.length}</span>
                        </div>,
                        <div style={{ cursor: 'pointer' }}>
                            <MessageOutlined style={{ fontSize: '16px', color: null }} /> 
                            <span className="ps-1" style={{ fontSize: '14px' }}>{commentData?.length}</span>
                        </div>,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src={readingItem?.author?.photo} />}
                        title={readingItem?.author?.username}
                        description={
                            <div className='rules' 
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(readingItem?.description) }} 
                            />
                        }
                    />
                </Card>
                {
                    !isLoggedIn || !unlocked ? null :
                    <PartyComments
                        loadMoreData={debouncedLoadMoreData} 
                        loading={loading}
                        commentData={commentData}
                        setCommentData={setCommentData}
                        comment={comment}
                        setComment={setComment}
                        profilePic={profilePic}
                    />
                }
            </Row>
        </Modal>
    );
};

export default PartySocialPopup;
