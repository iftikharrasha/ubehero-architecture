import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useContext } from 'react';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import msg from '../../../sounds/msg.mp3';
import bot from '../../../sounds/bot.mp3';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Button, List, Popover, Row, Skeleton, Tabs } from 'antd';
import { UsergroupAddOutlined, MessageOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const InboxThread = ({socketN}) => {
    const [inboxReceived, setInboxReceived] = useState([]);
    const [roomsReceived, setRoomsReceived] = useState([]);

    const purchasedItems = useSelector(state => state.profile?.data?.purchasedItems?.tournaments);
    const allTournaments = useSelector(state => state.tournaments?.data);

    const { setShowInbox, setPopUser } = useContext(InboxContext);
    const [sound, setSound] = useState(null);

    const handleInboxPop = (item) => {
      // Find the index of the clicked message in the inboxReceived array
      const index = inboxReceived.findIndex((msg) => msg.roomId === item.roomId);

      // Update the messageCount of the clicked message to 0
      const updatedMsg = {...inboxReceived[index], messageCount: 0};

      // Update the inboxReceived state by replacing the clicked message with the updated one
      setInboxReceived([
        ...inboxReceived.slice(0, index),
        updatedMsg,
        ...inboxReceived.slice(index + 1)
      ]);

      //this is to have popup user
      const user =  {
        key: item.senderId,
        userName: item.senderName,
        photo: item.senderPhoto,
        message: item.message,
        read: item.read,
      }

      setShowInbox(true);
      setPopUser(user);
    };

    useEffect(() => {
      if(socketN){
          socketN.on('track_incoming', (data) => {
            console.log('track_incoming', data);
              setInboxReceived(state => {
                const existingMessage = findExistingMessage(state, data.senderId, data.roomId);
                if (existingMessage) {
                  return state.map(item => {
                    if (item === existingMessage) {
                      return {
                        ...item,
                        message: data.message,
                        createdAt: data.createdAt,
                        messageCount: item.messageCount + 1
                      };
                    }
                    return item;
                  });
                } else {
                  return [
                    ...state,
                    {
                      roomId: data.roomId,
                      senderId: data.senderId,
                      senderName: data.senderName,
                      senderPhoto: data.senderPhoto,
                      senderPermissions: data.senderPermissions,
                      receiverId: data.receiverId,
                      message: data.message,
                      createdAt: data.createdAt,
                      read: data.read,
                      messageCount: 1
                    }
                  ];
                }
              });

              if(data.sound === "bot"){
                  setSound(bot)
                  const newMessageSound = document.getElementById("newMessageSound3");
                  newMessageSound.play();
              }else if(data.sound === "msg"){
                  setSound(msg)
                  const newMessageSound = document.getElementById("newMessageSound3");
                  newMessageSound.play();
              }else{
                  setSound(null)
              }
            });
  
        // Remove event listener on component unmount
        return () => socketN.off('track_incoming');
      }
    }, [socketN]);

    // Runs whenever a socket event is received from the server
    useEffect(() => {
      socketN.on("track_uniqueInbox", (latestInbox) => {
        setInboxReceived((state) => [...latestInbox, ...state]);
      });

      return () => socketN.off("track_uniqueInbox");
    }, [socketN]);

    //filter tournaments and get the common one that the user purchased
    useEffect(() => {
      if(purchasedItems){
          const myRooms = allTournaments.filter(tournament => purchasedItems.some(itemId => tournament._id === itemId));
          setRoomsReceived(myRooms)
      }
    }, [purchasedItems, allTournaments]);

    const findExistingMessage = (inboxReceived, senderId, roomId) => {
      return inboxReceived.find(item => item.senderId === senderId && item.roomId === roomId);
    }

    const totalMessageCount = inboxReceived.reduce((total, item) => {
      return total + item.messageCount;
    }, 0);

    const [activeKey, setActiveKey] = useState('inbox');
    const handleTabChange = (key) => {
      setActiveKey(key)
    };

  //loader to load inbox datas
  const [initLoading1, setInitLoading1] = useState(true);
  const [inboxData, setInboxData] = useState([]);
  const [isLoadingMore1, setLoadingMore1] = useState(false);
  const [hasMore1, setHasMore1] = useState(true);
  const itemLimit1 = 5; // Number of items to display initially
  const containerRef1 = useRef(null);

  //loader to load inbox datas
  const [initLoading2, setInitLoading2] = useState(true);
  const [chatRoom, setChatRoom] = useState([]);
  const [isLoadingMore2, setLoadingMore2] = useState(false);
  const [hasMore2, setHasMore2] = useState(true);
  const itemLimit2 = 5; // Number of items to display initially
  const containerRef2 = useRef(null);

  useEffect(() => {
    // Simulating initial inboxData loading
    setTimeout(() => {
      setInitLoading1(false);
      setInboxData(inboxReceived.slice(0, itemLimit1)); // Slice the inboxData to display limited items
      setHasMore1(itemLimit1 < inboxReceived.length); // Check if there are more items to load
    }, 1000);
  }, [inboxReceived, itemLimit1]);

  useEffect(() => {
    // Simulating initial inboxData loading
    setTimeout(() => {
      setInitLoading2(false);
      setChatRoom(roomsReceived.slice(0, itemLimit2)); // Slice the inboxData to display limited items
      setHasMore2(itemLimit2 < roomsReceived.length); // Check if there are more items to load
    }, 1000);
  }, [roomsReceived, itemLimit1]);

  const loadMore1 = () => {
    setHasMore1(false)
    setLoadingMore1(true);
  
    // Simulating loading more inboxData with a delay
    setTimeout(() => {
      const currentDataLength = inboxData.length;
      const newData = [
        ...inboxData,
        ...Array(itemLimit1).fill({ loading: true }) // Add skeleton items with loading state
      ];
  
      setInboxData(newData);
  
      // Simulating inboxData loading with a delay
      setTimeout(() => {
        const updatedData = [
          ...inboxData.slice(0, currentDataLength),
          ...inboxReceived.slice(currentDataLength, currentDataLength + itemLimit1)
        ];
  
        setInboxData(updatedData);
        setLoadingMore1(false);
        setHasMore1(currentDataLength + itemLimit1 < inboxReceived.length); // Check if there are more items to load
      }, 2000);
    }, 0);
  };

  const loadMore2 = () => {
    setHasMore2(false)
    setLoadingMore2(true);
  
    // Simulating loading more inboxData with a delay
    setTimeout(() => {
      const currentDataLength = roomsReceived.length;
      const newData = [
        ...roomsReceived,
        ...Array(itemLimit1).fill({ loading: true }) // Add skeleton items with loading state
      ];
  
      setChatRoom(newData);
  
      // Simulating inboxData loading with a delay
      setTimeout(() => {
        const updatedData = [
          ...roomsReceived.slice(0, currentDataLength),
          ...roomsReceived.slice(currentDataLength, currentDataLength + itemLimit2)
        ];
  
        setChatRoom(updatedData);
        setLoadingMore2(false);
        setHasMore2(currentDataLength + itemLimit2 < roomsReceived.length); // Check if there are more items to load
      }, 2000);
    }, 0);
  };

  const scrollToBottom = () => {
    if (containerRef2.current) {
      const { scrollHeight } = containerRef2.current;
      containerRef2.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [inboxData]);

    const content = (
        <div className="notyf-item scrollable">
          <Tabs activeKey={activeKey} onChange={handleTabChange}>
              <TabPane
                  key="inbox"
                  tab={
                      <Row justify="left" align="middle">
                          <MessageOutlined /> <span>My inbox</span>
                      </Row>
                  }
              >
                  <div className="notyf-item" ref={containerRef1}>
                    <List
                      className="demo-loadMore1-list"
                      itemLayout="horizontal"
                      size='larger'
                      loading={initLoading1}
                      loadMore1={loadMore1}
                      dataSource={inboxData}
                      renderItem={(item) => (
                        <List.Item
                          onClick={(e) => handleInboxPop(item)}
                          actions={
                            isLoadingMore1 ? null :
                              [
                                <p>{moment(item.createdAt).fromNow()}</p>
                              ] 
                          }
                        >
                          <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                              avatar={
                                  <Badge count={item.messageCount}>
                                    <Avatar src={item.senderPhoto}/>
                                  </Badge>
                              }
                              title={item.senderName}
                              description={item.message}
                            />
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                    {hasMore1 && (
                      <Button onClick={loadMore1} block className='loadMore1' danger>
                        Load More
                      </Button>
                    )}
                  </div>

              </TabPane>

              <TabPane
                  key="prizes"
                  tab={
                      <Row justify="left" align="middle">
                          <UsergroupAddOutlined /> <span>Chat Rooms</span>
                      </Row>
                  }
              >
                <div className="notyf-item" ref={containerRef2}>
                  <List
                    className="demo-loadMore1-list"
                    itemLayout="horizontal"
                    size='larger'
                    loading={initLoading1}
                    loadMore1={loadMore1}
                    dataSource={roomsReceived}
                    renderItem={(item) => (
                      <List.Item
                        actions={
                          isLoadingMore1 ? null :
                            [
                              <Button block size='small'>
                                <Link to={`/tournament/details/${item._id}/chatroom`}>Enter Room</Link>
                              </Button>
                            ] 
                        }
                      >
                        <Skeleton avatar title={false} loading={item.loading} active>
                          <List.Item.Meta
                            avatar={
                                <Badge>
                                  <Avatar src={item.tournamentThumbnail}/>
                                </Badge>
                            }
                            title={item.tournamentName}
                            description={moment(item.dates?.registrationStart).fromNow()}
                          />
                        </Skeleton>
                      </List.Item>
                    )}
                  />
                  {hasMore1 && (
                    <Button onClick={loadMore1} block className='loadMore1' danger>
                      Load More
                    </Button>
                  )}
                </div>
              </TabPane>
          </Tabs>
        </div>
    );

  return (
    <div className='me-4'>
      <Popover placement="bottomLeft" title="Inbox" content={content} trigger="click" className='popup'>
          <Badge count={totalMessageCount} size="small" color="red" style={{ color: 'white' }}>
            <i className="fa-solid fa-message text-white"></i>
          </Badge>
      </Popover>
      <audio id="newMessageSound3" src={sound} type="audio/mpeg"></audio>
    </div>
  );
};

export default InboxThread;