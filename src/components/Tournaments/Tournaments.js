import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishList, removeFromWishList } from "../../redux/slices/tournamentSlice";

import { Card, Button, Progress, Row, Typography, message, Popconfirm, Tag, Badge } from 'antd';
import { UsergroupAddOutlined, PlusCircleOutlined, MinusCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import useTimer from "../../hooks/useTimer";

const { Paragraph } = Typography;
const { Meta } = Card;

const Tournaments = ({remark, route, handleCancel, tournament, detailsPage, handleCheckout}) => {
  const { _id, tournamentName, tournamentThumbnail, settings, leaderboards, category, version, purchased } = tournament;
  const { wishList } = useSelector((state) => state.tournaments);
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const purchasedItems = useSelector(state => state.profile?.data?.purchasedItems);
  const isWishListed = wishList.find((t) => t._id === tournament._id);

  const { buttonStatus, timeLeftPercent } = useTimer(tournament.dates);

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
        <Card hoverable style={{
              width: '100%',
              minWidth: '23rem',
            }}
            cover={
              <img
                alt="example"
                src={tournamentThumbnail} 
                style={{
                  minHeight: '14rem',
                  maxHeight: '14rem',
                }}
              />
            }
            actions={[
              <Row justify="center" align="middle">
                <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>{leaderboards.length}/{settings?.maxParticipitant}</span>
              </Row>,
              <Row justify="center" align="middle">
                <UsergroupAddOutlined  style={{ fontSize: '18px' }} /> <span className="ps-1" style={{ fontSize: '14px' }}>{settings?.competitionMode}</span>
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
                  // avatar={
                  //   <Avatar src="https://png.pngtree.com/png-vector/20190114/ourmid/pngtree-vector-video-game-icon-png-image_313030.jpg" />
                  // }
                  description={
                    <Row justify="left" align="middle" className="mt-1">
                      <TrophyOutlined  style={{ fontSize: '24px' }} /> <span className="ps-1">Prize ${settings?.joiningFee}.00</span>
                    </Row>
                  }
                />
                <div>
                  <Paragraph className="mb-0">Time Left</Paragraph>
                  <Progress percent={timeLeftPercent} steps={15} size="small" showInfo={false}/> 
                </div>
            </Row>
            
            {
              remark ? null :
              !isLoggedIn ? <Link to={`/tournament/details/${_id}`}>
                                <Button type="primary" size="small" className="mt-3">
                                  {buttonStatus}
                                </Button>
                            </Link> :
                purchasedItems.tournaments?.includes(_id) ? 
                  <Link to={`/tournament/details/${_id}`}>
                      <Tag color="success" size="small" className="mt-3">
                          JOINED
                      </Tag>
                  </Link> :
                  detailsPage ? 
                        route === 'checkout' ?  <Button type="primary" size="small" className="mt-3" onClick={handleCancel}>
                                                    CANCEL
                                                </Button>
                        : <Button type="primary" size="small" className="mt-3" onClick={handleCheckout}>
                              {buttonStatus}
                          </Button> : <Link to={`/tournament/details/${_id}`}>
                                        <Button type="primary" size="small" className="mt-3">
                                        {buttonStatus}
                                        </Button>
                                      </Link>
            }
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default Tournaments;
