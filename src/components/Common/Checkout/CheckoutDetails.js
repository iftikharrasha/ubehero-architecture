import { Button, Card, Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

const CheckoutDetails = ({handleOrder, handlePaymentMethod, method, setMethod, item, confirmCheckoutLoading}) => {

    return (
        <Card>
            <h5 className="text-uppercase">Payment Summary</h5>

            <span className="theme-color">Tournament Name: {item.tournamentName}</span>
            <div className="mb-3">
                <hr className="new1"/>
            </div>

            <div className="d-flex justify-content-between mt-3">
                <span className="font-weight-bold">Entry Mode</span>
                <span className="font-weight-bold theme-color">{item.settings.mode}</span>
            </div> 
            <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Competition Mode</span>
                <span className="font-weight-bold theme-color">{item.settings.competitionMode}</span>
            </div> 
            <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Fee Type</span>
                <span className="font-weight-bold theme-color">{item.settings.feeType}</span>
            </div>
            <div className="d-flex justify-content-between">
                <Paragraph>Entry Fee</Paragraph>
                <Paragraph>{item.settings.joiningFee}
                {
                    <img alt="aquamarine" src={item?.settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"}
                        style={{
                            width: "20px",
                            height: "20px",
                        }}
                    />
                }
                </Paragraph>
            </div>  

            <hr className="new1"/>
            
            <div className="d-flex justify-content-between">
                <Paragraph>Grand Total</Paragraph>
                <Paragraph>{item.settings.joiningFee}
                {
                    <img alt="aquamarine" src={item?.settings?.feeType === "aquamarine" ? "https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png" : "https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"}
                        style={{
                            width: "20px",
                            height: "20px",
                        }}
                    />
                }
                </Paragraph>
            </div> 

            {
                <div className="text-center mt-3">
                    <div className="text-center mt-5">
                        <p>Confirm enter to book your place in this tournament</p>
                    </div>
                    <Button type="primary" danger size="medium" className=" mx-3 my-1" onClick={handleOrder} loading={confirmCheckoutLoading}>
                        Enter Now
                    </Button>
                </div> 
                // :
                // !method ?  
                // <>
                //     <div className="text-center mt-5">
                //         <h6>Select your payment method</h6>
                //     </div>
                //     <div className="text-center mt-3">
                //         <Button type="primary" size="medium" className="mx-3" onClick={(e) => handlePaymentMethod(e, 'balance')}>
                //             💸 Balance
                //         </Button> 
                //         {/* <Button type="primary" size="medium" className="mx-3" onClick={(e) => handlePaymentMethod(e, 'gems')}>
                //             💎 Gems
                //         </Button>  */}
                //         <Button type="primary" size="medium" className="mx-3" onClick={(e) => handlePaymentMethod(e, 'card')}>
                //             💳 Card
                //         </Button> 
                //     </div> 
                // </> : 
                // <div className="text-center mt-3">
                //     <div className="text-center mt-5">
                //         <h6>You've picked {method} method to pay</h6>
                //     </div>
                //     <Button type="primary" size="medium" className=" mx-3 my-1" onClick={handleOrder}>
                //         Checkout
                //     </Button>
                //     <p onClick={() => setMethod('')} role="button">cancel</p>
                // </div>
            }
        </Card>
    );
};

export default CheckoutDetails;