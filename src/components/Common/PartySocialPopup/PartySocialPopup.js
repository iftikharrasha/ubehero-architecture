import React, { useEffect, useState } from 'react';
import { Row, Avatar, List, Modal, Card, Button, Skeleton, Divider, Space, Input } from 'antd';
import { LikeOutlined, MessageOutlined, DislikeOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import DOMPurify from 'dompurify';
import useProfile from '../../../hooks/useProfile';

const { Meta } = Card;
const { TextArea } = Input;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

const PartySocialPopup = ({id, readingItem, open, setOpen, profilePic}) => {
    const { handleGetPartySocialPostComments } = useProfile();
    const [commentData, setCommentData] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
      console.log('Change:', e.target.value);
    };

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const comments = await handleGetPartySocialPostComments(id, readingItem?._id);
            setCommentData([...commentData, ...comments])
            setLoading(false);
        } catch (error) {
            setCommentData([]);
            setLoading(false);
            console.error('Error fetching post list:', error);
        }
      };

    useEffect(() => {
        loadMoreData();
    }, [open]);

    return (
        <Modal
            title={<h4 className='text-center pb-3'>{`${readingItem?.title}`}</h4>}
            centered
            open={open}
            okText='Next'
            onOk={null}
            onCancel={() => setOpen(false)}
            // confirmLoading={confirmLoading}
            width={700}
            okButtonProps={{
                disabled: true,
            }}
            >
            <Row gutter={[16, 16]}>
                <Card
                    style={{
                        width: '100%',
                    }}
                    cover={
                        readingItem?.thumbnail ? 
                        <img style={{width: '100%'}}
                            alt="example"
                            src={readingItem?.thumbnail}
                        /> : null
                    }
                    actions={[
                        <IconText icon={LikeOutlined} text={readingItem?.reacts?.likes?.length} key="list-vertical-like-o" />,
                        <IconText icon={DislikeOutlined} text={readingItem?.reacts?.dislikes?.length} key="list-vertical-dislike-o" />,
                        <IconText icon={MessageOutlined} text={readingItem?.comments?.length} key="list-vertical-message" />,
                    ]}
                >
                        <Meta
                            avatar={<Avatar src={readingItem?.author?.photo} />}
                            title={readingItem?.author?.username}
                            description={
                                <div className='rules' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(readingItem?.description) }} />
                            }
                        />
                </Card>
                <Card style={{width: '100%'}}>
                    <Meta
                        description={
                        <div
                            id="scrollableDiv"
                            style={{
                                maxHeight: 400,
                                overflow: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            }}
                        >
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
                                endMessage={<Divider plain>You've completely caught up</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={commentData}
                                    renderItem={(item) => (
                                        <List.Item key={item?._id}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item?.author?.photo} />}
                                                title={<a href="https://ant.design">{item?.author?.userName}<br /><span style={{fontSize: "12px"}}>Saturday 12pm</span></a>}
                                                description={item?.comment}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>
                        </div>
                        }
                    />
                </Card>
                <Card style={{width: '100%'}}>
                    <Meta
                        avatar={<Avatar size={20} src={profilePic} />}
                        description={
                            <>
                                <TextArea showCount maxLength={300} onChange={onChange} placeholder="write a comment.." />
                                <Button type="primary" className='mt-2'>Comment</Button>
                            </>
                        }
                    />
                </Card>
            </Row>
        </Modal>
    );
};

export default PartySocialPopup;