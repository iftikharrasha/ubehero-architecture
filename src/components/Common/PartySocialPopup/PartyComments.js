import { Avatar, Card, Input, List, Skeleton, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeleteOutlined, StopOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from "moment";
import ReportTags from '../Report/ReportTags';

const { Meta } = Card;
const { TextArea } = Input;

const PartyComments = ({loadMoreData, loading, commentData, profilePic, comment, setComment, setConfirmLoading }) => {
    const commentListRef = useRef(null);

    useEffect(() => {
        if (commentListRef.current) {
          commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
        }
      }, [commentData]);

    const onChange = (e) => {
        setComment(e.target.value);
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
        <>
            <Card style={{width: '100%'}}>
                
                {
                commentData?.length === 0 ? null :
                <Meta
                    description={
                    <div
                        ref={commentListRef}
                        id="scrollableDiv"
                        style={{
                            maxHeight: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <h6 className='py-3 text-center' style={{fontSize: "14px"}}>Comment Section</h6>
                        <InfiniteScroll
                            dataLength={commentData?.length}
                            next={loadMoreData}
                            hasMore={loading}
                            loader={
                                <Skeleton
                                    avatar
                                    paragraph={{
                                        rows: 1,
                                    }}
                                    active
                                />
                            }
                            // endMessage={<Divider plain>x</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                dataSource={commentData}
                                renderItem={(item) => (
                                    <List.Item 
                                        key={item?._id}
                                        actions={
                                            item?._id === deletingId ?
                                            [
                                                <CheckOutlined style={{ color: '#52c41a', marginRight: '5px', cursor: 'pointer'}} onClick={() => handleToggle(item?._id, 'delete')}/>, 
                                                <CloseOutlined style={{ color: '#eb2f96', cursor: 'pointer'}} onClick={() => handleToggle(item?._id, 'close')}/>
                                            ] :
                                            item?._id === reportingId ?
                                            [
                                                <CloseOutlined style={{ color: '#eb2f96', cursor: 'pointer'}} onClick={() => handleToggle(item?._id, 'close')}/>
                                            ] :
                                            [
                                                <DeleteOutlined style={{ fontSize: '14px', color: '#eb2f96' }} onClick={() => handleToggle(item?._id, 'check')}/> , 
                                                <StopOutlined style={{ fontSize: '14px', color: '#eb2f96' }} onClick={() => handleToggle(item?._id, 'report')}/>
                                            ]
                                        }
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item?.author?.photo} />}
                                            title={
                                                <a href="https://ant.design">{item?.author?.userName}<br /><span style={{fontSize: "14px"}}>{item?.comment}</span></a>}
                                                description={
                                                    item?._id === deletingId ?
                                                    <span style={{fontSize: "12px"}}>Are you sure you want to delete this item?</span> :
                                                    item?._id === reportingId ?
                                                    <div className='pt-2'>
                                                        <ReportTags handleToggle={handleToggle} id={item?._id} type="comment"/>
                                                    </div>
                                                     :
                                                    <span style={{fontSize: "12px"}}>{moment(item?.createdAt).local().format("LLL")}</span>
                                                }
                                        />
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    </div>
                    }
                />
                        
                }
                <Card style={{width: '100%'}}>
                    <Meta
                        avatar={<Avatar size={20} src={profilePic} />}
                        description={
                            <>
                                <TextArea showCount maxLength={300} value={comment} onChange={onChange} placeholder="write a comment.." />
                            </>
                        }
                    />
                </Card>
            </Card>
        </>
    );
};

export default PartyComments;