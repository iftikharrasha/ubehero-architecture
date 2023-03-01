import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import TournamentDetails from './pages/TournamentDetails'
import WishList from './pages/WishList'
import AuthProvider from './Contexts/AuthProvider/AuthProvider'
import Login from './pages/Login'
import Profile from './pages/Profile.js'
import Wallet from './pages/Wallet'
import PrivateRoute from './pages/PrivateRoute';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    const newSocket = io.connect(`${process.env.REACT_APP_API_LINK}`, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    // Listen for pong event
    newSocket.on("pong", (receivedDate, pingReceivedAt) => {
      const timeStamp = new Date().getTime();
      const latency = timeStamp - receivedDate;
      console.log(`Received pong of ${newSocket.id} at ${pingReceivedAt} with latency ${latency}ms`);
    });

    // Disconnect socket on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (socket) {
      interval = setInterval(() => {
        socket.emit("ping");
      }, 15000);
    }
  
    return () => clearInterval(interval);
  }, [socket]);

  return (
    <AuthProvider>
      <Router>
        <Route render={({location}) => (

            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route exact path="/tournament/details/:id" render={() => <TournamentDetails socket={socket}/>}  />
              <Route path="/tournament/details/:id/chatroom" render={() => <TournamentDetails tabKey={'chatroom'} socket={socket}/>} />
              <Route path="/tournament/details/:id/prizes" render={() => <TournamentDetails tabKey={'prizes'}  socket={socket}/>}/>
              <Route path="/tournament/details/:id/checkout" render={() => <TournamentDetails tabKey={'checkout'} socket={socket}/>} />
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
