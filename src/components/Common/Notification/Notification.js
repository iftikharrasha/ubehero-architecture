import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
                    type: data.type,
                    subject: data.subject,
                    subjectPhoto: data.subjectPhoto,
                    invokedByName: data.invokedByName,
                    invokedById: data.invokedById,
                    receivedByName: data.receivedByName,
                    receivedById: data.receivedById,
                    route: data.route,
                    timeStamp: data.timeStamp,
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
                  notyfReceived.reverse().map((item, index) => (
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