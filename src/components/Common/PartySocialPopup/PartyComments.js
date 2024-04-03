import { Avatar, Card, Input, List, Skeleton } from 'antd';
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from "moment";

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
                                    <List.Item key={item?._id}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item?.author?.photo} />}
                                            title={<a href="https://ant.design">{item?.author?.userName}<br /><span style={{fontSize: "14px"}}>{item?.comment}</span></a>}
                                            description={<span style={{fontSize: "12px"}}>{moment(item?.createdAt).local().format("LLL")}</span>}
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