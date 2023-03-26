import React from 'react';

const Checkout = ({handleOrder, handlePaymentMethod, method, setMethod, itemName}) => {

    return (
        <div className="details border border-1 border-radius-1">
            <div className="px-4 py-5">
                <h5 className="text-uppercase">Payment Summary</h5>

                <span className="theme-color">{itemName}</span>
                <div className="mb-3">
                    <hr className="new1"/>
                </div>

                <div className="d-flex justify-content-between">
                    <span className="font-weight-bold">Total Items:</span>
                    <span className="text-muted">1</span>
                </div>

                <div className="d-flex justify-content-between">
                    <small>Total</small>
                    <small>$105.00</small>
                </div>


                <div className="d-flex justify-content-between">
                    <small>Vat</small>
                    <small>2%</small>
                </div>
                
                <div className="d-flex justify-content-between mt-3">
                    <span className="font-weight-bold">Grand Total</span>
                    <span className="font-weight-bold theme-color">$125.00</span>
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
                        <button className="btn btn-primary mx-3" onClick={(e) => handlePaymentMethod(e, 'balance')}>Balance</button>
                        <button className="btn btn-primary mx-3" onClick={(e) => handlePaymentMethod(e, 'bkash')}>bkash</button>
                        <button className="btn btn-primary mx-3" onClick={(e) => handlePaymentMethod(e, 'card')}>Card</button>
                    </div>  : 
                     <div className="text-center mt-3">
                        {
                            method ? 
                            <div className="text-center mt-5">
                                <h6>You've picked {method} method to pay</h6>
                            </div> : null
                        }
                        <button className="btn btn-primary mx-3 mt-3" onClick={handleOrder}>Checkout</button>
                        <p onClick={() => setMethod('')} role="button">cancel</p>
                    </div>
                }

            </div>
        </div>
    );
};

export default Checkout;