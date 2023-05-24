import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useSelector } from 'react-redux';
import { fetchProfileDetails } from '../../redux/slices/profileSlice'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Preloader from '../../components/PageLayout/Preloader';
import WalletDetails from '../../components/Wallet/WalletDetails';
import Transactions from '../../components/Wallet/Transactions/Transactions';
import { fetchGiftCards } from '../../redux/slices/giftCardSlice';
import PurchaseLayout from '../../components/Common/Purchase/PurchaseLayout';
import CheckoutLayout from '../../components/Common/Checkout/CheckoutLayout';
import Giftcard from '../../components/Wallet/Topup/Giftcard';
import { fetchMyTransactions } from '../../redux/slices/walletSlice';

const Wallet = () => { 
    const { id } = useParams();

    const dispatch = useDispatch();

    const [routeKey, setRouteKey] = useState('transactions');
    const [clickedGift, setClickedGift] = useState('transactions');

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.pathname.endsWith('topup')) {
            setRouteKey('topup');
        }else if (location.pathname.endsWith('sendmoney')) {
            setRouteKey('sendmoney');
        }else if (location.pathname.endsWith('checkout')) {
            setRouteKey('checkout');
        }else if (location.pathname.endsWith('settings')) {
            setRouteKey('settings');
        }else {
            setRouteKey('transactions');
        }
    }, [location]);

    const userDetails = useSelector((state) => state.profile.data)
    const version = userDetails ? userDetails.version : 0;

    const giftcards = useSelector((state) => state.giftcards.data)
    const versionGiftCard = useSelector((state) => state.giftcards.version)

    const myTransactions = useSelector((state) => state.myTransactions.data)
    const versionTransactions = useSelector((state) => state.myTransactions.version)

    useEffect(() => {
        dispatch(fetchMyTransactions({ id, version }));
    }, [])

    useEffect(() => {
        if(routeKey === 'topup'){
            dispatch(fetchGiftCards({ versionGiftCard }));
        }else if(routeKey === 'transactions'){
            dispatch(fetchMyTransactions({ id, versionTransactions }));
        }else{
           console.log('no toute')
        }
    }, [routeKey])

    const [method, setMethod]  = useState('');
    const handlePaymentMethod = (e, m) => {
        e.preventDefault();
        setMethod(m)
    };

    const handleTopUpCheckout = (e, gift) => {
        e.preventDefault();
        localStorage.setItem('giftId', gift._id);
        setClickedGift(gift);
        handleCheckout();
    }

    const handleCheckout = () => {
        history.push(`/wallet/${id}/checkout`);
        setRouteKey('checkout');
    };

    const handleOrder = () => {
        // history.push(`/tournament/details/${id}/order`);
        setRouteKey('order');
    };

    return (
        <PageLayout>
            {
                userDetails ? 
                <>
                    {routeKey === 'order' ? null : 
                        <>
                            <WalletDetails user={userDetails} />
                            <Tabs
                                id="controlled-tab-example"
                                className="mb-3"
                                activeKey={routeKey}
                                onSelect={(k) => {
                                    setRouteKey(k);
                                    switch (k) {
                                        case 'transactions':
                                            history.push(`/wallet/${id}`);
                                            break;
                                        case 'topup':
                                            history.push(`/wallet/${id}/topup`);
                                            break;
                                        case 'sendmoney':
                                            history.push(`/wallet/${id}/sendmoney`);
                                            break;
                                        case 'settings':
                                            history.push(`/wallet/${id}/settings`);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                            >
                                <Tab eventKey="transactions" title="Transactions">
                                    {
                                        myTransactions.transactions ? 
                                        <Transactions myTransactions={myTransactions}/> : <Preloader/>
                                    }
                                </Tab>
                                <Tab eventKey="topup" title="Top Up">
                                    {
                                        giftcards ? 
                                        <div>
                                            <div className='row'>
                                                {
                                                    giftcards.length === 0 ? <p>No tops up found!</p> :
                                                    giftcards.map((item, index) => (
                                                        <Giftcard key={index} gift={item} handleCheckout={handleTopUpCheckout} routeKey={routeKey} />
                                                    ))
                                                }
                                                
                                            </div>
                                        </div>
                                        : <Preloader/>
                                    }
                                </Tab>
                                <Tab eventKey="sendmoney" title="Send Money">
                                    
                                </Tab>
                                <Tab eventKey="settings" title="Settings">
                                    
                                </Tab>
                            </Tabs>
                        </>
                    }

                    {/* this is the tab for checkout when clicked the checkout button */}
                    {routeKey === 'checkout' ? (
                        <div className="checkout row">
                            <CheckoutLayout 
                                remark='topup'
                                routeKey={routeKey} 
                                item={clickedGift} 
                                handleOrder={handleOrder} 
                                handlePaymentMethod={handlePaymentMethod} 
                                method={method} 
                                setMethod={setMethod}
                            />
                        </div>
                    ) : null}

                    {/* this is the order form to checkout when clicked the final checkout button */}
                    {routeKey === 'order' ? (
                        <PurchaseLayout/>
                    ) : null}
                </>
                : <Preloader />
            }
        </PageLayout>
    );
};

export default Wallet;