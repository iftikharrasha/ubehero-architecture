import React, { useEffect, useState } from 'react';
import { Avatar, List, Card, Button } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useParties from '../../hooks/useParties';

const PartyRightSide = ({id, setOpen, unlocked}) => {
    // const parties = useSelector((state) => state.parties.data);
    // const remainingItems = parties.filter((item) => item._id !== id);

    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;

    
    
    const [relatedParties, setRelatedParties] = useState([]);
    const { handlePartiesYouMayKnowList } = useParties();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const related = await handlePartiesYouMayKnowList(id);
            setRelatedParties(related);
          } catch (error) {
            setRelatedParties([]);
            console.error('Error fetching parties list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);
    
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
                        dataSource={relatedParties}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.photo} />}
                                    title={<Link to={`/party/details/${item._id}`}>{item.title}</Link>}
                                    description={<p className='mb-0'><CrownOutlined style={{ fontSize: '16px', color: 'gold', marginBottom: '0px' }}/> {item.owner.userName}</p>}
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