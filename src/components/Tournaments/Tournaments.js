import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishList, removeFromWishList } from "../../redux/slices/tournamentSlice";

import { Card, Button, Progress, Row, Typography, message, Popconfirm, Tag, Badge } from 'antd';
import { UsergroupAddOutlined, PlusCircleOutlined, MinusCircleOutlined, TrophyOutlined, SyncOutlined, ThunderboltOutlined, FieldTimeOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons';
import useTimer from "../../hooks/useTimer";

const { Paragraph } = Typography;
const { Meta } = Card;

const copies = [1, 2, 3, 4, 5, 6, 7, 8];

const Tournaments = ({remark, tournament, totalJoined}) => {
  const { _id, tournamentName, tournamentThumbnail, settings, leaderboards, category, version } = tournament;
  const { wishList } = useSelector((state) => state.tournaments);
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const purchasedItems = useSelector(state => state.profile?.data?.purchasedItems);
  const isWishListed = wishList.find((t) => t._id === tournament._id);

  const { step, buttonStatus, timeLeftPercent } = useTimer(tournament.dates);

  const dispatch = useDispatch();
  
  const confirm = (e) => {
    dispatch(addToWishList(tournament))
    message.success('Saved');
  };

  return (
    <div className='p-3' 
        style={{position: 'relative'}}
      >
      <Badge.Ribbon text={category} color="#f030c0">
        <Card style={{
              width: '100%',
              minWidth: '23rem',
            }}
            cover={
              <Link to={`/tournament/details/${_id}`}>
                <img
                  alt="example"
                  src={tournamentThumbnail} 
                  style={{
                    minHeight: '14rem',
                    maxHeight: '14rem',
                    width: '100%',
                  }}
                />
              </Link>
            }
            actions={[
              <Row justify="center" align="middle">
                <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>{settings?.mode === 'team' ? leaderboards?.length/settings?.teamSize : leaderboards?.length}/{settings?.maxParticipitant}</span>
              </Row>,
              <Row justify="center" align="middle">
                {settings?.competitionMode === 'ladder' ? 
                <ProjectOutlined style={{ fontSize: '18px', transform: 'rotate(180deg)' }} /> :
                <PartitionOutlined  style={{ fontSize: '18px', transform: 'rotate(180deg)' }} />}
                <span className="ps-1" style={{ fontSize: '14px' }}>{settings?.competitionMode}</span>
              </Row>,
              isWishListed ? 
              <MinusCircleOutlined style={{ fontSize: '18px' }} onClick={() => dispatch(removeFromWishList(tournament._id))} /> :
              <Popconfirm
                  title="Save this for later?"
                  onConfirm={confirm}
                  okText="Yes"
              >
                  <PlusCircleOutlined style={{ fontSize: '18px' }}/>
              </Popconfirm>,
            ]}
          >
            <Meta
              title={tournamentName}
            />
            <Row justify="space-between" align="middle" className="mt-2">
                <Meta
                  avatar={
                    <div className="badgeClaimed prizeRotate">
                      <div className='spinningasset'>
                          <img src={settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"} alt='claim'/>
                          {
                              copies.map((copy, index) => (
                                  <i style={{ backgroundImage: `url(${settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"})` }} key={index}></i>
                              ))
                          }
                      </div>
                    </div>
                  }
                  description={
                    <Row justify="left" align="middle" className="mt-2">
                      <span>PRIZE POOL WORTH<br /> {settings?.joiningFee*settings?.maxParticipitant} {settings?.feeType}s</span>
                    </Row>
                  }
                />
                {
                  step === 1 ? 
                  totalJoined === settings?.maxParticipitant ? 
                  <Tag color="warning" className="mt-3" icon={<ThunderboltOutlined />} style={{ fontSize: '14px' }}>Full House</Tag> :
                  <div>
                    <Paragraph className="mb-0">Time Left</Paragraph>
                    <Progress percent={timeLeftPercent} steps={15} size="small" showInfo={false} strokeColor="#f030c0"/> 
                  </div> : 
                  step === 4 ? 
                  <Tag color="volcano" icon={<FieldTimeOutlined />} style={{ fontSize: '14px' }} className="mt-3">{buttonStatus}</Tag> :
                  <Tag color="cyan" icon={<SyncOutlined spin />} style={{ fontSize: '14px' }} className="mt-3">{buttonStatus}</Tag>
                }
            </Row>
            
            {
              //remark = reg means no button need to show
              remark ? null :
              totalJoined === settings?.maxParticipitant ? 
              <Link to={`/tournament/details/${_id}`}>
                  <Button size="small" className="mt-3">
                    View Details
                  </Button>
              </Link>
              :
              !isLoggedIn ? 
                    step === 1 ? 
                    <Link to={`/tournament/details/${_id}`}>
                        <Button type="primary" size="small" className="mt-3">
                          {buttonStatus}
                            <img alt="aquamarine" src={settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"}
                                style={{
                                  width: "18px",
                                  height: "18px",                      
                                  marginLeft: "5px"
                                }}
                            /> 
                            {settings?.joiningFee}
                        </Button>
                    </Link>  : 
                    <Link to={`/tournament/details/${_id}`}>
                        <Button size="small" className="mt-3">
                          View Details
                        </Button>
                    </Link> :
                purchasedItems.tournaments?.includes(_id) ? 
                  <Link to={`/tournament/details/${_id}`}>
                      <Tag size="small" className="mt-3" style={{ fontSize: '14px' }}>
                          Slot Booked
                      </Tag>
                  </Link> :
                    step === 1 ? 
                    <Link to={`/tournament/details/${_id}`}>
                      <Button type="primary" size="small" className="mt-3">
                          {buttonStatus}
                            <img alt="aquamarine" src={settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"}
                                style={{
                                  width: "18px",
                                  height: "18px",                      
                                  marginLeft: "5px"
                                }}
                            /> 
                            {settings?.joiningFee}
                      </Button>
                    </Link> : 
                    <Link to={`/tournament/details/${_id}`}>
                        <Button size="small" className="mt-3">
                          View Details
                        </Button>
                    </Link>
            }
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default Tournaments;
