import React from 'react';
import MasterControlls from './MasterControlls';

const MasterLayout = ({ children }) => {
  return (
        <main>
            <MasterControlls/>
            {children}
        </main>
  )
}

export default MasterLayout
