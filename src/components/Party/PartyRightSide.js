import React from 'react';
import { Avatar, List, Card } from 'antd';
import { useSelector } from 'react-redux';

const PartyRightSide = ({id}) => {
    const parties = useSelector((state) => state.parties.data);
    const remainingItems = parties.filter((item) => item._id !== id);
    
    return (
        <div className="list-group sticky-top">
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
                                    title={<a href="https://ant.design">{item.title}</a>}
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