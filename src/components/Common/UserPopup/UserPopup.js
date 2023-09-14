import React from 'react';
import moment from 'moment';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import useNotyf from '../../../hooks/useNotyf';
import { Button, Avatar, Card,  Row, Col, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Paragraph } = Typography;

const UserPopup = ({popupUser}) => {
    const profile = useSelector((state) => state.profile)
    const jwt = localStorage.getItem("jwt");

    const { socketN } = useNotyf(profile.data, jwt);
    
    const sendFriendRequestNotyf = () => {
        const notificationData = {
            type: "friend_request",
            subject: "Sent you a friend request",
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
                    <Button icon={<MessageOutlined  style={{ marginBottom: "6px" }}/>} style={{ fontSize: '12px' }} onClick={handleInboxPop}>CHAT</Button>
                </Row>,
                <Row justify="center" align="middle">
                    {/* <EditOutlined key="edit"  style={{ fontSize: '16px' }}/>
                    <span className="ps-1" style={{ fontSize: '12px' }}>FOLLOW</span> */}
                    <Button type="primary" onClick={sendFollowRequestNotyf}>FOLLOW</Button>
                </Row>,
                <Row justify="center" align="middle">
                    {/* <CoffeeOutlined key="ellipsis" style={{ fontSize: '16px' }}/>,
                    <span className="ps-1" style={{ fontSize: '12px' }}>ADD</span> */}
                    <Button type="primary" onClick={sendFriendRequestNotyf}>ADD</Button>
                </Row>
            ]}
            >
            <Meta
                avatar={<Avatar src={popupUser.photo} />}
                title={popupUser.userName}
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
                    <Paragraph className="mb-0">{popupUser.noOfFollowers}</Paragraph>
                    </Row>
                </Card>
                </Col>
                <Col span={8}>
                <Card bordered={false} className="popBody">
                    <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                    <Paragraph className="mb-0">Friends</Paragraph>
                    <Paragraph className="mb-0">{popupUser.noOfFollowings}</Paragraph>
                    </Row>
                </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default UserPopup;