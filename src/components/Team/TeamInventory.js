import React, { useState } from 'react';
import { Avatar, Button, List, Modal, Row } from 'antd';
import InventoryPopup from './InventoryPopup';

const data = [
  {
    title: 'Invite a friend to your team',
    icon: 'https://cdn-icons-png.flaticon.com/512/11325/11325151.png',
    description: 'Invite and they have to accept your invitation to join the team',
    action: 'invite',
  },
  {
    title: 'Remove a team member',
    icon: 'https://cdn-icons-png.flaticon.com/512/5189/5189338.png',
    description: 'Once you Remove a member, there is no going back. Please be certain',
    action: 'remove',
  },
  {
    title: 'Transfer leadership of your team',
    icon: 'https://cdn-icons-png.flaticon.com/512/5043/5043314.png',
    description: 'Transfer leader armband to another member where you play as a teammate only.',
    action: 'transfer',
  },
  {
    title: 'Leave this team',
    icon: 'https://cdn-icons-png.flaticon.com/512/1011/1011500.png',
    description: 'Once you leave this team, there is no going back. Please be certain',
    action: 'leave',
  },
  {
    title: 'Delete this team',
    icon: 'https://cdn-icons-png.flaticon.com/512/3687/3687412.png',
    description: 'Once you delete this team, there is no going back. Please be certain',
    action: 'delete',
  },
];

const TeamInventory = ({team}) => {
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [isFieldsFilled, setIsFieldsFilled] = useState(false);

  // const handleOk = async () => {
  //   // setConfirmLoading(true);
    
  //   // if(clickedItem){ //choosing item
  //   //   setTimeout(() => {
  //   //     setConnectedAccount(clickedItem)
  //   //     setOpen(false);
  //   //     setConfirmLoading(false);
  //   //   }, 2000);
  //   // }else{ //new entry item
  //   //   const formData = form.getFieldsValue();
  //   //   const addedPlatform = {
  //   //     ...formData,
  //   //     uId: uId,
  //   //     category: item.category,
  //   //     tag: item.settings.accountTag
  //   //   }

  //   //   const result = await handleGameAccountAdd(addedPlatform);
  //   //   if(result.success){
  //   //     setConnectedAccount(result.data)
  //   //     setOpen(false);
  //   //     setConfirmLoading(false);
  //   //   }
  //   // }
  // };

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                <List.Item actions={[<Button type="default" danger>{item.action}</Button>]}>
                    <List.Item.Meta
                    avatar={<Avatar src={item.icon} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                    />
                </List.Item>
                )}
            />
             {/* <Modal
              title={<h4 className='text-center pb-5'>Invitation</h4>}
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
                <InventoryPopup team={team}/>
              </Row>
            </Modal> */}
        </>
    );
};

export default TeamInventory;