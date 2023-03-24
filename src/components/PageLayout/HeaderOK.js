import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from "react-redux";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { changeRegion } from "../../redux/slices/staticSlice";
import { useHistory } from "react-router-dom";
import ubehero from "../../images/ubehero-dark.svg";
import Notification from "../Common/Notification/Notification";
import io from 'socket.io-client';

let initialSocketId = null;

const Header = () => {
  const dispatch = useDispatch();
  const { loggedInUser, handlelogOut } = useAuth();
  const history = useHistory();

  //socket implementation
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const notyfSocketId = sessionStorage.getItem("notyfSocketId");
    const ACCESS_TOKEN = sessionStorage.getItem("jwt");
    const notyfSocket = io.connect(`${process.env.REACT_APP_API_LINK}/notifications`, {
      transports: ['websocket'],
      query: { userId: loggedInUser.id },
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      auth: { token: ACCESS_TOKEN },
      ...(notyfSocketId ? { auth: { notyfSocketId } } : {}),
    });

    notyfSocket.on("connect", () => {
      sessionStorage.setItem("notyfSocketId", notyfSocket.id);
      console.log(`Notyf socket connected with ID ${notyfSocket.id}`);
      setIsConnected(true);
    });

    notyfSocket.on("reconnect", (attemptNumber) => {
      console.log(`Notyf socket reconnected after ${attemptNumber} attempts`);
      setIsConnected(true);
    });
  
    notyfSocket.on("reconnect_error", (error) => {
      console.log("Notyf socket reconnection error", error);
      setIsConnected(false);
    });

    // Listen for pong event
  //   notyfSocket.on("pong", (receivedDate, pingReceivedAt, pongSocketId) => {

  //     const timeStamp = new Date().getTime();
  //     const latency = timeStamp - receivedDate;
  //     console.log(`Received pong of ${notyfSocket.id} at ${pingReceivedAt} with latency ${latency}ms`);

  //     if(!initialSocketId){
  //         console.log("pongSocketId, initialSocketId", pongSocketId, initialSocketId)
  //         initialSocketId = pongSocketId;
  //     }

  //     // Compare the socketId with the initial socketId to see if the socket is still connected
  //     if(initialSocketId){
  //         if (pongSocketId !== initialSocketId) {
  //             initialSocketId = null;
  //             console.log('Socket disconnected for inactivity!');
  //             setIsConnected(false);

  //             // notyfSocket.emit("leave_room", { timeStamp });
  //         }
  //     }
  //   });

    // Listen for disconnect event
    notyfSocket.on('disconnect', () => {
      initialSocketId = null;
      sessionStorage.removeItem("notyfSocketId");
      console.log('Socket disconnected with disconnect event');
      setIsConnected(false);
    });

    setSocket(notyfSocket);

    // Disconnect socket on unmount
    return () => {
      notyfSocket.disconnect();
    };
  }, []);
    
  return (
    <div className='py-1 border-bottom header'>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link className='h5 text-dark text-decoration-none' to='/'>
          {/* E24<strong className='text-primary'>Games</strong> */}
          <img src={ubehero} className='img-fluid' alt="ubehero" />
        </Link>
        {loggedInUser.isSignedIn ? (
          <>
            <div className='d-flex align-items-center'>
              <Link className='h5 text-dark text-decoration-none mb-0' to={`/profile/${loggedInUser.id}`}>
                <strong className='text-white'>{loggedInUser.name}</strong>
              </Link>
              <button
                onClick={() => handlelogOut(history)}
                className='btn btn-sm ms-2 btn-outline-light text-white'
              >
                Logout
              </button>

              {
                socket ? <Notification 
                            socket={socket} 
                            isConnected={isConnected}
                            loggedInUser={loggedInUser}
                          />  : null
              }
              

              <div className="dropdown">
                <Link className="me-3 dropdown-toggle hidden-arrow text-white mx-4 font-xl" to={`/wallet/${loggedInUser.id}`}>
                    <i className="fas fa-wallet"></i>
                    <span className="badge rounded-pill badge-notification bg-secondary">94.85$</span>
                </Link>
              </div>
              {
                loggedInUser.permissions.includes("master") ? 
                <Link className='h6 text-white text-decoration-none mb-0 ms-5' to={`/master/${loggedInUser.id}`}>
                  <strong className='text-white'>Switch to Master</strong>
                </Link> : null
              }
              
            </div>
          </>
        ) : 
        <div className="d-flex align-items-center">
          <Link className='h5 text-white text-decoration-none me-4' to='/login'>
            <strong className='text-white'>Login</strong>
          </Link>
        </div>
        }
          <div className="d-flex">
            <DropdownButton id="dropdown-basic-button" title="Region" variant="secondary">
              <Dropdown.Item onClick={() => dispatch(changeRegion('uk'))}>UK</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(changeRegion('bd'))}>BD</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(changeRegion('ksa'))}>KSA</Dropdown.Item>
            </DropdownButton>
          </div>
      </div>
    </div>
  );
};

export default Header;
