import React, { useEffect, useState } from "react";
import moment from "moment/moment";

const SendBox = ({socket, isConnected, roomId, room, loggedInUser}) => {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = () => {
        if (message !== "") {
          const senderName = loggedInUser.name;
          const senderId = loggedInUser.id;
          const senderPhoto = loggedInUser.photo;
          const senderPermissions = loggedInUser.permissions;

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
          socket.emit("send_message", data);
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
        if (e.key === 'Enter') {
            sendMessage();
        } else {
          if (!isTyping) {
            socket.emit('typing', { roomId: roomId, userName: loggedInUser.name });
          }
        }
    };

    const handleReconnect = () => {
      window.location.reload();
    }

    return (
      isConnected ? 
      <div className="chat-message clearfix">
          {
              isTyping ? <div className='typing'>
                              <div className="tiblock">
                                  <div className="tidot"></div>
                                  <div className="tidot"></div>
                                  <div className="tidot"></div>
                              </div>
                          </div> : null
          }
          

          <div className="input-group mb-0">
              <input type="text" 
                  className="form-control" 
                  placeholder="Enter text here..."
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={message}
              />   
              <div className="input-group-prepend">
                  <span className="input-group-text" onClick={sendMessage}><i className="fa fa-send"></i></span>
              </div>                                 
          </div>
      </div> :
      <div className="d-flex justicy-content-center align-items-center flex-column pb-4">
        <p>You are disconnected!</p>
        <button onClick={handleReconnect}>Reconnect</button>
      </div>
    );
};

export default SendBox;