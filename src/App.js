import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import Header from './components/PageLayout/Header';
import { useSelector } from 'react-redux';
import useNotyf from './hooks/useNotyf';
import InboxPopUp from './components/Common/InboxPopUp/InboxPopUp';
import InboxContext from './Contexts/InboxContext/InboxContext';
import MasterRouter from './routes/Router/MasterRouter';
import { GamerRouter } from './routes/Router/GamerRouter';
import InternalRouter from './routes/Router/InternalRouter';
import InternalControlls from './components/PageLayout/InternalControlls';
import MasterControlls from './components/PageLayout/MasterControlls';
import Navbar from './components/Common/Navbar/Navbar';
import { ConfigProvider, Layout, theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const isDarkMode = useSelector(state => state.mySiteSettings.darkMode);
  const [showInbox, setShowInbox] = useState(false);
  const [popUser, setPopUser] = useState({});

  const handleInboxPop = () => {
    setShowInbox(!showInbox);
  };

  const user = useSelector((state) => state.profile.data)
  const jwt = localStorage.getItem("jwt");
  const { socketN, isConnected } = useNotyf(user, jwt);
  
  return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#9551fb',
            colorPrimaryActive: '#1677ff',
            colorPrimaryHover: '#F030C0',
            // colorSuccess: '#F030C0',
          },
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}>
        <Layout style={{minHeight: "100vh"}}>
          <AuthProvider>
            <InboxContext.Provider value={{ showInbox, setShowInbox, popUser, setPopUser }}>
              <Router>
                {/* <Header 
                  socketN={socketN} 
                  isConnected={isConnected}
                  userId={user?._id}
                /> */}

                <Navbar
                  socketN={socketN} 
                  isConnected={isConnected}
                  userId={user?._id}
                />

                <Route path="/internal">
                  <InternalControlls />
                </Route>

                <Route path="/master">
                  <MasterControlls />
                </Route>
        
                <Switch>
                  <Route path="/internal">
                    <InternalRouter />
                  </Route>
                  <Route path="/master">
                    <MasterRouter />
                  </Route>
                  <Route path="/">
                    <GamerRouter />
                  </Route>
                </Switch>

                {showInbox && <InboxPopUp handleInboxPop={handleInboxPop}/>}
              </Router>
            </InboxContext.Provider>
          </AuthProvider>
        </Layout>
      </ConfigProvider>
  )
}

export default App
