import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Badge, List, Popover, Skeleton, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const Notification = ({socketN, isConnected, userId}) => {
  const [notyfReceived, setNotyfReceived] = useState([]);
  const { loggedInUser } = useAuth();
  console.log(notyfReceived)

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
                  createdAt: data.createdAt,
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

  const handleDelete = (e, notificationId) => {
    e.preventDefault();

    socketN.emit("delete_notification", notificationId);

    // Update the state locally
    setNotyfReceived((notifications) => {
      const updatedNotifications = notifications.filter(notification => notification._id !== notificationId);
      return updatedNotifications;
    });
  }
     
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

  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemLimit = 5; // Number of items to display initially
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulating initial data loading
    setTimeout(() => {
      setInitLoading(false);
      setData(notyfReceived.slice(0, itemLimit)); // Slice the data to display limited items
      setHasMore(itemLimit < notyfReceived.length); // Check if there are more items to load
    }, 1000);
  }, [notyfReceived, itemLimit]);

  const loadMore = () => {
    setHasMore(false)
    setLoadingMore(true);
  
    // Simulating loading more data with a delay
    setTimeout(() => {
      const currentDataLength = data.length;
      const newData = [
        ...data,
        ...Array(itemLimit).fill({ loading: true }) // Add skeleton items with loading state
      ];
  
      setData(newData);
  
      // Simulating data loading with a delay
      setTimeout(() => {
        const updatedData = [
          ...data.slice(0, currentDataLength),
          ...notyfReceived.slice(currentDataLength, currentDataLength + itemLimit)
        ];
  
        setData(updatedData);
        setLoadingMore(false);
        setHasMore(currentDataLength + itemLimit < notyfReceived.length); // Check if there are more items to load
      }, 2000);
    }, 0);
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      const { scrollHeight } = containerRef.current;
      containerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const content = (
    <div className="notyf-item scrollable" ref={containerRef}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        size='larger'
        loading={initLoading}
        loadMore={loadMore}
        dataSource={data.sort((a, b) => b.createdAt - a.createdAt)}
        renderItem={(item) => (
          <List.Item
            actions={
              isLoadingMore ? null :
                item.type === 'friend_request' || item.type === 'team_invite' ?  
                [
                  <i className="fas fa-check check me-3" onClick={(e) => {e.stopPropagation(); handleFriendRequest(e, item)}}></i>,
                  <i className="fas fa-close close" onClick={(e) => {e.stopPropagation(); handleDelete(e, item._id)}}></i>,
                ] : 
                item.type === 'follow_request' ? 
                [
                  <Button type='default' size='small' onClick={(e) => {e.stopPropagation(); handleFollowRequest(e, item)}}>
                    Follow Back
                  </Button>
                ] : 
                item.read ? 
                [
                  <i className="fas fa-envelope-open" onClick={(e) => {e.stopPropagation(); handleRead(e, item)}}></i>
                ] : 
                [
                  <i className="fas fa-envelope" onClick={(e) => {e.stopPropagation(); handleRead(e, item)}}></i>
                ]
            }
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<BellOutlined style={{color: !item.read ? 'red' : null}}/>}
                title={<Link to={`/${item.route}`}>{item.invokedByName}</Link>}
                description={item.subject}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      {hasMore && (
        <Button onClick={loadMore} block className='loadmore' danger>
          Load More
        </Button>
      )}
    </div>
  );

  return (
    <div className='me-4'>
      <Popover placement="bottomLeft" title={`Notifications (${notyfReceived.filter(n => !n.read).length} unread)`} content={content} trigger="click" className='popup'>
        <Badge count={notyfReceived.filter(n => !n.read).length} size="small" color="red" style={{ color: 'white' }}>
          <i className="fa-solid fa-bell text-white"></i>
        </Badge>
      </Popover>
    </div>
  );
};

export default Notification;