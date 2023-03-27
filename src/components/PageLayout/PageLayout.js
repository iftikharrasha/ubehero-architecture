import React from 'react';
import Sidebar from './Sidebar';

const PageLayout = ({ children }) => {

  return (
    <div>
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
