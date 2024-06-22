import React from 'react';
import { Card, Col, Button, Row } from 'antd';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const Giftcard = ({gift, handleCheckout, routeKey, showTopupModal}) => {
    //this working when we already picked our gift card otherwise the topup page
    // const giftId = localStorage.getItem('giftId');
    // const giftCards = useSelector((state) => state.giftcards.data)
    // const giftChecked = giftCards.find(g => g._id === giftId);

    return (
        <Col span={6}>
          <Card
          // title={`${gift.type} | $${gift.amount}`} 
            cover={<img alt="topup" src="https://res.cloudinary.com/duoalyur6/image/upload/v1718101331/gem_3_cyi96d.png" />}
            >
            <Meta
              title={
              <Row className='mb-1'>
                <Col span={8}>
                  <span>{gift.token} TOURMALINE GEMS</span>
                </Col>
                <Col span={8} offset={8} className='text-right'>
                  <Button type="primary" size='small' onClick={showTopupModal}>Top Up</Button>
                </Col>
              </Row>
              }
              description="TOPUP TOURMALINE FOR FUTURE PURPOSE ON UNDERDOG"
            />
          </Card>
        </Col>
    );
};

export default Giftcard;