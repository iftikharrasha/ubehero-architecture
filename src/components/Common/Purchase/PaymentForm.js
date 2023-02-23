import React from 'react';

const PaymentForm = () => {
    return (
        <div className="border border-1">
            <div className="row mx-4 mt-4">
                <div className="col-12">
                    <label className="order-form-label">Name</label>
                    <div className="form-outline">
                        <input type="text" id="form1" className="form-control order-form-input" />
                    </div>
                </div>
            </div>

            <div className="row mt-3 mx-4">
                <div className="col-12">
                    <label className="order-form-label">Email Address</label>
                </div>
                <div className="col-12">
                    <div className="form-outline">
                        <input type="email" id="form5" className="form-control order-form-input" />
                    </div>
                </div>
                <div className="col-sm-6 mt-2 pe-sm-2">
                    <div className="form-outline">
                        <label className="form-label" for="form5">Card Number</label>
                        <input type="text" id="form7" className="form-control order-form-input" />
                    </div>
                </div>
                <div className="col-sm-6 mt-2 ps-sm-0">
                    <div className="form-outline">
                        <label className="form-label" for="form8">CVC</label>
                        <input type="text" id="form8" className="form-control order-form-input" />
                    </div>
                </div>
                <div className="col-sm-6 mt-2 pe-sm-2">
                    <div className="form-outline">
                        <label className="form-label" for="form9">Expiry Date</label>
                        <input type="text" id="form9" className="form-control order-form-input" />
                    </div>
                </div>
                <div className="col-sm-6 mt-2 ps-sm-0">
                    <div className="form-outline">
                        <label className="form-label" for="form10">Postal / Zip Code</label>
                        <input type="text" id="form10" className="form-control order-form-input" />
                    </div>
                </div>
            </div>

            <div className="row mt-3 mx-4">
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">I know what I need to know</label>
                    </div>
                </div>
            </div>

            <div className="row my-4">
                <div className="col-12">
                    <button type="button" id="btnSubmit" className="btn btn-primary d-block mx-auto btn-submit">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;