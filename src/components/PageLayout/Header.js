import React from 'react';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { changeRegion } from "../../redux/slices/staticSlice";
import { useHistory } from "react-router-dom";
import ubehero from "../../images/ubehero-dark.svg";
import Notification from "../Common/Notification/Notification";
import WalletPopUp from '../Common/WalletPopUp/WalletPopUp';
import InboxThread from '../Common/InboxThread/InboxThread';
import useProfile from '../../hooks/useProfile';
import WishList from '../Profile/WishList';

const Header = ({socketN, isConnected, userId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedInUser, handlelogOut } = useAuth();
  const { handleSwitchProfile, actingAs } = useProfile();
  const isSignedIn = useSelector(state => state.profile.signed_in);
  const role = useSelector(state => state.profile.role);
    
  return (
    <div className={`py-1 border-bottom header ${actingAs}`}>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link className='h5 text-dark text-decoration-none' to='/'>
          <img src={ubehero} className='img-fluid' alt="ubehero" />
        </Link>
        {
          isSignedIn ? (
          <>
            <div className='d-flex align-items-center'>
              {
                socketN ? <Notification 
                            socketN={socketN} 
                            isConnected={isConnected}
                            userId={userId}
                          />  : null
              }

              {
                socketN ? <InboxThread 
                            socketN={socketN} 
                          />  : null
              }

              <WalletPopUp userId={userId}/>

              <WishList/>

              <Link className='h5 text-dark text-decoration-none mb-0 ms-5' to={`/profile/${loggedInUser.id}`}>
                <strong className='text-white'>{loggedInUser.name}</strong>
              </Link>
              
              <button
                onClick={() => handlelogOut(history)}
                className='btn btn-sm ms-2 btn-outline-light text-white'
              >
                Logout
              </button>
              
              {
                role === "admin" ? 
                <div className="d-flex ms-5">
                  <DropdownButton id="dropdown-basic-button" title="Switch To" variant="dark">
                    <Dropdown.Item onClick={(e) => handleSwitchProfile(e, "user")}>
                      Gamer Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleSwitchProfile(e, "master")}>
                      Master Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleSwitchProfile(e, "admin")}>
                      Admin Profile
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                :
                role === "master" ? 
                <div className="d-flex ms-5">
                  <DropdownButton id="dropdown-basic-button" title="Switch To" variant="dark">
                    <Dropdown.Item onClick={(e) => handleSwitchProfile(e, "user")}>
                      Gamer Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleSwitchProfile(e, "master")}>
                      Master Profile
                    </Dropdown.Item>
                  </DropdownButton>
                </div> 
                :  null
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
