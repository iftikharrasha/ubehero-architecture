import React from 'react';
import { Switch } from 'react-router-dom';
import InternalRoute from '../Privates/InternalRoute';
import InternalUpdateTournamentDetails from '../../pages/Internal/InternalUpdateTournamentDetails';
import InternalCreateTournament from '../../pages/Internal/InternalCreateTournament';
import InternalTournaments from '../../pages/Internal/InternalTournaments';
import InternalDashboard from '../../pages/Internal/InternalDashboard';

const InternalRouter = () => {
  return (
    <Switch>
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
  );
};
  
export default InternalRouter;
