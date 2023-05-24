import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../Privates/PrivateRoute';
import Home from '../../pages/Common/Home';
import Login from '../../pages/Common/Login';
import Signup from '../../pages/Common/Signup';
import TournamentDetails from '../../pages/Common/TournamentDetails';
import Profile from '../../pages/Common/Profile';
import Wallet from '../../pages/Common/Wallet';
import WishList from '../../pages/Common/WishList';

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
