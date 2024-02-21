import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../Privates/PrivateRoute';
import Home from '../../pages/Common/Home';
import Login from '../../pages/Common/Login';
import Live from '../../pages/Common/Live';
import Signup from '../../pages/Common/Signup';
import TDetails from '../../pages/Common/TDetails';
import Profile from '../../pages/Common/Profile';
import Wallet from '../../pages/Common/Wallet';
import Team from '../../pages/Common/Team';
import Parties from '../../pages/Common/Parties';
import Party from '../../pages/Common/Party';
import Teams from '../../pages/Common/Teams';

const GamerRouter = () => {
  return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tournament/joined" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/live" component={Live} />
        <Route exact path="/parties" component={Parties} />
        <Route exact path="/teams" component={Teams} />
        <Route exact path="/tournament/details/:id" render={() => <TDetails/>}  />
        <Route exact path="/party/details/:id" render={() => <Party/>}  />
        <Route path="/tournament/details/:id/bracket" render={() => <TDetails tabKey={'bracket'}/>} />
        <Route path="/tournament/details/:id/matches" render={() => <TDetails tabKey={'matches'}/>} />
        <Route path="/tournament/details/:id/chatroom" render={() => <TDetails tabKey={'chatroom'}/>} />
        <Route path="/tournament/details/:id/prizes" render={() => <TDetails tabKey={'prizes'} />}/>
        <Route path="/tournament/details/:id/result" render={() => <TDetails tabKey={'result'} />}/>
        <Route path="/tournament/details/:id/checkout" render={() => <TDetails tabKey={'checkout'}/>} />
        <PrivateRoute path="/profile/:id">
            <Profile/>
        </PrivateRoute>
        <PrivateRoute path="/team/:id">
            <Team/>
        </PrivateRoute>
        <PrivateRoute path="/wallet/:id">
            <Wallet/>
        </PrivateRoute>
    </Switch>
  );
};

export { GamerRouter };
