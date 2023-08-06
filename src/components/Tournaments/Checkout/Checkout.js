import { Button, Card, Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

const Checkout = ({handleOrder, handlePaymentMethod, method, setMethod, itemName}) => {

    return (
        <Card>
            <h5 className="text-uppercase">Payment Summary</h5>

            <span className="theme-color">{itemName}</span>
            <div className="mb-3">
                <hr className="new1"/>
            </div>

            <div className="d-flex justify-content-between">
                <Paragraph>Total Items:</Paragraph>
                <Paragraph>1</Paragraph>
            </div>

            <div className="d-flex justify-content-between">
                <Paragraph>Total</Paragraph>
                <Paragraph>$105.00</Paragraph>
            </div>


            <div className="d-flex justify-content-between">
                <Paragraph>Vat</Paragraph>
                <Paragraph>2%</Paragraph>
            </div>
            
            <div className="d-flex justify-content-between">
                <Paragraph>Grand Total</Paragraph>
                <Paragraph>$125.00</Paragraph>
            </div>  

            {
                !method ? 
                <div className="text-center mt-5">
                    <h6>Select your payment method</h6>
                </div>: null
            }

            {
                !method ? 
                <div className="text-center mt-3">
                    <Button type="primary" size="medium" className="mx-3" onClick={(e) => handlePaymentMethod(e, 'balance')}>
                        Balance
                    </Button> 
                    <Button type="primary" size="medium" className="mx-3" onClick={(e) => handlePaymentMethod(e, 'bkash')}>
                        bkash
                    </Button> 
                    <Button type="primary" size="medium" className="mx-3" onClick={(e) => handlePaymentMethod(e, 'card')}>
                        Card
                    </Button> 
                </div>  : 
                <div className="text-center mt-3">
                    {
                        method ? 
                        <div className="text-center mt-5">
                            <h6>You've picked {method} method to pay</h6>
                        </div> : null
                    }
                    <Button type="primary" size="medium" className=" mx-3 my-1" onClick={handleOrder}>
                        Checkout
                    </Button>
                    <p onClick={() => setMethod('')} role="button">cancel</p>
                </div>
            }
        </Card>
    );
};

export default Checkout;