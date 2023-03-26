import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from "react-redux";
import useNotyf from '../../hooks/useNotyf';

const PageLayout = ({ children }) => {
  const user = useSelector((state) => state.profile.data)
  const jwt = localStorage.getItem("jwt");
  const { socketN, isConnected } = useNotyf(user, jwt);

  return (
    <div>
      <Header 
        socketN={socketN} 
        isConnected={isConnected}
        userId={user?._id}
      />

      <div className="container my-4">
        <div className="row">
          <Sidebar />
          <div className="col-md-9 my-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
