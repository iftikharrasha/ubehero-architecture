import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Notification = ({socketN, isConnected, userId}) => {
  const [notyfReceived, setNotyfReceived] = useState([]);

  useEffect(() => {
      if (socketN) {
          const data = {
            userId: userId,
          }

          socketN.emit("join_notifications", data);
      }
  }, []);

  // useEffect(() => {
  //   let interval;
  //   if (socketN) {
  //     interval = setInterval(() => {
  //       socketN.emit("ping");
  //     }, 15000);
  //     setIsConnected(true);
  //   }
  
  //   return () => clearInterval(interval);
  // }, [socketN]);

  useEffect(() => {
    if(socketN){
        socketN.on('receive_notification', (data) => {
          setNotyfReceived((state) => [
              ...state,
              {
                  _id: data._id,
                  type: data.type,
                  subject: data.subject,
                  subjectPhoto: data.subjectPhoto,
                  invokedByName: data.invokedByName,
                  invokedById: data.invokedById,
                  receivedByName: data.receivedByName,
                  receivedById: data.receivedById,
                  route: data.route,
                  timeStamp: data.createdAt,
                  read: data.read
              },
          ]);
      });

      // Remove event listener on component unmount
      return () => socketN.off('receive_notification');
    }
  }, [socketN]);

  // Runs whenever a socket event is received from the server
  useEffect(() => {
    socketN.on("last_10_notifications", (last10Notifications) => {
      setNotyfReceived((state) => [...last10Notifications, ...state]);
    });

    return () => socketN.off("last_10_notifications");
  }, [socketN]);

  const handleRead = (e, item) => {
    e.preventDefault();

    socketN.emit("update_notification", item._id, item);

    // Update the state locally
    setNotyfReceived((notifications) => {
      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === item._id) {
          return { ...notification, read: !notification.read };
        }
        return notification;
      });
      return updatedNotifications;
    });
  }

  const handleReject = (e, notificationId, type) => {
    // e.preventDefault();

    // socketN.emit("update_notification", notificationId);

    // // Update the state locally
    // setNotyfReceived((notifications) => {
    //   const updatedNotifications = notifications.map((notification) => {
    //     if (notification._id === notificationId) {
    //       return { ...notification, read: !notification.read };
    //     }
    //     return notification;
    //   });
    //   return updatedNotifications;
    // });
  }

  //just for testing purposes for notifications
  const { loggedInUser } = useAuth();
     
  const handleFriendRequest = (e, item) => {
    e.preventDefault();

    const data = {
          type: "friend_request_accept",
          subject: "Accepted your friend request",
          subjectPhoto: loggedInUser.photo,
          invokedByName: loggedInUser.name,
          invokedById: loggedInUser.id,
          receivedByName: item.invokedByName,
          receivedById: item.invokedById, 
          route: `profile/${loggedInUser.id}`
    }

    //Send message to server
    socketN.emit("send_notification", data);

    const updatadData = {
      type: "friend_request_accept", 
      subject: `You're now friend with ${item.invokedByName}`, 
      invokedByName: "Request Accepted"
    }
    
    // Update the database on server
    socketN.emit("update_notification", item._id, updatadData);

    // Update the state locally
    setNotyfReceived((notifications) => {
      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === item._id) {
          return  { ...notification, 
                    ...updatadData
                  };
        }
        return notification;
      });
      return updatedNotifications;
    });
  };

  const handleFollowRequest = (e, item) => {
    e.preventDefault();

    const data = {
          type: "follow_request_accept",
          subject: "Following you back",
          subjectPhoto: loggedInUser.photo,
          invokedByName: loggedInUser.name,
          invokedById: loggedInUser.id,
          receivedByName: item.invokedByName,
          receivedById: item.invokedById, 
          route: `profile/${loggedInUser.id}`
    }

    //Send message to server
    socketN.emit("send_notification", data);

    const updatadData = {
      type: "follow_request_accept", 
      subject: `You're following back ${item.invokedByName}`, 
      invokedByName: "Following back",
    }
    
    // Update the database on server
    socketN.emit("update_notification", item._id, updatadData);

    // Update the state locally
    setNotyfReceived((notifications) => {
      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === item._id) {
          return  { ...notification, 
                    ...updatadData
                  };
        }
        return notification;
      });
      return updatedNotifications;
    });
  };

  return (
    <div className="dropdown">
        <Link to="/" className="mx-4 dropdown-toggle hidden-arrow text-white" id="navbarDropdownMenuLink"
        role="button" data-mdb-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-bell"></i>
            <span className="badge rounded-pill badge-notification bg-success">{notyfReceived.filter(n => !n.read).length}</span>
        </Link>
        <ul className="dropdown-menu p-0" aria-labelledby="navbarDropdownMenuLink">
      
        <div
            className="card-header d-flex justify-content-between align-items-center p-3 bg-secondary text-white border-bottom-0">
            <p className="mb-0 fw-bold">Notifications</p>
        </div>
          {
            notyfReceived.length > 0 ?
              notyfReceived.slice().reverse().map((item, index) => (
                <li key={index} className={item.read === false ? "notyf-item unread" : "notyf-item"}>
                    <a className="dropdown-item" href={`${process.env.REACT_APP_CLIENT_ORIGIN}/${item.route}`}>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='text-left subject d-flex justify-content-center align-items-center'>
                          <span className='d-flex justify-content-center align-items-center'>
                            <i className="fas fa-bell text-secondary"></i>
                          </span>
                          <div>
                            <h6>{item.invokedByName}</h6>
                            <p>{item.subject}</p>
                          </div>
                        </div>
                        <div>
                          {item.type === 'friend_request' || item.type === 'team_invite' ?  
                          <>
                            <i className="fas fa-check check me-3" onClick={(e) => {e.stopPropagation(); handleFriendRequest(e, item)}}></i>
                            <i className="fas fa-close close" onClick={(e) => {e.stopPropagation(); handleReject(e, item._id, "reject")}}></i>
                          </> : 
                          item.type === 'follow_request' ? 
                          <>
                            <button className="btn btn-success follow" onClick={(e) => {e.stopPropagation(); handleFollowRequest(e, item)}}>Follow Back</button> 
                          </> : 
                          item.read ? 
                            <i className="fas fa-envelope-open" onClick={(e) => {e.stopPropagation(); handleRead(e, item)}}></i> : 
                            <i className="fas fa-envelope" onClick={(e) => {e.stopPropagation(); handleRead(e, item)}}></i>
                          }
                        </div>
                      </div>
                    </a>
                </li>
              )) : 
              <li>
                  <Link className="dropdown-item" to="/">No new notifications</Link>
              </li>
          }
        </ul>
    </div>
  );
};

export default Notification;