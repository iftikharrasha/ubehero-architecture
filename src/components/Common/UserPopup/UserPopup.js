import React from 'react';
import moment from 'moment';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import useAuth from '../../../hooks/useAuth';
import useNotyf from '../../../hooks/useNotyf';
import { Button, Avatar, Card,  Row, Col, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Paragraph } = Typography;

const UserPopup = ({popupUser}) => {
    const { loggedInUser } = useAuth();
    const user = useSelector((state) => state.profile.data)
    const jwt = localStorage.getItem("jwt");

    const { socketN } = useNotyf(user, jwt);
    
    const sendFriendRequestNotyf = () => {
        const data = {
            type: "friend_request",
            subject: "Sent you a friend request",
            subjectPhoto: loggedInUser.photo,
            invokedByName: loggedInUser.name,
            invokedById: loggedInUser.id,
            receivedByName: popupUser.userName,
            receivedById: popupUser.key, 
            route: `profile/${loggedInUser.id}`
        }

        // Send message to server
        socketN.emit("send_notification", data);
    };

    const sendFollowRequestNotyf = () => {
        const data = {
            type: "follow_request",
            subject: "Started following you",
            subjectPhoto: loggedInUser.photo,
            invokedByName: loggedInUser.name,
            invokedById: loggedInUser.id,
            receivedByName: popupUser.userName,
            receivedById: popupUser.key, 
            route: `profile/${loggedInUser.id}`
        }

        // Send message to server
        socketN.emit("send_notification", data);
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
            actions={popupUser?.key === loggedInUser.id ? null : [
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