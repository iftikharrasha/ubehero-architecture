import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Modal, Row, message, Form, Typography, Tooltip, Tag } from 'antd';
import { UsergroupAddOutlined, CrownOutlined, PartitionOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddTeam from './AddTeam';
import { useSelector } from 'react-redux';
import useProfile from '../../hooks/useProfile';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

const MyTeams = ({myTeams}) => {
    const limit = 2;
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [teamError, setTeamError] = useState(null);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const { _id, userName, gameAccounts } = useSelector((state) => state.profile.data);

    const teams = useSelector((state) => state.myTeams.data);
    const { handleTeamCreation, handleVerifyTeamMemberAdd } = useProfile();
    const [filteredCrossPlatforms, setFilteredCrossPlatforms] = useState([]);

    const arraysHaveSameElements = (array1, array2) => {
        // Sort the arrays
        const sortedArray1 = array1.slice().sort();
        const sortedArray2 = array2.slice().sort();
        console.log(sortedArray1, sortedArray2)
    
        // Check if the sorted arrays have the same elements
        return JSON.stringify(sortedArray1) === JSON.stringify(sortedArray2);
    }

    const handleOk = async () => {
        setConfirmLoading(true);
        
        const formData = form.getFieldsValue();
        const { category, members, platform, teamName } = formData;
        let addTeam = {
            captainId: _id,
            category: category,
            teamName: teamName,
            members: members,
            platforms: [platform],
            crossPlatforms: filteredCrossPlatforms,
        }

        //1. check if a same team category with same platform created by this player
        let teamExists = null;
        if(addTeam.platforms.includes('cross')){
            teamExists = teams.find(t => t.category === category && arraysHaveSameElements(t.crossPlatforms, addTeam.crossPlatforms));
            console.log('1', teamExists)
        }else{
            teamExists = teams.find(t => t.category === category && arraysHaveSameElements(t.platforms, addTeam.platforms));
            console.log("2", teamExists)
        }

        if (teamExists) {
            setTeamError({
                message: `You already have a team for ${category}`,
                description: 'Please choose a different game',
            });
            setConfirmLoading(false);
        } else {
            //2. check if user has the game account for this game
            const gameAccountExists = gameAccounts.filter((account) => {
                if(addTeam.platforms.includes('cross')){
                    console.log('cross', addTeam, account)
                  return addTeam.crossPlatforms.includes(account.platform) && account.category === category;
                }else{
                  return addTeam.platforms.includes(account.platform) && account.category === category;
                }
            });
            if(gameAccountExists.length === 0) {
                setTeamError({
                    message: `You do not have a game account for ${category}`,
                    description: 'Please add your game account first',
                });
                setConfirmLoading(false);
            }else{
                const result = await handleVerifyTeamMemberAdd(addTeam);
                console.log(result)
                if(result.success){
                    addTeam = {
                        ...addTeam,
                        members: {
                            invited: result.data
                        },
                    }
                    console.log(addTeam)
                    const team = await handleTeamCreation(addTeam);
                    if(team.success){
                        setOpen(false);
                        setConfirmLoading(false);
                    }
                }else{
                    setTeamError({
                        message: result.message,
                        description: "Type your friends username correctly!",
                    });
                    setConfirmLoading(false);
                }
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div></div>
                <Button danger onClick={() => setOpen(true)}>Create Team</Button>
            </div>
            <div className='d-flex mt-4'>
                {
                    myTeams.length === 0 ? <p className="mt-3">No teams found!</p> :
                        myTeams.map((item, index) => (
                            <Card key={index}
                                style={{
                                    width: 300,
                                    margin: '0 1rem 0 1rem',
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src={item.coverPhoto}
                                        style={{
                                            maxHeight: 140,
                                            objectFit: 'cover'
                                        }}
                                    />
                                }
                                actions={[
                                    <Row justify="center" align="middle">
                                        <Tag color={`${item?.status === 'active' ? 'green' : 'gold'}`}>{item.status}</Tag>
                                    </Row>,
                                    <Row justify="center" align="middle">
                                        <>
                                            <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                            <span className="ps-1" style={{ fontSize: '14px' }}>{item.category}</span>
                                        </>
                                    </Row>,
                                    <Row justify="center" align="middle">
                                        <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>{item.members.mates.length+1}/3</span>
                                    </Row>
                                    ,
                                ]}
                                >
                                <Meta
                                    avatar={<Avatar src={item.photo} />}
                                    title={<div><Link to={`/team/${item._id}`}><Paragraph className='mb-0'>
                                        {item.captainId._id === _id ? <CrownOutlined style={{ fontSize: '18px', color: 'gold' }}/> : ""} {item.teamName}</Paragraph></Link></div>}
                                    // description={`Created At: ${moment(item.createdAt).format('ll')}`}
                                    description={
                                        <div className="d-flex">
                                            <Avatar.Group
                                                shape="square"
                                                maxCount={14}
                                                size="small"
                                                maxStyle={{
                                                color: '#f56a00',
                                                backgroundColor: '#fde3cf',
                                                }}
                                            >
                                                <Tooltip title={`${item.captainId.userName}`} placement="top">
                                                    <Avatar src={item.captainId.photo}/>
                                                </Tooltip>
                                                {
                                                    item.members.mates.map((mate, index) => (
                                                        <Tooltip title={`${mate.userName}`} placement="top">
                                                            <Avatar key={index}
                                                                src={mate.photo}
                                                            />
                                                        </Tooltip>
                                                    ))
                                                }
                                                {
                                                item.members.invited.map((mate, index) => (
                                                    <Tooltip title={`${mate.userName} (pending)`} placement="top">
                                                        {/* <Avatar key={index}
                                                            src={mate.photo}
                                                        /> */}
                                                        <Avatar icon={<UserOutlined/>} 
                                                        style={{
                                                            backgroundColor: 'gray',
                                                        }}/>
                                                    </Tooltip>
                                                ))
                                                }
                                            </Avatar.Group>
                                        </div>
                                    }
                                />
                            </Card>
                        ))
                }
                
            </div>

            <Modal
              title={<h4 className='text-center pb-5'>CREATE A NEW TEAM</h4>}
              centered
              open={open}
              okText='Connect'
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={() => setOpen(false)}
              width={1000}
              okButtonProps={{
                disabled: !isFieldsFilled,
              }}
            >
              <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <AddTeam userName={userName} limit={limit} form={form} setIsFieldsFilled={setIsFieldsFilled} teamError={teamError} setTeamError={setTeamError} filteredCrossPlatforms={filteredCrossPlatforms} setFilteredCrossPlatforms={setFilteredCrossPlatforms}/>
                    </Col>
              </Row>
            </Modal>
        </div>
    );
};

export default MyTeams;