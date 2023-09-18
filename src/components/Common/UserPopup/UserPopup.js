import React, { useState } from 'react';
import moment from 'moment';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import useNotyf from '../../../hooks/useNotyf';
import { Button, Avatar, Card,  Row, Col, Typography } from 'antd';
import { MessageOutlined, PlusCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import useProfile from '../../../hooks/useProfile';

const { Meta } = Card;
const { Paragraph } = Typography;

const UserPopup = ({popupUser}) => {
    const profile = useSelector((state) => state.profile)
    const requests = profile.data.requests;
    const jwt = localStorage.getItem("jwt");
    const { handleFriendRequestHook } = useProfile();
    const [confirmLoading, setConfirmLoading] = useState(false);
    console.log('requests', requests?.friend?.mutuals.includes(popupUser.key))
    // console.log('requests', requests?.friend?.mutuals.includes(popupUser.key))
    // console.log('requests', requests?.friend?.mutuals.includes(popupUser.key))

    const { socketN } = useNotyf(profile.data, jwt);
    
    const handleFriendRequest = async (type) => {
        setConfirmLoading(true);
        const data = {
            type: type,
            from: profile?.data?._id,
            to: popupUser.key
        }

        const result = await handleFriendRequestHook(data, popupUser);
        console.log(result);
        if(result.success){
            setConfirmLoading(false);
        }
    };

    const sendFollowRequestNotyf = () => {
        const notificationData = {
            type: "follow_request",
            subject: "Started following you",
            subjectPhoto: profile?.data?.photo,
            invokedByName: profile?.data?.userName,
            invokedById: profile?.data?._id, 
            receivedByName: popupUser.userName,
            receivedById: popupUser.key, 
            route: `profile/${profile?.data?._id}`
        }

        // Send message to server
        socketN.emit("send_notification", notificationData);
    };
    
    const { setShowInbox, setPopUser } = useContext(InboxContext);

    const handleInboxPop = () => {
        setPopUser(popupUser);
        setShowInbox(true);
    };

    return (
        <Card
            style={{
                width: 300,
                boxShadow: 'none'
            }}
            className="popCard"
            bordered={false}
            actions={!profile.signed_in ? null : popupUser?.key === profile?.data?._id ? null : [
                <Row justify="center" align="middle">
                    {/* <MessageOutlined style={{ fontSize: '16px' }} />
                    <span className="ps-1" style={{ fontSize: '12px' }}>CHAT</span> */}
                    <Button icon={<MessageOutlined  style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }} onClick={handleInboxPop} size='small'>CHAT</Button>
                </Row>,
                <Row justify="center" align="middle">
                    {/* <EditOutlined key="edit"  style={{ fontSize: '16px' }}/>
                    <span className="ps-1" style={{ fontSize: '12px' }}>FOLLOW</span> */}
                    <Button type="primary" onClick={sendFollowRequestNotyf} size='small' style={{ fontSize: '12px' }}>FOLLOW</Button>
                </Row>,
                <Row justify="center" align="middle">
                    {
                        requests && requests?.friend?.mutuals.includes(popupUser.key) ?
                        <Button size='small' style={{ fontSize: '12px' }} disabled>FRIEND</Button> : 
                        requests && requests?.friend?.sent.includes(popupUser.key) ?
                        <Button size='small' style={{ fontSize: '12px' }} disabled>PENDING</Button> :
                        requests && requests?.friend?.pending.includes(popupUser.key) ? 
                        <Button icon={<PlusCircleOutlined  style={{ marginBottom: "6px" }}/>} type="primary" size='small' style={{ fontSize: '12px' }} onClick={() => handleFriendRequest('friend_request_accept')} loading={confirmLoading}>ACCEPT</Button> :
                        <Button icon={<PlusCircleOutlined  style={{ marginBottom: "6px" }}/>} type="primary" onClick={() => handleFriendRequest('friend_request_send')} loading={confirmLoading} size='small' style={{ fontSize: '12px' }}>ADD</Button>
                    }
                </Row>
            ]}
            >
            <Meta
                avatar={<Avatar src={popupUser.photo} />}
                title={<h6>{popupUser.userName} {popupUser.emailVerified ? <CloseCircleOutlined /> : <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '12px' }}/>}</h6>}
                description={`Joined ${moment(popupUser.joined).format('ll')}`}
            />
            <Row gutter={[16, 16]} className="pt-3">
                <Col span={8}>
                <Card bordered={false} className="popBody">
                    <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                    <Paragraph className="mb-0">Country</Paragraph>
                    <Paragraph className="mb-0">BD</Paragraph>
                    </Row>
                </Card>
                </Col>
                <Col span={8}>
                <Card bordered={false} className="popBody">
                    <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                    <Paragraph className="mb-0">Follower</Paragraph>
                    <Paragraph className="mb-0">{popupUser.noOfFollowers ? popupUser.noOfFollowers : 0}</Paragraph>
                    </Row>
                </Card>
                </Col>
                <Col span={8}>
                <Card bordered={false} className="popBody">
                    <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                    <Paragraph className="mb-0">Friends</Paragraph>
                    <Paragraph className="mb-0">{popupUser.noOfFriends ? popupUser.noOfFriends : 0}</Paragraph>
                    </Row>
                </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default UserPopup;