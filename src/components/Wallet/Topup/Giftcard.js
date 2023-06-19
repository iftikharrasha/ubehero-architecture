import React from 'react';
import { Card, Col, Button } from 'antd';
import { useSelector } from 'react-redux';

const Giftcard = ({gift, handleCheckout, routeKey}) => {
    //this working when we already picked our gift card otherwise the topup page
    // const giftId = localStorage.getItem('giftId');
    // const giftCards = useSelector((state) => state.giftcards.data)
    // const giftChecked = giftCards.find(g => g._id === giftId);

    return (
        <Col span={6}>
          <Card title={`${gift.type} | $${gift.amount}`} bordered={false}
            actions={[
                <Button type="primary" onClick={(e) => handleCheckout(e, gift)}>Top Up</Button>,
            ]}>
            {gift.token}E
          </Card>
        </Col>
    );
};

export default Giftcard;