import React from 'react';
import InternalControlls from './InternalControlls';

const InternalLayout = ({ children }) => {
  return (
        <main>
            <InternalControlls/>
            {children}
        </main>
  )
}

export default InternalLayout
