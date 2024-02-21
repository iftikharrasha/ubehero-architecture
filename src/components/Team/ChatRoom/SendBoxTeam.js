import React, { useEffect, useState } from "react";
import { Input } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const { Search } = Input;

const SendBoxTeam = ({socket, isConnected, roomId, room, profile}) => {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isEnterPressed, setIsEnterPressed] = useState(false);

    const sendMessage = () => {
        if (message !== "") {
          const senderName = profile?.data?.userName;
          const senderId = profile?.data?._id;
          const senderPhoto = profile?.data?.photo;
          const senderPermissions = profile?.data?.permissions;

          const data = {
            roomId: roomId,
            room: room,
            senderId: senderId,
            senderName: senderName,
            senderPermissions: senderPermissions,
            senderPhoto: senderPhoto,
            message: message,
            read: false,
          }
          // Send message to server
          socket.emit("send_team_message", data);
          setMessage("");
        }
    };

    useEffect(() => {
        socket.on("userTyping", (userName) => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
          }, 1500);
        });
    }, [socket]);

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsEnterPressed(true);
      } else {
        if (!isTyping) {
          socket.emit("typing", { roomId: roomId, userName: profile?.data?.userName });
        }
      }
    };

    const handleReconnect = () => {
      window.location.reload();
    }

    useEffect(() => {
      if (isEnterPressed) {
        sendMessage();
        setIsEnterPressed(false);
      }
    }, [isEnterPressed]);

    const handleSearch = (value) => {
      setMessage(value);
      sendMessage();
    };

    const suffix = (
      <CloudUploadOutlined
        style={{
          fontSize: 16,
          color: '#1677ff',
        }}
      />
    );

    return (
      isConnected ? 
      <>
          {
              isTyping ? <div className='typing'>
                              <div className="tiblock">
                                  <div className="tidot"></div>
                                  <div className="tidot"></div>
                                  <div className="tidot"></div>
                              </div>
                          </div> : null
          }
          
          <Search
            placeholder="Enter text here.."
            enterButton="Send"
            size="large"
            suffix={suffix}
            onSearch={handleSearch}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            value={message}
          />
      </> :
      <div className="d-flex justicy-content-center align-items-center flex-column pb-4">
        <p>You are disconnected!</p>
        <button onClick={handleReconnect}>Reconnect</button>
      </div>
    );
};

export default SendBoxTeam;