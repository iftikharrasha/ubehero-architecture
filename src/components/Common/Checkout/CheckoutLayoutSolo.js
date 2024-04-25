import React, { useEffect, useState } from 'react';
import GameAccount from '../../Profile/GameAccount';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Timeline, Empty, Modal, Col, Row, Form } from 'antd';
import { useSelector } from 'react-redux';
import AddGameAccount from '../../Profile/AddGameAccount';
import useProfile from '../../../hooks/useProfile';
import CheckoutDetails from './CheckoutDetails';

const CheckoutLayoutSolo = ({ item, handleOrder, handlePaymentMethod, method, setMethod, connectedAccount, setConnectedAccount, confirmCheckoutLoading }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const allAccounts = useSelector((state) => state.profile.data.gameAccounts ? state.profile.data.gameAccounts : []);
    const [validPlatformAccounts, setValidPlatformAccounts] = useState([]);
    const [clickedItem, setClickedItem] = useState(null);
    const uId = useSelector((state) => state.profile.data._id);
    const { handleGameAccountAdd } = useProfile();
    console.log(item)

    const [form] = Form.useForm();
    console.log(connectedAccount)

    useEffect(() => {
      //this is to filter out and remain only valid accounts for this tournament
      const filteredAccounts = allAccounts.filter((account) => {
        if(item.platforms.includes('cross')){
          return item.crossPlatforms.includes(account.platform) && account.category === item.category;
        }else{
          return item.platforms.includes(account.platform) && account.category === item.category;
        }
      });
      if(filteredAccounts.length === 1) {
        setConnectedAccount(filteredAccounts[0])
      }else{
        setValidPlatformAccounts(filteredAccounts)
      }
    }, [])

    const handleOk = async () => {
      setConfirmLoading(true);
      
      if(clickedItem){ //choosing item
        setTimeout(() => {
          setConnectedAccount(clickedItem)
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      }else{ //new entry item
        const formData = form.getFieldsValue();
        const addedPlatform = {
          ...formData,
          uId: uId,
          category: item.category,
          tag: item.settings.accountTag,
          crossPlay: item.platforms.includes('cross')
        }

        const result = await handleGameAccountAdd(addedPlatform);
        if(result.success){
          setConnectedAccount(result.data)
          setOpen(false);
          setConfirmLoading(false);
        }
      }
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
                <Timeline
                  mode="left"
                  items={[
                    {
                      children: `Your ${connectedAccount.platform} ${connectedAccount.category} account has been connected`,
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
                  ]}
                />
            </div>

            <div className="col-md-6">
              <CheckoutDetails 
                  handleOrder={handleOrder} 
                  handlePaymentMethod={handlePaymentMethod} 
                  method={method} 
                  setMethod={setMethod} 
                  item={item}
                  confirmCheckoutLoading={confirmCheckoutLoading}
              />
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
                  validPlatformAccounts.length === 0 ? 
                  <AddGameAccount item={item} form={form} setIsFieldsFilled={setIsFieldsFilled}/> :
                  validPlatformAccounts.map((account, index) => (
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

export default CheckoutLayoutSolo;