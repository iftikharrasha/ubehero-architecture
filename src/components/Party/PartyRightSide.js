import React from 'react';
import { Avatar, List, Card, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PartyRightSide = ({id, setOpen, unlocked}) => {
    const parties = useSelector((state) => state.parties.data);
    const remainingItems = parties.filter((item) => item._id !== id);

    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    
    return (
        <div className="list-group sticky-top">
            {
                !isLoggedIn || !unlocked ? null : 
                <div className="d-flex justify-content-end mb-3">
                    <Button danger onClick={() => setOpen(true)}>Write Post</Button>
                </div>
            }
            <Card>
                <div className="instructions">
                    <h4>Parties you may also like</h4>
                    <List
                        itemLayout="horizontal"
                        dataSource={remainingItems}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.photo} />}
                                    title={<Link to={`/party/details/${item._id}`}>{item.title}</Link>}
                                    description={`@${item.owner.userName}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        </div>
    );
};

export default PartyRightSide;