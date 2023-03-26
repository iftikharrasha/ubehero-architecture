import React from 'react';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from "react-redux";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { changeRegion } from "../../redux/slices/staticSlice";
import { useHistory } from "react-router-dom";
import ubehero from "../../images/ubehero-dark.svg";
import Notification from "../Common/Notification/Notification";

// let initialSocketId = null;

const Header = ({socketN, isConnected, userId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedInUser, handlelogOut } = useAuth();
    
  return (
    <div className='py-1 border-bottom header'>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link className='h5 text-dark text-decoration-none' to='/'>
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
                socketN ? <Notification 
                            socketN={socketN} 
                            isConnected={isConnected}
                            userId={userId}
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
