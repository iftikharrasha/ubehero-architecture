import React from "react";
import { Card, Button, Row, Image,  Avatar, Divider, Tooltip, Badge } from 'antd';
import { CameraOutlined, AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import moment from "moment";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const PartyTop = ({party, badges}) => {
  const { photo, coverPhoto, members, owner } = party;
  const profile = useSelector(state => state.profile);
  const isLoggedIn = profile?.signed_in;
  const userId = profile?.data?._id;
  
  return (
    <div className='d-flex mb-3' 
      style={{position: 'relative'}}
    >
      <Card bordered 
        // style={{ width: "100%"}}
        // style={{ width: "100%", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
        style={{ width: "100%", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', backgroundImage: `url('https://render.fineartamerica.com/images/rendered/default/print/8/5.5/break/images/artworkimages/medium/2/dark-blue-grunge-background-caracterdesign.jpg')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        <Row justify="space-between" align="end">
          <Row justify="left" align="middle">
            <Avatar src={photo} size={130}/>
            <div className="ps-4">
                <div className="d-flex">
                  <Avatar.Group
                    shape="square"
                    maxCount={14}
                    size="medium"
                    maxStyle={{
                      color: '#f56a00',
                      backgroundColor: '#fde3cf',
                    }}
                  >
                  </Avatar.Group>
                </div>
            </div>
          </Row>
          <Row justify="space-between" align="start" style={{ flexDirection: 'column' }} className="my-3" >
            
            {
                !isLoggedIn ? <div></div> : owner?._id === userId ? <div></div> :
                <CameraOutlined style={{ fontSize: '24px'}} />
            }
            
            <Link to={`/party/2/friends`}>
              <Button type="default" size="small">
                {members?.joined?.length+1} MEMBER
              </Button>
            </Link>
          </Row>
        </Row>
      </Card>
    </div>
  );
};

export default PartyTop;
