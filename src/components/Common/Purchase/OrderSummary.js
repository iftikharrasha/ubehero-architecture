import React from 'react';

const OrderSummary = () => {
    return (
        <div className="border border-1">
            <div className='m-4'>
                <h5 className="text-uppercase">Order Details</h5>

                <span className="theme-color">Product Name</span>
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
                <div className="d-flex justify-content-between">
                    <span className="font-weight-bold">Payment Method</span>
                    <span className="font-weight-bold theme-color">method</span>
                </div> 

                <div className="d-flex justify-content-between mt-3">
                    <span className="font-weight-bold">Mode</span>
                    <span className="font-weight-bold theme-color">mode</span>
                </div>  
            </div> 
        </div>
    );
};

export default OrderSummary;