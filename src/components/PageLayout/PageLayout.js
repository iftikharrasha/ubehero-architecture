import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const PageLayout = ({ children }) => {
  const verified = useSelector(state => state.profile.data?.emailVerified);
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="container my-4">
      {
        !verified ? null :
          !showAlert ? null :
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <strong>Warning!</strong> Kindly verify your account to get the access to the ubehero contents
            <Link to="/profile/verification" className='text-white'><button type="button" className="btn btn-secondary ms-3">Verify Now</button></Link>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
          </div>
      }
      
      <div className="row">
        {/* <Sidebar /> */}
        <div className="col-md-12 my-2">{children}</div>
      </div>
    </div>
  )
}

export default PageLayout
