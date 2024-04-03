import React, { useEffect, useState } from 'react';
import { Avatar, Empty, List } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import PartySocialPopup from '../Common/PartySocialPopup/PartySocialPopup';
import { addReactsIntoPost, fetchPartySocialPosts } from '../../redux/slices/partySlice';
import { useDispatch, useSelector } from 'react-redux';
import useParties from '../../hooks/useParties';
import moment from "moment";
import { useHistory } from 'react-router-dom';

const PartyTimeline = ({ unlocked, id, userId, isLoggedIn }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { handlePostReactService } = useParties();

    const partySocialPosts = useSelector((state) => state.parties.social)
    const version = partySocialPosts ? partySocialPosts.version : 0;

    useEffect(() => {
        dispatch(fetchPartySocialPosts({ id, version }));
    }, []);

    const [open, setOpen] = useState(false);
    const [readingItem, setReadingItem] = useState(null);

    const sliceDescription = (desc) => {
        const plainText = new DOMParser().parseFromString(desc, 'text/html').body.textContent;
        const words = plainText.split(/\s+/);
        const slicedWords = words.slice(0,35);
        const slicedDescription = slicedWords.join(' ');

        return slicedDescription + '...';
    }

    const handlePostRead = (item) => {
        if(!isLoggedIn){
            history.push('/login');
        }else{
            setOpen(true);
            setReadingItem(item);
        }
    }

    const handlePostReact2 = (item, type) => {
        handlePostReact(item, type);
        setReadingItem(item);
    }

    const handlePostReact = async (item, m) => {
        const data = {
            'to': item._id,
            'from': userId,
            'type': m
        }
        const party = partySocialPosts?.posts?.find(p => p._id === item._id);
        switch (m) {
            case '+':
                if (!party?.reacts?.likes?.includes(userId)) {
                    dispatch(addReactsIntoPost(data));
                    await handlePostReactService(id, data);
                }
                break;
            case '-':
                if (!party?.reacts?.dislikes?.includes(userId)) {
                    dispatch(addReactsIntoPost(data));
                    await handlePostReactService(id, data);
                }
                break;
            default:
                break;
        }
    }

    return (
        <>
        {
            partySocialPosts?.posts ? 
            <>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                            pageSize: 10,
                    }}
                    dataSource={partySocialPosts?.posts}
                    renderItem={(item, i) => (
                        <List.Item
                            key={item.title}
                            actions={
                            !isLoggedIn || !unlocked ? [] :
                            [
                                <div style={{ cursor: 'pointer' }} onClick={() => handlePostReact(item, '+')}>
                                    <LikeOutlined style={{ fontSize: '16px', color: item?.reacts?.likes?.includes(userId) ? '#F030C0' : null }} /> 
                                    <span className="ps-1" style={{ fontSize: '14px' }}>{item?.reacts?.likes?.length}</span>
                                </div>,
                                <div style={{ cursor: 'pointer' }} onClick={() => handlePostReact(item, '-')}>
                                    <DislikeOutlined style={{ fontSize: '16px', color: item?.reacts?.dislikes?.includes(userId) ? '#F030C0' : null }} /> 
                                    <span className="ps-1">{item?.reacts?.dislikes?.length}</span>
                                </div>,
                                // <div style={{ cursor: 'pointer' }} onClick={() => handlePostRead(item)}>
                                //     <MessageOutlined style={{ fontSize: '16px', color: null }} /> 
                                //     <span className="ps-1" style={{ fontSize: '14px' }}>{item?.comments?.length}</span>
                                // </div>,
                            ]}
                            extra={
                                item.thumbnail ? (
                                    <img onClick={() => handlePostRead(item)}
                                        width={272}
                                        alt="logo"
                                        src={item?.thumbnail}
                                        style={{cursor: 'pointer'}}
                                    />
                                ) : null
                            }
                        >
                            <List.Item.Meta
                                title={
                                    <>
                                        <h4 onClick={() => handlePostRead(item)} style={{marginBlockEnd: '0px', cursor: 'pointer'}}>{item?.title}</h4>
                                        <div>
                                            <span style={{fontSize: "12px"}}>
                                                {moment(item?.createdAt).local().format("LLL")}
                                            </span>
                                        </div>
                                    </>
                                }
                                description={<>
                                    <Avatar size={30} src={item?.author?.photo} />
                                    <span className='ms-2'>@{item?.author?.userName}</span>
                                </>}
                            />
                            {sliceDescription(item?.description)}
                        </List.Item>
                    )}
                />
                {
                    !readingItem ? null :
                    <PartySocialPopup 
                        id={id}
                        unlocked={unlocked}
                        userId={userId}
                        isLoggedIn={isLoggedIn}
                        readingItem={readingItem}
                        data={partySocialPosts?.posts}
                        open={open}
                        setOpen={setOpen}
                        handlePostReact={handlePostReact}
                        handlePostReact2={handlePostReact2}
                    /> 
                }
            </>
            : 
            <Empty/>
        }
        </>
    );
};

export default PartyTimeline;