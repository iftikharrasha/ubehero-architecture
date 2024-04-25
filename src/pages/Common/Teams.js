import React, { useEffect, useState } from 'react';
import { Avatar, Card, List, Row, Space, Typography, Popconfirm, message, Tag, Tooltip, Empty } from 'antd';
import { LikeOutlined, MessageOutlined, UserOutlined, UsergroupAddOutlined, CrownOutlined, PartitionOutlined } from '@ant-design/icons';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';
import TeamCard from '../../components/Team/TeamCard';

const { Meta } = Card;
const { Paragraph } = Typography;

const Teams = () => {
    const { handleTeamsList } = useProfile();
    const profile = useSelector(state => state.profile);
    const userId = profile?.data?._id;

    const [teams, setTeams] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const team = await handleTeamsList();
            setTeams(team);
          } catch (error) {
            setTeams([]);
            console.error('Error fetching teams list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    return (
        <PageLayout>
                <Paragraph style={{fontSize: '20px'}}>ALL TEAMS</Paragraph>
                    <div className='d-flex'>
                    {
                        teams?.length === 0 ? <Empty/> :
                            teams?.map((item, index) => (
                                <TeamCard item={item} id={item._id} key={index}/>
                            ))
                    }
                        
                </div>
        </PageLayout>
    );
};

export default Teams;