import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchIpInfo } from './redux/slices/profileSlice';
import { Modal } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mySiteSettings.darkMode);
  const [showInbox, setShowInbox] = useState(false);
  const [popUser, setPopUser] = useState({});

  const handleInboxPop = () => {
    setShowInbox(!showInbox);
  };

  const profile = useSelector((state) => state.profile);
  const isVpn = profile.vpn;
  console.log("isVpn", isVpn);

  const jwt = localStorage.getItem("jwt");
  const { socketN, isConnected } = useNotyf(profile.data, jwt);

  useEffect(() => {
    dispatch(fetchIpInfo(profile.version));
  },[dispatch])

  const [vpn, setVpn] = useState(isVpn);

  const handleModalOk = () => {
    window.location.reload();
  };

  const handleModalCancel = () => {
    setVpn(false);
  };

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
                <Navbar
                  socketN={socketN} 
                  isConnected={isConnected}
                  profile={profile}
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

          {
            vpn && 
            <Modal
              title="CHEATER WARNING!"
              open={vpn}
              onOk={handleModalOk} // Add this callback for the "Refresh" button
              onCancel={handleModalCancel}
              width="1000px"
              okText="Refresh"
            >
              <p>Please turn off your vpn, and refresh the page. 
                This is your final warning!</p>
            </Modal>
          }
        </Layout>
      </ConfigProvider>
  )
}

export default App
