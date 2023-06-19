import React from "react";
import { Card, Button, Row, Image } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import moment from "moment";

const ProfileTop = ({ref3ProfilePic, ref4CoverPhoto, profile}) => {
  const { _id, userName, createdAt, photo, version, stats } = profile;
  
  return (
    <div className='d-flex mb-3' 
      style={{position: 'relative'}}
    >
      <Card ref={ref4CoverPhoto} bordered style={{ width: "100%", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', backgroundImage: `url('')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <Row justify="space-between" align="end">
          <Row justify="left" align="middle" ref={ref3ProfilePic}>
            <Image
              width={150}
              src={photo}
              alt='profile'
            />
            <div className="ps-4">
              <h5 className='card-title'>{userName}</h5>
              <h6>Member Since: {moment(createdAt).format('ll')}</h6>
            </div>
          </Row>
          <Row justify="space-between" align="start" style={{ flexDirection: 'column' }} className="my-3" >
            <CameraOutlined style={{ fontSize: '24px'}} />
            <Button type="default" size="small">
              FOLLOWERS 30
            </Button>
          </Row>
        </Row>
      </Card>
    </div>
  );
};

export default ProfileTop;
