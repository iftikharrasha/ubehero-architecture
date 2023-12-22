import React, { useEffect } from 'react';
import { Avatar, List, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import PageLayout from '../../components/PageLayout/PageLayout';
import { fetchParties } from '../../redux/slices/partySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

const Parties = () => {
    const dispatch = useDispatch();
    const parties = useSelector((state) => state.parties.data);
    const versionParty = useSelector((state) => state.parties.version);

    useEffect(() => {
        dispatch(fetchParties(versionParty));
    }, []);

    const separatedItem = parties.find((item) => item.title === 'Underdogg');
    const remainingItems = parties.filter((item) => item.title !== 'Underdogg');
    console.log(separatedItem, remainingItems)

    return (
        <PageLayout>
            {
                separatedItem && (
                    <List
                        itemLayout="vertical"
                        size="small"
                        grid={{
                        gutter: 16,
                        column: 5,
                        }}
                        dataSource={[separatedItem]} // Wrap separatedItem in an array
                        renderItem={(item) => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.photo} />}
                                title={<div><Link to={`/party/details/${item._id}`}><Paragraph className='mb-0'>{item.title}</Paragraph></Link></div>}
                                description={item.owner.userName}
                            />
                            {item.content}
                        </List.Item>
                        )}
                    />
                )
            }

            {
                remainingItems.length > 0 && ( // Check if remainingItems is not empty
                    <div>
                        <h5 className='card-title my-4'>Other Parties</h5>
                        <List
                            itemLayout="vertical"
                            size="small"
                            grid={{
                                gutter: 16,
                                column: 5,
                            }}
                            dataSource={remainingItems} // Pass remainingItems as is
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.photo} />}
                                        title={<div><Link to={`/party/details/${item._id}`}><Paragraph className='mb-0'>{item.title}</Paragraph></Link></div>}
                                        description={item.owner.userName}
                                    />
                                    {item.content}
                                </List.Item>
                            )}
                        />
                    </div>
                )
            }
        </PageLayout>
    );
};

export default Parties;