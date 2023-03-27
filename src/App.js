import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import TournamentDetails from './pages/TournamentDetails'
import WishList from './pages/WishList'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import Login from './pages/Login'
import Profile from './pages/Profile.js'
import Wallet from './pages/Wallet'
import PrivateRoute from './pages/PrivateRoute';
import Header from './components/PageLayout/Header';
import { useSelector } from 'react-redux';
import useNotyf from './hooks/useNotyf';

function App() {
  const user = useSelector((state) => state.profile.data)
  const jwt = localStorage.getItem("jwt");
  const { socketN, isConnected } = useNotyf(user, jwt);
  
  return (
    <AuthProvider>

      <Router>
        <Header 
          socketN={socketN} 
          isConnected={isConnected}
          userId={user?._id}
        />
        <Route render={({location}) => (

            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route exact path="/tournament/details/:id" render={() => <TournamentDetails/>}  />
              <Route path="/tournament/details/:id/chatroom" render={() => <TournamentDetails tabKey={'chatroom'}/>} />
              <Route path="/tournament/details/:id/prizes" render={() => <TournamentDetails tabKey={'prizes'} />}/>
              <Route path="/tournament/details/:id/checkout" render={() => <TournamentDetails tabKey={'checkout'}/>} />
              <Route exact path="/login" component={Login} />
              <Route path="/tournaments/wishList" component={WishList} />
              <PrivateRoute path="/profile/:id">
                <Profile/>
              </PrivateRoute>
              <PrivateRoute path="/wallet/:id">
                <Wallet/>
              </PrivateRoute>
            </Switch>

        )} />
      </Router>
    </AuthProvider>
  )
}

export default App
