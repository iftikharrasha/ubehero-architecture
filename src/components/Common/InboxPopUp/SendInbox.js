import React, { useEffect, useState } from "react";
import moment from "moment/moment";

const SendInbox = ({socketInbox, isInboxConnected, roomId, receiverId, room, user}) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
      if (message !== "") {
        const senderName = user.userName;
        const senderId = user._id;
        const senderPhoto = user.photo;
        const senderPermissions = user.permissions;

        const timeStamp = Date.now();
        const date = moment(timeStamp);
        const output = date.format('YYYY-MM-DDTHH:mm:ss.SSS');

        const data = {
          roomId: roomId,
          room: room,
          senderId: senderId,
          senderName: senderName,
          senderPhoto: senderPhoto,
          senderPermissions: senderPermissions,
          receiverId: receiverId,
          message: message,
          timeStamp: output,
          read: false
        }

        //Send message to server
        socketInbox.emit("send_message", data);
        setMessage("");
      }
  };

  useEffect(() => {
      //the other user will see the typing ..
      socketInbox.on("userTyping", (userName) => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      });
  }, [socketInbox, isTyping]);

  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      } else {
        if (!isTyping) {
          socketInbox.emit('typing', { roomId: roomId, userName: user.userName });
        }
      }
  };

  const handleReconnect = () => {
    window.location.reload();
  }

  return (
    isInboxConnected ? 
    <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
        {
            isTyping ? <div className='typing typingInbox'>
                            <div className="tiblock">
                                <div className="tidot"></div>
                                <div className="tidot"></div>
                                <div className="tidot"></div>
                            </div>
                        </div> : null
        }
        
        <span className="avatarUser"><img src={user.photo} alt="avatar 3"/></span>
        <input 
            type="text" 
            className="form-control form-control-lg mx-3" 
            id="exampleFormControlInput3"
            placeholder="Type message"
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
        />
        {/* <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
        <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a> */}
        <i className="fas fa-paper-plane" onClick={sendMessage}></i>
    </div> :
    <div className="d-flex justicy-content-center align-items-center flex-column pb-4">
      <p>Chat disconnected!</p>
      <button onClick={handleReconnect}>Reload</button>
    </div>
  );
};

export default SendInbox;