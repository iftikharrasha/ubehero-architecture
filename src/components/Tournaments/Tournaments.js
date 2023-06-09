import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishList, removeFromWishList } from "../../redux/slices/tournamentSlice";

import { StockOutlined, UsergroupAddOutlined, PlusCircleOutlined, MinusCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Progress, Row, Typography } from 'antd';

const { Paragraph } = Typography;
const { Meta } = Card;

const Tournaments = ({remark, route, handleCancel, tournament, detailsPage, handleCheckout}) => {
  const { _id, tournamentName, tournamentThumbnail, settings, leaderboards, gameType, version, purchased } = tournament;
  const { wishList } = useSelector((state) => state.tournaments);
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const purchasedItems = useSelector(state => state.profile?.data?.purchasedItems);
  const isWishListed = wishList.find((t) => t._id === tournament._id);

  const dispatch = useDispatch();
  
  return (
    <div className='p-3' 
        style={{position: 'relative'}}
      >

      <Card hoverable style={{
            width: 300,
          }}
          cover={
            <img
              alt="example"
              src={tournamentThumbnail}
            />
          }
          actions={[
            <Row justify="center" align="middle">
              <span className="ps-1" style={{ fontSize: '16px' }}>SOLO</span>
            </Row>,
            <Row justify="center" align="middle">
              <UsergroupAddOutlined  style={{ fontSize: '20px' }} /> <span className="ps-1" style={{ fontSize: '16px' }}>{leaderboards.length}</span>
            </Row>,
            isWishListed ? <MinusCircleOutlined style={{ fontSize: '18px' }}  onClick={() => dispatch(removeFromWishList(tournament._id))} /> : <PlusCircleOutlined style={{ fontSize: '18px' }}  onClick={() => dispatch(addToWishList(tournament))}/>,
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
                <Progress percent={30} steps={3} /> 
              </div>
          </Row>
          
          {
            remark ? null :
            !isLoggedIn ? <Link to={`/tournament/details/${_id}`}>
                              <Button type="primary" size="small" className="mt-3">
                                  JOIN NOW
                              </Button>
                          </Link> :
              purchasedItems.tournaments?.includes(_id) ? 
                <Link to={`/tournament/details/${_id}`}>
                    <Button type="primary" danger size="small" className="mt-3">
                        PURCHASED
                    </Button>
                </Link> :
                detailsPage ? 
                      route === 'checkout' ?  <Button type="primary" size="small" className="mt-3" onClick={handleCancel}>
                                                  CANCEL
                                              </Button>
                      : <Button type="primary" size="small" className="mt-3" onClick={handleCheckout}>
                            BUY NOW
                        </Button> : <Link to={`/tournament/details/${_id}`}>
                                      <Button type="primary" size="small" className="mt-3">
                                          JOIN NOW
                                      </Button>
                                    </Link>
          }
      </Card>
    </div>
  );
};

export default Tournaments;
