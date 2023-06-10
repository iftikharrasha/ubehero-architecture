import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../Privates/PrivateRoute';
import Home from '../../pages/Common/Home';
import Login from '../../pages/Common/Login';
import Signup from '../../pages/Common/Signup';
import TDetails from '../../pages/Common/TDetails';
import Profile from '../../pages/Common/Profile';
import Wallet from '../../pages/Common/Wallet';
import WishList from '../../pages/Common/WishList';

const GamerRouter = () => {
  return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/tournament/details/:id" render={() => <TDetails/>}  />
        <Route path="/tournament/details/:id/chatroom" render={() => <TDetails tabKey={'chatroom'}/>} />
        <Route path="/tournament/details/:id/prizes" render={() => <TDetails tabKey={'prizes'} />}/>
        <Route path="/tournament/details/:id/checkout" render={() => <TDetails tabKey={'checkout'}/>} />
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
