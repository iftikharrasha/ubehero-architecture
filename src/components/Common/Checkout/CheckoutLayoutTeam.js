import React, { useState } from 'react';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Timeline, Empty, Modal, Col, Row, Form } from 'antd';
import { useSelector } from 'react-redux';
import useProfile from '../../../hooks/useProfile';
import CheckoutDetails from './CheckoutDetails';
import TeamCard from '../../Team/TeamCard';
import AddTeam from '../../Profile/AddTeam';

const CheckoutLayoutTeam = ({ item, handleOrder, handlePaymentMethod, teams, connectedTeam, method, setMethod, confirmCheckoutLoading }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [teamError, setTeamError] = useState(null);
    const [filteredCrossPlatforms, setFilteredCrossPlatforms] = useState([]);

    const { _id, userName, gameAccounts } = useSelector((state) => state.profile.data);
    const { handleTeamCreation, handleVerifyTeamMemberAdd } = useProfile();
    console.log(item)

    const arraysHaveSameElements = (array1, array2) => {
      // Sort the arrays
      const sortedArray1 = array1.slice().sort();
      const sortedArray2 = array2.slice().sort();
      console.log(sortedArray1, sortedArray2)
  
      // Check if the sorted arrays have the same elements
      return JSON.stringify(sortedArray1) === JSON.stringify(sortedArray2);
    }

    const handleOk = async () => {
      setConfirmLoading(true);
      
      const formData = form.getFieldsValue();
      const { category, members, platform, teamName } = formData;
      let addTeam = {
          captainId: _id,
          category: category,
          teamName: teamName,
          members: members,
          platforms: [platform],
          crossPlatforms: filteredCrossPlatforms,
      }

      //1. check if a same team category with same platform created by this player
      let teamExists = null;
      if(addTeam.platforms.includes('cross')){
          teamExists = teams.find(t => t.category === category && arraysHaveSameElements(t.crossPlatforms, addTeam.crossPlatforms));
          console.log('1', teamExists)
      }else{
          teamExists = teams.find(t => t.category === category && arraysHaveSameElements(t.platforms, addTeam.platforms));
          console.log("2", teamExists)
      }

      if (teamExists) {
          setTeamError({
              message: `You already have a team for ${category}`,
              description: 'Please choose a different game',
          });
          setConfirmLoading(false);
      } else {
          //2. check if user has the game account for this game
          const gameAccountExists = gameAccounts.filter((account) => {
              if(addTeam.platforms.includes('cross')){
                  console.log('cross', addTeam, account)
                return addTeam.crossPlatforms.includes(account.platform) && account.category === category;
              }else{
                return addTeam.platforms.includes(account.platform) && account.category === category;
              }
          });
          if(gameAccountExists.length === 0) {
              setTeamError({
                  message: `You do not have a game account for ${category}`,
                  description: 'Please add your game account first',
              });
              setConfirmLoading(false);
          }else{
              const result = await handleVerifyTeamMemberAdd(addTeam);
              console.log(result)
              if(result.success){
                  addTeam = {
                      ...addTeam,
                      members: {
                          invited: result.data
                      },
                  }
                  console.log(addTeam)
                  const team = await handleTeamCreation(addTeam);
                  if(team.success){
                      setOpen(false);
                      setConfirmLoading(false);
                  }
              }else{
                setTeamError({
                    message: result.message,
                    description: "Type your friends username correctly!",
                });
                setConfirmLoading(false);
              }
          }
        }
    };

    return (
        <div className="checkout row my-5">
          {/* step 1 */}
          {!connectedTeam ?
            <div className="col-md-12">
              <Timeline
                mode="middle"
                items={[
                  {
                    children: `This tournament requires you to connect your ${item?.category} team`,
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
                    children: `Make sure to activate your team before joining`,
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
                              No Team connected yet
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
                      children: `Your ${connectedTeam?.teamName} ${connectedTeam?.category} team has been connected`,
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
                      children: `Make sure to activate your team before joining`,
                      color: `${connectedTeam?.status === 'active' ? 'green' : 'red'}`,
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
                      <TeamCard item={connectedTeam} id={connectedTeam?._id}/>
                      ,
                      color: `${connectedTeam?.status === 'active' ? 'green' : 'red'}`,
                    },
                  ]}
                />
            </div>
            
            {
              connectedTeam?.status !== 'active' ? null :
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
            }
            </>
          }

            <Modal
              title={<h4 className='text-center pb-5'>Connect your {item.category} account</h4>}
              centered
              open={open}
              okText='Connect'
              onOk={handleOk}
              onCancel={() => setOpen(false)}
              confirmLoading={confirmLoading}
              width={1000}
              okButtonProps={{
                disabled: !isFieldsFilled,
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={16}>
                    <AddTeam userName={userName} form={form} setIsFieldsFilled={setIsFieldsFilled} teamError={teamError} setTeamError={setTeamError} filteredCrossPlatforms={filteredCrossPlatforms} setFilteredCrossPlatforms={setFilteredCrossPlatforms}/>
                </Col>
              </Row>
            </Modal>
            
        </div>
    );
};

export default CheckoutLayoutTeam;