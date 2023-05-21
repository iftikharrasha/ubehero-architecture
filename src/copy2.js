import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import Header from './components/PageLayout/Header';
import { useSelector } from 'react-redux';
import useNotyf from './hooks/useNotyf';
import InboxPopUp from './components/Common/InboxPopUp/InboxPopUp';
import InboxContext from './Contexts/InboxContext/InboxContext';
import MasterRouter from './routes/Router/MasterRouter';
import { GamerRouter } from './routes/Router/GamerRouter';
import InternalRouter from './routes/Router/InternalRouter';

function App() {
  const [showInbox, setShowInbox] = useState(false);
  const [popUser, setPopUser] = useState({});

  const handleInboxPop = () => {
    setShowInbox(!showInbox);
  };

  const user = useSelector((state) => state.profile.data)
  const jwt = localStorage.getItem("jwt");
  const { socketN, isConnected } = useNotyf(user, jwt);
  
  return (
    <AuthProvider>
      <InboxContext.Provider value={{ showInbox, setShowInbox, popUser, setPopUser }}>
        <Router>
          <Header 
            socketN={socketN} 
            isConnected={isConnected}
            userId={user?._id}
          />
          
          <GamerRouter />
          <MasterRouter/>
          <InternalRouter/>

          {showInbox && <InboxPopUp handleInboxPop={handleInboxPop}/>}
        </Router>
      </InboxContext.Provider>
    </AuthProvider>
  )
}

export default App
