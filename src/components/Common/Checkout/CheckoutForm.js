import React, { useState } from 'react';
import useTournament from '../../../hooks/useTournament';
import { Button, Card } from 'antd';

const CheckoutForm = ({method, tournament, connectedAccount}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { _id, tournamentName, tournamentThumbnail, settings } = tournament;
    const { handleTournamentPurchase } = useTournament();

    const tournamentRegistration = async () => {
        setConfirmLoading(true)
        const result = await handleTournamentPurchase(tournament, connectedAccount._id, method);
        if(result){
            setConfirmLoading(false);
        }
    };

    // const onFinish = (values) => {
    //   console.log('Success:', values);
    // };
    
    // const onFinishFailed = (errorInfo) => {
    //   console.log('Failed:', errorInfo);
    // };

    return (
        <section className="order-form">
            <div className="container pt-4">
                <div className="row">
                    <div className="col-md-6">
                        <Card>
                            <div className='m-4'>
                                <h5 className="text-uppercase">Order Details</h5>

                                <span className="theme-color">{tournamentName}</span>
                                <div className="mb-3">
                                    <hr className="new1"/>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span className="font-weight-bold">Total Items:</span>
                                    <span>1</span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <small>Price</small>
                                    <small>$0</small>
                                </div>


                                <div className="d-flex justify-content-between">
                                    <small>Vat</small>
                                    <small>0%</small>
                                </div>
                
                                <div className="d-flex justify-content-between mt-3">
                                    <span className="font-weight-bold">Entry Mode</span>
                                    <span className="font-weight-bold theme-color">{settings.mode}</span>
                                </div> 
                                <div className="d-flex justify-content-between">
                                    <span className="font-weight-bold">Competition Mode</span>
                                    <span className="font-weight-bold theme-color">{settings.competitionMode}</span>
                                </div> 
                                <div className="d-flex justify-content-between">
                                    <span className="font-weight-bold">Payment Method</span>
                                    <span className="font-weight-bold theme-color">{method}</span>
                                </div>  
                                <div className="d-flex justify-content-between">
                                    <span className="font-weight-bold">Fee Type</span>
                                    <span className="font-weight-bold theme-color">{settings.feeType}</span>
                                </div>  

                                <div className="d-flex justify-content-between mt-3">
                                    <span className="font-weight-bold">Grand Total</span>
                                    <span className="font-weight-bold theme-color">$0</span>
                                </div> 
                            </div> 
                        </Card>

                    </div>
                    <div className="col-md-6">
                        <Card>
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
                                        <label className="order-form-label" for="form5">Card Number</label>
                                        <input type="text" id="form7" className="form-control order-form-input border" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-2 ps-sm-0">
                                    <div className="form-outline">
                                        <label className="order-form-label" for="form8">CVC</label>
                                        <input type="text" id="form8" className="form-control order-form-input border" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-2 pe-sm-2">
                                    <div className="form-outline">
                                        <label className="order-form-label" for="form9">Expiry Date</label>
                                        <input type="text" id="form9" className="form-control order-form-input border" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-2 ps-sm-0">
                                    <div className="form-outline">
                                        <label className="order-form-label" for="form10">Postal / Zip Code</label>
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
                                <div className="col-12 d-flex justify-content-center">
                                    <Button type="primary" size="medium" className="mt-3" onClick={tournamentRegistration} loading={confirmLoading}>
                                        Submit
                                    </Button> 
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutForm;