import React from "react";
import { Card, Button, Row, Image,  Avatar, Divider, Tooltip, Badge } from 'antd';
import { CameraOutlined, AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import moment from "moment";
import { Link } from 'react-router-dom';

const TeamTop = ({team, badges}) => {
  const { _id, teamName, createdAt, photo, version, stats, coverPhoto } = team;
  
  return (
    <div className='d-flex mb-3' 
      style={{position: 'relative'}}
    >
      <Card bordered 
        // style={{ width: "100%"}}
        style={{ width: "100%", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', backgroundImage: `url(${coverPhoto})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        <Row justify="space-between" align="end">
          <Row justify="left" align="middle">
            <Avatar src={photo} size={130}/>
            <div className="ps-4">
              <h5 className='card-title mb-1'>{teamName}</h5>
              <p>Member since: July 2, 2023</p>
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
                    {/* {
                      badges.slice(0).reverse().filter(badge => badge.level > 0).map((badge, index) => (
                        <Tooltip title={`L.${badge.level === 0 ? 1 : badge.level} ${badge.title}`} placement="top">
                          <Avatar key={index}
                            src={badge.icon}
                          />
                        </Tooltip>
                      ))
                    } */}
                  </Avatar.Group>
                  <span className="ms-2">
                    <p className="mb-2">No badges unlocked yet</p>
                    <Divider className="my-1"/>
                  </span>
                </div>
            </div>
          </Row>
          <Row justify="space-between" align="start" style={{ flexDirection: 'column' }} className="my-3" >
            <CameraOutlined style={{ fontSize: '24px'}} />
            <Link to={`/team/2/friends`}>
              <Button type="default" size="small">
                4 MEMBERS
              </Button>
            </Link>
            <Link to={`/team/2/followers`}>
              <Button type="default" size="small">
                213 FOLLOWERS
              </Button>
            </Link>
          </Row>
        </Row>
      </Card>
    </div>
  );
};

export default TeamTop;


// import React from "react";
// import { Card, Button, Row, Image,  Avatar, Divider, Tooltip, Badge } from 'antd';
// import { CameraOutlined, AntDesignOutlined, UserOutlined } from '@ant-design/icons';
// import moment from "moment";
// import { Link } from 'react-router-dom';

// const TeamTop = ({team, badges}) => {
//   const { _id, userName, createdAt, photo, version, stats, requests } = team;
  
//   return (
//     <div className='d-flex mb-3' 
//       style={{position: 'relative'}}
//     >
//       <Card bordered 
//         style={{ width: "100%"}}
//         // style={{ width: "100%", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', backgroundImage: 'url(https://res.cloudinary.com/duoalyur6/image/upload/v1695208606/MOSHED-2023-9-20-17-12-57_i7hti1.gif)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
//       >
//         <Row justify="space-between" align="end">
//           <Row justify="left" align="middle">
//             <Avatar src={photo} size={130}/>
//             <div className="ps-4">
//               <h5 className='card-title mb-1'>{userName}</h5>
//               <p>Member since: {moment(createdAt).format('ll')}</p>
//                 <div className="d-flex">
//                   <Avatar.Group
//                     shape="square"
//                     maxCount={14}
//                     size="medium"
//                     maxStyle={{
//                       color: '#f56a00',
//                       backgroundColor: '#fde3cf',
//                     }}
//                   >
//                     {
//                       badges.slice(0).reverse().filter(badge => badge.level > 0).map((badge, index) => (
//                         <Tooltip title={`L.${badge.level === 0 ? 1 : badge.level} ${badge.title}`} placement="top">
//                           <Avatar key={index}
//                             src={badge.icon}
//                           />
//                         </Tooltip>
//                       ))
//                     }
//                   </Avatar.Group>
//                   <span className="ms-2">
//                     <p className="mb-2">{badges.filter(badge => badge.level > 0).length === 0 ? `No badges unlocked yet` : `${badges.filter(badge => badge.level > 0).length} badge unlocked so far`}</p>
//                     <Divider className="my-1"/>
//                   </span>
//                 </div>
//             </div>
//           </Row>
//           <Row justify="space-between" align="start" style={{ flexDirection: 'column' }} className="my-3" >
//             <CameraOutlined style={{ fontSize: '24px'}} />
//             <Link to={`/team/${_id}/friends`}>
//               <Button type="default" size="small">
//                 {requests?.friend?.mutuals?.length} MEMBERS
//               </Button>
//             </Link>
//             <Link to={`/team/${_id}/followers`}>
//               <Button type="default" size="small">
//                 {requests?.follow?.follower?.length} FOLLOWERS
//               </Button>
//             </Link>
//           </Row>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default TeamTop;
