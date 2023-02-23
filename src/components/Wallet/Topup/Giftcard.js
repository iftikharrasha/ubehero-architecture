import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

const Giftcard = ({gift, handleCheckout, routeKey}) => {
    //this working when we already picked our gift card otherwise the topup page
    // const giftId = localStorage.getItem('giftId');
    // const giftCards = useSelector((state) => state.giftcards.data)
    // const giftChecked = giftCards.find(g => g._id === giftId);

    return (
        <div className="col-xl-4 col-sm-6 mb-4">
            <Card style={{ width: '18rem' }} className="mr-2">
                {
                    // routeKey === 'topup' ? 
                    <Card.Body style={{ background: `${gift.background}` }}>
                        <Card.Title className='text-white'>{gift.type} | ${gift.amount}</Card.Title>
                        <Card.Text className='text-white'>
                            {gift.token}E
                        </Card.Text>
                        <Card.Text className='text-white'>
                            version: {gift.version}
                        </Card.Text>
                        <Button variant="primary" onClick={(e) => handleCheckout(e, gift)} data-toggle="tooltip" title="A top-up system allows you to add funds to your account balance, which you can then use to purchase future products on the website without having to enter your payment details each time. For example, you can use your father's credit card to add funds to your account balance. Once the funds have been added, you can use them to purchase products on the website without having to enter your father's credit card details each time. This makes the checkout process faster and more convenient.">
                            Top Up
                        </Button>
                    </Card.Body>
                    // <Card.Body style={{ background: `${giftChecked.background}` }}>
                    //     <Card.Title className='text-white'>{giftChecked.type} | ${giftChecked.amount}</Card.Title>
                    //     <Card.Text className='text-white'>
                    //         {giftChecked.token}E
                    //     </Card.Text>
                    //     <Card.Text className='text-white'>
                    //         version: {giftChecked.version}
                    //     </Card.Text>
                    //     <Button variant="primary" onClick={(e) => handleCheckout(e, giftChecked)}>
                    //         Cancel
                    //     </Button>
                    // </Card.Body>
                }
            </Card>
        </div>
    );
};

export default Giftcard;