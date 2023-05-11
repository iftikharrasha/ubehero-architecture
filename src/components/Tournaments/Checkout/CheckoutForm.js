import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import useNotyf from '../../../hooks/useNotyf';
import { useHistory } from 'react-router-dom';
import usePurchase from '../../../hooks/usePurchase';

const CheckoutForm = ({method, tournament}) => {
    const history = useHistory();
    const { _id, tournamentName, tournamentThumbnail, settings } = tournament;
    const { loggedInUser } = useAuth();
    const { handleTournamentPurchase } = usePurchase();

    //just for testing purposes for notifications
    const user = useSelector((state) => state.profile.data)
    const jwt = localStorage.getItem("jwt");
    const { socketN } = useNotyf(user, jwt);

    const tournamentRegistration = () => {
        handleTournamentPurchase(tournament, method, socketN, history);
    };

    return (
        <section className="order-form">
            <div className="container pt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="border border-1">
                            <div className='m-4'>
                                <h5 className="text-uppercase">Order Details</h5>

                                <span className="theme-color">{tournamentName}</span>
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
                                    <span className="font-weight-bold theme-color">{method}</span>
                                </div> 
                
                                <div className="d-flex justify-content-between mt-3">
                                    <span className="font-weight-bold">Mode</span>
                                    <span className="font-weight-bold theme-color">{settings.mode}</span>
                                </div>  
                            </div> 
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="border border-1">
                            <div className="row mx-4 mt-4">
                                <div className="col-12">
                                    <label className="order-form-label">Name</label>
                                    <div className="form-outline">
                                        <input type="text" id="form1" className="form-control order-form-input border" />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3 mx-4">
                                <div className="col-12">
                                    <label className="order-form-label">Email Address</label>
                                </div>
                                <div className="col-12">
                                    <div className="form-outline">
                                        <input type="email" id="form5" className="form-control order-form-input border" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-2 pe-sm-2">
                                    <div className="form-outline">
                                        <label className="form-label" for="form5">Card Number</label>
                                        <input type="text" id="form7" className="form-control order-form-input border" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-2 ps-sm-0">
                                    <div className="form-outline">
                                        <label className="form-label" for="form8">CVC</label>
                                        <input type="text" id="form8" className="form-control order-form-input border" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-2 pe-sm-2">
                                    <div className="form-outline">
                                        <label className="form-label" for="form9">Expiry Date</label>
                                        <input type="text" id="form9" className="form-control order-form-input border" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-2 ps-sm-0">
                                    <div className="form-outline">
                                        <label className="form-label" for="form10">Postal / Zip Code</label>
                                        <input type="text" id="form10" className="form-control order-form-input border" />
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
                                    <button type="button" id="btnSubmit" className="btn btn-primary d-block mx-auto btn-submit" onClick={tournamentRegistration}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutForm;