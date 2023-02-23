import React from 'react';
import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';

const PurchaseLayout = () => {
    return (
        <section className="order-form">
            <div className="container pt-4">
                <div className="row">
                    <div className="col-md-6">
                        <OrderSummary/>
                    </div>
                    <div className="col-md-6">
                        <PaymentForm/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PurchaseLayout;