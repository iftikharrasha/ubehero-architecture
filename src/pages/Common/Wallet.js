import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Preloader from '../../components/PageLayout/Preloader';
import Transactions from '../../components/Wallet/Transactions/Transactions';
import { fetchGiftCards } from '../../redux/slices/giftCardSlice';
import PurchaseLayout from '../../components/Common/Purchase/PurchaseLayout';
import CheckoutLayout from '../../components/Common/Checkout/CheckoutLayout';
import Giftcard from '../../components/Wallet/Topup/Giftcard';
import { fetchMyTransactions } from '../../redux/slices/walletSlice';
import { Link } from 'react-router-dom';

import { Card, Row, Tabs, Empty, Skeleton, Button  } from 'antd';
import { StockOutlined, SettingOutlined, DollarOutlined, SendOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { TabPane } = Tabs;

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

    const handleTabChange = (key) => {
        setRouteKey(key);
        switch (key) {
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
    };

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
                            <div className='mb-3'>
                                <Card 
                                    actions={[
                                        <Row justify="center" align="middle">
                                            <span className="ps-1" style={{ fontSize: '16px' }}>Income: 0$</span>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <span className="ps-1" style={{ fontSize: '16px' }}>Balance: 0$</span>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <span className="ps-1" style={{ fontSize: '16px' }}>Pending: 0$</span>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <span className="ps-1" style={{ fontSize: '16px' }}>Enpense: 0$</span>
                                        </Row>,
                                    ]}
                                    >
                                    <Meta
                                        title="Looking for faster payments?"
                                        avatar={
                                            <img
                                                width={80}
                                                alt='coin'
                                                src="https://i.ibb.co/vjpGbfj/balance-Coin.webp"
                                            />
                                        }
                                        description={
                                            <Row justify="space-between" align="middle">
                                                <span style={{ fontSize: '16px' }}>Join Seller Plus today and withdraw your earnings earlier. <Link to='/'>Tell me more</Link></span>
                                                <Button type="primary" danger>Withdraw</Button>
                                            </Row>
                                        }
                                    />
                                </Card>
                            </div>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <Tabs activeKey={routeKey} onChange={handleTabChange}>
                                                <TabPane
                                                    key="transactions"
                                                    tab={
                                                        <Row justify="left" align="middle">
                                                            <StockOutlined /> <span>Transactions</span>
                                                        </Row>
                                                    }
                                                >
                                                    {
                                                        myTransactions ?
                                                            myTransactions.length === 0 ? <Empty /> :
                                                            <Transactions myTransactions={myTransactions}/> 
                                                        : <Skeleton />
                                                    }
                                                    
                                                </TabPane>
                                                <TabPane
                                                    key="topup"
                                                    tab={
                                                        <Row justify="left" align="middle">
                                                            <DollarOutlined /> <span>Topups</span>
                                                        </Row>
                                                    }
                                                >
                                                    {   
                                                        
                                                        <Row gutter={16}>
                                                            {
                                                                giftcards ?
                                                                    giftcards.length === 0 ? <Empty /> :
                                                                        giftcards.map((item, index) => (
                                                                            <Giftcard key={index} gift={item} handleCheckout={handleTopUpCheckout} routeKey={routeKey} />
                                                                        ))  
                                                                : <Skeleton />
                                                            }
                                                        </Row>
                                                    }
                                                </TabPane>
                                                <TabPane
                                                    key="sendmoney"
                                                    tab={
                                                        <Row justify="left" align="middle">
                                                            <SendOutlined /> <span>Send Money</span>
                                                        </Row>
                                                    }
                                                >
                                                    {/* Data here */}
                                                </TabPane>
                                                <TabPane
                                                    key="settings"
                                                    tab={
                                                        <Row justify="left" align="middle">
                                                            <SettingOutlined /> <span>Settings</span>
                                                        </Row>
                                                    }
                                                >
                                                    {/* Data here */}
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
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