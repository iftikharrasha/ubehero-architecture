import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../Privates/PrivateRoute';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import TournamentDetails from '../../pages/TournamentDetails';
import WishList from '../../pages/WishList';
import Profile from '../../pages/Profile';
import Wallet from '../../pages/Wallet';

const GamerRouter = () => {
  return (
    <Switch>
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
    </Switch>
  );
};

export { GamerRouter };
