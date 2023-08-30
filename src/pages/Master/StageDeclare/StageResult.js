import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import useTournament from '../../../hooks/useTournament';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CurrentMatch from "./CurrentMatch";
import { Link } from "react-router-dom";
import { Avatar, Button, Card, Divider, Image, List, Modal, Select, Space } from "antd";
import { CrownOutlined } from '@ant-design/icons';
import SelectWinner from "./SelectWinner";

const { Meta } = Card;

const StageResult = ({ tId, compMode, updatedTournament, setUpdatedTournament, currentMatch }) => {
    // console.log("currentMatch", currentMatch)
    const { handleTournamentResult, errorMessage } = useTournament();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Results are sensitive, make sure you have valid informations.');

    const [winnerSelected, setWinnerSelected] = useState(null);
    
    const onSelect = (value) => {
        const selectedParticipant = currentMatch.participants.find(
          (participant) => participant.name === value
        );
        if (selectedParticipant) {
            setWinnerSelected(selectedParticipant)
        }
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };
    
    const showModal = () => {
      setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleResultPublish = () => {
        setModalText('Publishing please wait...');
        setConfirmLoading(true);

        if(compMode === 'knockout'){
            if(winnerSelected){
                handleTournamentResult(tId, winnerSelected);
            }else{
                handleCancel();
            }
        }else{
            if(winnersSelected){
                const winnerIds = winnersSelected.map((winner) => winner._id);
                handleTournamentResult(tId, winnerIds);
            }else{
                handleCancel();
            }
        }
    };

    const [routeKey, setRouteKey] = useState('claims');

    const onChangeTab = (key) => {
        setRouteKey(key);
    };

    const claims = [
        {
          image: updatedTournament.tournamentThumbnail,
          gamer: "gamer1",
          date: "1 hour ago"
        },
        {
          image: updatedTournament.tournamentThumbnail,
          gamer: "gamer2",
          date: "2 hours ago"
        },
        {
          image: updatedTournament.tournamentThumbnail,
          gamer: "gamer3",
          date: "3 hours ago"
        },
    ];

    const [contenders, setContenders] = useState(updatedTournament.leaderboards);
    const [winnersSelected, setWinnersSelected] = useState([]);
    console.log("SET", winnersSelected)

    const onLadderWinnerSelect = (value) => {
        const selectedParticipant = contenders.find(
          (participant) => participant.userName === value
        );

        if (selectedParticipant) {
            // Remove the selected participant from contenders
            const updatedContenders = contenders.filter(
                (participant) => participant._id !== selectedParticipant._id
            );

            // Add the selected participant to winnerSelected
            const updatedWinnerSelected = [...winnersSelected, selectedParticipant];

            setContenders(updatedContenders);
            setWinnersSelected(updatedWinnerSelected);
        }
    };

    let content; 
    switch (compMode) {
        case 'knockout':
            content = (
                <>
                    <h5>Phase 3: Battle Time</h5>
                           
                    <Form className="w-100 px-5 pb-4">
                        <Divider orientation="right">
                            <Space>
                                <Link to={`/tournament/details/${updatedTournament._id}`}>
                                    <Button type="default">
                                        Visit Tournament
                                    </Button>
                                </Link>
                                <Button type="primary" onClick={showModal}>
                                    Publish
                                </Button>
                            </Space>
                        </Divider>
        
                        {
                            currentMatch &&
                            <>
                                <CurrentMatch currentMatch={currentMatch}/>
                                
                                <div className="d-flex justify-content-center flex-column align-items-center">
                                    <h5>Pick the winner of this match</h5>
                                    <Select
                                    size="medium"
                                    showSearch
                                    placeholder="Select a player"
                                    optionFilterProp="children"
                                    onChange={onSelect}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={
                                        currentMatch.participants.map((participant) => ({
                                            value: participant.name,
                                            label: participant.name,
                                        }))}
                                    />
                                </div>
                            </>
                        }

                        {
                            errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                        }
                
                        <Modal
                            title="Are you sure you want to publish the result?"
                            open={open}
                            onOk={handleResultPublish}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <p>{modalText}</p>
                        </Modal>
                    </Form> 
                </>
            );
        break;

        case 'ladder':
            content = (
                <>
                    <h5>Phase 3: Battle Time</h5>
                           
                    <Form className="w-100 px-5 pb-4">
                            <Divider orientation="right">
                                <Space>
                                    <Link to={`/tournament/details/${updatedTournament._id}`}>
                                        <Button type="default">
                                            Visit Tournament
                                        </Button>
                                    </Link>
                                    {
                                        winnersSelected.length === 3 ? 
                                        <Button type="primary" onClick={showModal}>
                                            Publish
                                        </Button> : null
                                    }
                                </Space>
                            </Divider>
        
                        <div className="w-100 px-5 pb-4">
                            <Tabs
                                id="controlled-tab-example"
                                className="mb-3"
                                defaultActiveKey={routeKey}
                                onChange={onChangeTab}
                            >
                                <Tab eventKey="claims" title="Claims">
                                    <p>This section will be unlocked once the tourament starts!</p>
                                    
                                    <List
                                        grid={{
                                            gutter: 16,
                                            column: 3,
                                        }}
                                        dataSource={claims}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <Card title={`Screenshot ` + parseInt(index+1)}
                                                    cover={
                                                        <Image
                                                            width="100%"
                                                            src={item.image}
                                                            className="p-3"
                                                        />
                                                    }
                                                >
                                                    <Meta
                                                        avatar={<Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />}
                                                        title={item.gamer}
                                                        description={item.date}
                                                    />
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                </Tab>
                                <Tab eventKey="result" title="Result">
                                    <div className="matchDetails ladderResult">
                                        <div className="match-details-info">
                                            <CrownOutlined className="crown"/>
                                            <img className="winner" src={winnersSelected[0] ? winnersSelected[0].photo : "https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-gold-medal-1st-place-award-icon-png-image_6093703.png"} alt="Purple Death Cadets"/>
                                            <h2>
                                                {winnersSelected[0] ? winnersSelected[0].userName : <SelectWinner disabled={false} contenders={contenders} onSelect={onLadderWinnerSelect} position={"1st"}/>}
                                                <br />
                                                <span>1st position</span>
                                            </h2>
                                        </div>

                                        <div className="page-banner-inner">
                                            <div className="match-details-header">
                                                <img className="left" src={winnersSelected[1] ? winnersSelected[1].photo : "https://ubehero.com/static/media/2nd.2a8e8856.jpg"} alt="2nd"/> {/* https://ubehero.com/static/media/2nd.2a8e8856.jpg */}
                                                <h3 className="left-team">
                                                    {winnersSelected[1] ? winnersSelected[1].userName : <SelectWinner disabled={winnersSelected[0] ? false : true} contenders={contenders} onSelect={onLadderWinnerSelect} position={"2nd"}/>}   
                                                    <br />
                                                    <span>2nd position</span>
                                                </h3>
                                                <div className="vs">
                                                    <img className="left" src="https://ubehero.com/static/media/winner.d0150a62.png" alt="3rd"/>
                                                </div>
                                                <h3 className="right-team">
                                                    {winnersSelected[2] ? winnersSelected[2].userName : <SelectWinner disabled={winnersSelected[1] ? false : true} contenders={contenders} onSelect={onLadderWinnerSelect} position={"3rd"}/>}   
                                                    <br />
                                                    <span>3rd position</span>
                                                </h3>
                                                <img className="right" src={winnersSelected[2] ? winnersSelected[2].photo : "https://ubehero.com/static/media/3rd.26240a12.jpg"} alt="3rd"/> {/* https://ubehero.com/static/media/3rd.26240a12.jpg */}
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                    
                            <Modal
                                title="Are you sure you want to publish the result?"
                                open={open}
                                onOk={handleResultPublish}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <p>{modalText}</p>
                            </Modal>
                        </div>
                        {
                            errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                        }
                    </Form> 
                </>
            );
        break;

        default:
            content = null;
    }

    return (
        <>
            {content}
        </>
    );
};

export default StageResult;