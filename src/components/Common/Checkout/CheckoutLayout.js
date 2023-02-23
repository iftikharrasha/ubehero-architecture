import React from 'react';
import Checkout from '../../Tournaments/Checkout/Checkout';
import Tournaments from '../../Tournaments/Tournaments';
import Giftcard from '../../Wallet/Topup/Giftcard';

const CheckoutLayout = ({ remark, routeKey, item, handleOrder, handlePaymentMethod, method, setMethod}) => {
    return (
        <div className="checkout row">
            <div className="col-md-6">
            {
                remark === 'reg' ? 
                <Tournaments 
                    remark={remark}
                    routeKey={routeKey} 
                    tournament={item}
                /> : 
                remark === 'topup' ? 
                <Giftcard gift={item}/> : null
            }
            </div>
            <div className="col-md-6">
            {
                remark === 'reg' ? 
                <Checkout 
                    handleOrder={handleOrder} 
                    handlePaymentMethod={handlePaymentMethod} 
                    method={method} 
                    setMethod={setMethod} 
                    itemName={item.tournamentName}
                />: 
                remark === 'topup' ? 
                <Checkout 
                    handleOrder={handleOrder} 
                    handlePaymentMethod={handlePaymentMethod} 
                    method={method}
                    setMethod={setMethod} 
                    itemName="Wallet top up"
                /> : null
            }
            </div>
        </div>
    );
};

export default CheckoutLayout;