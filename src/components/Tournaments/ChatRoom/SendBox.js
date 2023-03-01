import React, { useState } from "react";
import moment from "moment/moment";

const SendBox = ({socket, roomId, room, loggedInUser}) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message !== "") {
          const senderName = loggedInUser.name;
          const senderId = loggedInUser.id;
          const senderPhoto = loggedInUser.photo;
          const senderPermissions = loggedInUser.permissions;
        //   const senderType = loggedInUser.permissions.includes('master') ? 'master' : 'user';

          const timeStamp = Date.now();
          const date = moment(timeStamp);
          const output = date.format('YYYY-MM-DDTHH:mm:ss.SSS');

          const data = {
            roomId: roomId,
            room: room,
            senderId: senderId,
            senderName: senderName,
            senderPermissions: senderPermissions,
            senderPhoto: senderPhoto,
            message: message,
            timeStamp: output,
          }
          // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
          socket.emit("send_message", data);
          setMessage("");
        }
    };

    return (
        <div className="chat-message clearfix">
            <div className="input-group mb-0">
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter text here..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />   
                <div className="input-group-prepend">
                    <span className="input-group-text" onClick={sendMessage}><i className="fa fa-send"></i></span>
                </div>                                 
            </div>
        </div>
    );
};

export default SendBox;