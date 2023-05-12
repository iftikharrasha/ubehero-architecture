import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import TournamentDetails from './pages/TournamentDetails'
import WishList from './pages/WishList'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import Login from './pages/Login'
import Profile from './pages/Profile.js'
import Wallet from './pages/Wallet';
import Header from './components/PageLayout/Header';
import { useSelector } from 'react-redux';
import useNotyf from './hooks/useNotyf';
import InboxPopUp from './components/Common/InboxPopUp/InboxPopUp';
import InboxContext from './Contexts/InboxContext/InboxContext';
import Signup from './pages/Signup';
import PrivateRoute from './pages/PrivateRoute';
import MasterRoute from './pages/MasterRoute';
import InternalRoute from './pages/InternalRoute';
import MasterDashboard from './pages/Master/MasterDashboard'
import MasterTournaments from './pages/Master/MasterTournaments';
import MasterUpdateTournamentDetails from './pages/Master/MasterUpdateTournamentDetails';
import MasterCreateTournament from './pages/Master/MasterCreateTournament';
import InternalDashboard from './pages/Internal/InternalDashboard';
import InternalTournaments from './pages/Internal/InternalTournaments';
import InternalCreateTournament from './pages/Internal/InternalCreateTournament';
import InternalUpdateTournamentDetails from './pages/Internal/InternalUpdateTournamentDetails';

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
          <Route render={({location}) => (

              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/tournament/details/:id" render={() => <TournamentDetails/>}  />
                <Route path="/tournament/details/:id/chatroom" render={() => <TournamentDetails tabKey={'chatroom'}/>} />
                <Route path="/tournament/details/:id/prizes" render={() => <TournamentDetails tabKey={'prizes'} />}/>
                <Route path="/tournament/details/:id/checkout" render={() => <TournamentDetails tabKey={'checkout'}/>} />
                <Route path="/tournaments/wishList" component={WishList} />
                <PrivateRoute path="/profile/:id">
                  <Profile/>
                </PrivateRoute>
                <PrivateRoute path="/wallet/:id">
                  <Wallet/>
                </PrivateRoute>
                <MasterRoute path="/master/:id/tournaments/:tId">
                  <MasterUpdateTournamentDetails/>
                </MasterRoute>
                <MasterRoute path="/master/:id/create-tournament">
                  <MasterCreateTournament/>
                </MasterRoute>
                <MasterRoute path="/master/:id/tournaments">
                  <MasterTournaments/>
                </MasterRoute>
                <MasterRoute path="/master/:id">
                  <MasterDashboard/>
                </MasterRoute>
                <InternalRoute path="/internal/:id/tournaments/:tId">
                  <InternalUpdateTournamentDetails/>
                </InternalRoute>
                <InternalRoute path="/internal/:id/create-tournament">
                  <InternalCreateTournament/>
                </InternalRoute>
                <InternalRoute path="/internal/:id/tournaments">
                  <InternalTournaments/>
                </InternalRoute>
                <InternalRoute path="/internal/:id">
                  <InternalDashboard/>
                </InternalRoute>
              </Switch>

          )} />

          {
            showInbox && <InboxPopUp handleInboxPop={handleInboxPop}/>
          }
            
        </Router>
      </InboxContext.Provider>
    </AuthProvider>
  )
}

export default App
