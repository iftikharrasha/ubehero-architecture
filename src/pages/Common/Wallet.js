import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Row, Tabs, Empty, Skeleton, Button, Statistic, Col } from 'antd';
import { StockOutlined, SettingOutlined, DollarOutlined, ArrowUpOutlined, SendOutlined } from '@ant-design/icons';
import Preloader from '../../components/PageLayout/Preloader';
import Transactions from '../../components/Wallet/Transactions/Transactions';
import { fetchGiftCards } from '../../redux/slices/giftCardSlice';
import PurchaseLayout from '../../components/Common/Purchase/PurchaseLayout';
import CheckoutLayoutSolo from '../../components/Common/Checkout/CheckoutLayoutSolo';
import Giftcard from '../../components/Wallet/Topup/Giftcard';
import { fetchMyTransactions } from '../../redux/slices/walletSlice';
import WithdrawModal from '../../components/Wallet/WithdrawModal/WithdrawModal';
import TopupModal from '../../components/Wallet/Topup/TopupModal';

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
        }else if (location.pathname.endsWith('convert')) {
            setRouteKey('convert');
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
            case 'convert':
                history.push(`/wallet/${id}/convert`);
                break;
            case 'settings':
                history.push(`/wallet/${id}/settings`);
                break;
            default:
                break;
        }
    };

    const userDetails = useSelector((state) => state.profile.data)
    const aquamarine = userDetails.stats.aquamarine;
    const tourmaline = userDetails.stats.tourmaline;
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
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showTopupModal = () => {
        setIsTopupModalOpen(true);
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
                                            <span style={{ fontSize: '16px' }}>
                                                <img
                                                    width={150}
                                                    alt='aquamarine'
                                                    src="https://res.cloudinary.com/duoalyur6/image/upload/v1717501727/pngtree-gem-cartoon-diamond-png-image_3464627-removebg-preview_ak3qcu.png"
                                                />
                                            </span>
                                            <Card bordered={false}>
                                                <Statistic
                                                    title="Aquamarine"
                                                    value={aquamarine}
                                                    precision={2}
                                                    valueStyle={{
                                                        color: '#8bb1f2',
                                                    }}
                                                    prefix={
                                                        <img alt="aquamarine" src="https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png"
                                                            style={{
                                                            width: "28px",
                                                            height: "28px",
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Card>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <span style={{ fontSize: '16px' }}>
                                                <img
                                                    width={150}
                                                    alt='tourmaline'
                                                    src="https://res.cloudinary.com/duoalyur6/image/upload/v1717502059/b9a9dd3002f7be93484f2d0bb88e1241-removebg-preview_us5rix.png"
                                                />
                                            </span>
                                           <Card bordered={false}>
                                                <Statistic
                                                    title="Tourmaline"
                                                    value={tourmaline}
                                                    precision={2}
                                                    valueStyle={{
                                                        color: '#FF960C',
                                                    }}
                                                    prefix={
                                                        <img alt="tourmaline" src="https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"
                                                            style={{
                                                            width: "28px",
                                                            height: "28px",
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Card>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                           <Card bordered={false}>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <Statistic
                                                        className='me-4'
                                                        title="Pending Aquamarine"
                                                        value={0.00}
                                                        precision={2}
                                                        valueStyle={{
                                                            color: '#8bb1f2',
                                                        }}
                                                        prefix={
                                                            <img alt="aquamarine" src="https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png"
                                                                style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                    <Statistic
                                                        className='ms-4'
                                                        title="Pending Tourmaline"
                                                        value={0.00}
                                                        precision={2}
                                                        valueStyle={{
                                                            color: '#FF960C',
                                                        }}
                                                        prefix={
                                                            <img alt="tourmaline" src="https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"
                                                                style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </Card>
                                        </Row>,
                                        <Row justify="center" align="middle">
                                            <Card bordered={false}>
                                                <span className="ps-1" style={{ fontSize: '16px' }}>Net Worth</span>
                                                <Statistic
                                                    title="Portfolio"
                                                    value={tourmaline*0.10}
                                                    precision={2}
                                                    valueStyle={{
                                                        color: '#3f8600',
                                                    }}
                                                    prefix={<ArrowUpOutlined />}
                                                    suffix={<span>$</span>}
                                                />
                                            </Card>
                                        </Row>,
                                    ]}
                                    >
                                    <Meta
                                        title="Looking for faster payments?"
                                        avatar={
                                            <img
                                                width={80}
                                                alt='coin'
                                                src="https://cdn-icons-png.freepik.com/512/6466/6466947.png"
                                            />
                                        }
                                        description={
                                            <Row justify="space-between" align="middle">
                                                <span style={{ fontSize: '16px' }}>Join Underdog Plus today and withdraw your earnings earlier. <Link to='/' style={{color: 'pink'}}>Tell me more</Link></span>
                                                <Button type="primary" danger onClick={tourmaline === 0 ? null : showModal} disabled={tourmaline === 0}>Withdraw</Button>
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
                                                            <DollarOutlined /> <span>Topup</span>
                                                        </Row>
                                                    }
                                                >
                                                    {
                                                        <Row gutter={16}>
                                                            {
                                                                giftcards ?
                                                                    giftcards.length === 0 ? <Empty /> :
                                                                        <>
                                                                            {
                                                                                giftcards.map((item, index) => (
                                                                                    <Giftcard 
                                                                                        key={index} 
                                                                                        gift={item} 
                                                                                        handleCheckout={handleTopUpCheckout} 
                                                                                        routeKey={routeKey} 
                                                                                        showTopupModal={showTopupModal}
                                                                                    />
                                                                                )) 
                                                                            } 
                                                                            <Col span={6}>
                                                                                <Card>
                                                                                    <Empty
                                                                                        image="https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"
                                                                                        imageStyle={{
                                                                                            height: 50,
                                                                                        }}
                                                                                        description={
                                                                                        <span>
                                                                                            You can also customize the topup to<br /> any tourmaline gem amount
                                                                                        </span>
                                                                                        }
                                                                                    >
                                                                                        <Button type="primary" onClick={showTopupModal}>Customize</Button>
                                                                                    </Empty>
                                                                                </Card>
                                                                            </Col>
                                                                        </>
                                                                : <Skeleton />
                                                            }
                                                        </Row>
                                                    }
                                                </TabPane>
                                                <TabPane
                                                    key="convert"
                                                    tab={
                                                        <Row justify="left" align="middle">
                                                            <SendOutlined /> <span>Convert</span>
                                                        </Row>
                                                    }
                                                >
                                                    <Row gutter={16}>
                                                        <Col span={6}>
                                                            <Card cover={<img alt="topup" src="https://res.cloudinary.com/duoalyur6/image/upload/v1718128213/gem_4_sgo4zx.png" />}>
                                                                <Meta title={
                                                                    <Row className='mb-1'>
                                                                        <Col span={8}>
                                                                        <span>1400 LOOTS</span>
                                                                        </Col>
                                                                        <Col span={8} offset={8} className='text-right'>
                                                                        <Button type="primary" size='small' onClick={showTopupModal}>Convert</Button>
                                                                        </Col>
                                                                    </Row>
                                                                }
                                                                description="CONVERT YOUR LOOTS INTO AQUAMARINE GEMS FOR FREE"
                                                                />
                                                            </Card>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Card>
                                                                <Empty
                                                                    image="https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png"
                                                                    imageStyle={{
                                                                        height: 50,
                                                                    }}
                                                                    description={
                                                                    <span>
                                                                        You can also customize the loots to<br /> any aquamarine gem amount
                                                                    </span>
                                                                    }
                                                                >
                                                                    <Button type="primary" onClick={showTopupModal}>Customize</Button>
                                                                </Empty>
                                                            </Card>
                                                        </Col>
                                                    </Row>
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

                            {
                                !isModalOpen ? null :
                                <WithdrawModal id={id} totalGems={tourmaline} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
                            }

                            {
                                !isTopupModalOpen ? null :
                                <TopupModal id={id} totalGems={tourmaline} isModalOpen={isTopupModalOpen} setIsModalOpen={setIsTopupModalOpen}/>
                            }
                            
                        </>
                    }

                    {/* this is the tab for checkout when clicked the checkout button */}
                    {routeKey === 'checkout' ? (
                        <div className="checkout row">
                            <CheckoutLayoutSolo 
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