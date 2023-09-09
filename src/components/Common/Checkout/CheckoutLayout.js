import React, { useEffect, useState } from 'react';
import Checkout from '../../Tournaments/Checkout/Checkout';
import Giftcard from '../../Wallet/Topup/Giftcard';
import GameAccount from '../../Profile/GameAccount';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Timeline, Empty, Modal, Col, Row, Space, Form, Input, Select } from 'antd';
import Tournaments from '../../Tournaments/Tournaments';
import { useSelector } from 'react-redux';
import AddGameAccount from '../../Profile/AddGameAccount';
import useProfile from '../../../hooks/useProfile';

// const allAccounts = [
//     {
//         gameLogo: 'https://www.pockettactics.com/wp-content/sites/pockettactics/2022/12/rocket-league-logo-1.jpg',
//         accountLogo: 'https://rocketleague.media.zestyio.com/icon_switch_w.png',
//         playerIgn: 'myrocketnintendo',
//         playerId: '234213343K',
//         platform: 'nintendo',
//         tag: 'epic'
//     },
//     {
//         gameLogo: 'https://www.pockettactics.com/wp-content/sites/pockettactics/2022/12/rocket-league-logo-1.jpg',
//         accountLogo: 'https://rocketleague.media.zestyio.com/icon_playstation_w.png',
//         playerIgn: 'myrocketpsn',
//         playerId: '234261343K',
//         platform: 'psn',
//         tag: 'epic'
//     },
//     {
//         gameLogo: 'https://www.pockettactics.com/wp-content/sites/pockettactics/2022/12/rocket-league-logo-1.jpg',
//         accountLogo: 'https://rocketleague.media.zestyio.com/icon_xbox_w.png',
//         playerIgn: 'myrocketxbox',
//         playerId: '234213143K',
//         platform: 'xbox',
//         tag: 'epic'
//     },
//     {
//         gameLogo: 'https://www.pockettactics.com/wp-content/sites/pockettactics/2022/12/rocket-league-logo-1.jpg',
//         accountLogo: 'https://rocketleague.media.zestyio.com/rl_web_icon_pc.png',
//         playerIgn: 'myrocketpc',
//         playerId: '234213433K',
//         platform: 'pc',
//         tag: 'epic'
//     }
// ];

const CheckoutLayout = ({ remark, routeKey, item, handleOrder, handlePaymentMethod, method, setMethod }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [connectedAccount, setConnectedAccount] = useState(null);  //1. auto filter if connectedAccount already exists based on single platform
    const [clickedItem, setClickedItem] = useState(null);
    const allAccounts = useSelector((state) => state.profile.data.gameAccounts);
    const [allPlatformAccounts, setAllPlatformAccounts] = useState(allAccounts);
    const uId = useSelector((state) => state.profile.data._id);
    const { handleGameAccountAdd } = useProfile();
    // console.log(item.platforms)
    // console.log(item.category)
    // console.log(allPlatformAccounts)

    const [form] = Form.useForm();

    //this is to help auto connect game account
    useEffect(() => {
      const singlePlatform = allAccounts.filter((account) =>
          item.platforms.includes(account.platform)
      );
      if(item.platforms.length === 1) {
        setConnectedAccount(singlePlatform[0])
      }else{
        setAllPlatformAccounts(singlePlatform)
      }
    }, [])

    const handleOk = () => {
      setConfirmLoading(true);
      
      
      if(clickedItem){ //choosing item
        setTimeout(() => {
          setConnectedAccount(clickedItem)
        }, 2000);
      }else{ //new entry item
        const formData = form.getFieldsValue();
        const addedPlatform = {
          ...formData,
          uId: uId,
          category: item.category,
          tag: item.settings.accountTag
        }

        const result = handleGameAccountAdd(addedPlatform);
        if(result){
          setConnectedAccount(addedPlatform)
        }
      }
      setOpen(false);
      setConfirmLoading(false);
    };

    const handleClickAccount = (clickedAccount) => {
      setIsFieldsFilled(true);
      setClickedItem(clickedAccount)
    };

    return (
        <div className="checkout row my-5">
        {/* step 1 */}
          {!connectedAccount ?
          <div className="col-md-12">
              <Timeline
                mode="middle"
                items={[
                  {
                    children: 'This tournament requires you to connect your gaming account',
                    color: 'red',
                    dot: (
                      <InfoCircleOutlined
                        style={{
                          fontSize: '16px',
                        }}
                      />
                    ),
                  },
                  {
                    children: 
                    <Card 
                      style={{
                        width: 300,
                      }}>
                        <Empty
                          imageStyle={{
                            height: 60,
                          }}
                          description={
                            <span>
                              No Account connected yet
                            </span>
                          }
                        >
                          <Button type="primary" onClick={() => setOpen(true)}>Connect Now</Button>
                        </Empty>
                    </Card>
                    ,
                    color: 'red',
                  },
                ]}
              />
            </div> :
            <>

            {/* step 2 */}
            <div className="col-md-6">
                {
                    remark === 'reg' ? 
                    <Timeline
                      mode="left"
                      items={[
                        {
                          children: `Your ${item.category} account connected`,
                          color: 'green',
                          dot: (
                            <CheckCircleOutlined
                              style={{
                                fontSize: '16px',
                              }}
                            />
                          ),
                        },
                        {
                          children: 
                          <GameAccount account={connectedAccount} cover={false}/>
                          ,
                          color: 'green',
                        },
                        // {
                        //   children: 
                        //     <Button type="primary" size="small" className="mt-3">
                        //         Connect
                        //     </Button> ,
                        // },
                      ]}
                    />
                    // <Tournaments 
                    //     remark={remark}
                    //     routeKey={routeKey} 
                    //     tournament={item}
                    // /> 
                    : 
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
            </>
          }

            <Modal
              title={<h4 className='text-center pb-5'>Connect your {item.category} account</h4>}
              centered
              open={open}
              okText='Connect'
              // onOk={handleOk}
              onOk={handleOk}
              onCancel={() => setOpen(false)}
              confirmLoading={confirmLoading}
              width={1000}
              okButtonProps={{
                disabled: !isFieldsFilled,
              }}
            >
              <Row gutter={[16, 16]}>
                {
                  allAccounts.length === 0 ? 
                  <AddGameAccount item={item} form={form} setIsFieldsFilled={setIsFieldsFilled}/>:
                  allPlatformAccounts.map((account, index) => (
                    <Col span={8} key={index}>
                      <div onClick={() => handleClickAccount(account)} className={`${!clickedItem ? null : clickedItem.playerId === account.playerId ? 'border' : null}`}>
                        <GameAccount account={account} cover={false}/>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            </Modal>
            
        </div>
    );
};

export default CheckoutLayout;