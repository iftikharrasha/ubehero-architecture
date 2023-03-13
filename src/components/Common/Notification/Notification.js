import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Notification = ({socket, isConnected, loggedInUser}) => {
  const [notyfReceived, setNotyfReceived] = useState([]);

    useEffect(() => {
        if (socket) {
            const userId = loggedInUser.id;

            const data = {
              userId: userId,
            }

            socket.emit("join_notifications", data);
        }
    }, []);
  
    // useEffect(() => {
    //   let interval;
    //   if (socket) {
    //     interval = setInterval(() => {
    //       socket.emit("ping");
    //     }, 15000);
    //     setIsConnected(true);
    //   }
    
    //   return () => clearInterval(interval);
    // }, [socket]);

    useEffect(() => {
      if(socket){
          socket.on('receive_notification', (data) => {
            setNotyfReceived((state) => [
                ...state,
                {
                    message: data.message,
                    senderName: data.senderName,
                    timeStamp: data.timeStamp,
                    senderPhoto: data.senderPhoto,
                },
            ]);
        });

        // Remove event listener on component unmount
        return () => socket.off('receive_notification');
      }
  }, [socket]);

  // Runs whenever a socket event is received from the server
  useEffect(() => {
    socket.on("last_10_notifications", (last10Notifications) => {
      setNotyfReceived((state) => [...last10Notifications, ...state]);
    });

    return () => socket.off("last_10_notifications");
}, [socket]);

    return (
        <div className="dropdown">
            <Link to="/" className="mx-4 dropdown-toggle hidden-arrow text-white" id="navbarDropdownMenuLink"
            role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-success">{notyfReceived.length}</span>
            </Link>
            <ul className="dropdown-menu p-0" aria-labelledby="navbarDropdownMenuLink">
              {
                notyfReceived.length > 0 ?
                  notyfReceived.map((item, index) => (
                    <li key={index} className="notyf-item">
                        <a className="dropdown-item" href={`${process.env.REACT_APP_CLIENT_ORIGIN}/${item.route}`}>
                          <div className='d-flex justify-content-between align-items-center'>
                            <div className='text-left subject d-flex justify-content-center align-items-center'>
                              <span className='d-flex justify-content-center align-items-center'>
                                <img className='img-fluid' src="https://www.vhv.rs/dpng/d/423-4235985_bell-notification-bell-icon-transparent-hd-png-download.png" alt="notyf" />
                              </span>
                              <div>
                                <h6>{item.invokedByName}</h6>
                                <p>{item.subject}</p>
                              </div>
                            </div>
                            <div>
                              <i className="fas fa-close"></i>
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