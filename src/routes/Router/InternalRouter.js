import React from 'react';
import { Switch } from 'react-router-dom';
import InternalRoute from '../Privates/InternalRoute';
import InternalUpdateTournamentDetails from '../../pages/Internal/InternalUpdateTournamentDetails';
import InternalCreateTournament from '../../pages/Internal/InternalCreateTournament';
import InternalTournaments from '../../pages/Internal/InternalTournaments';
import InternalDashboard from '../../pages/Internal/InternalDashboard';
import InternalSupportTable from '../../pages/Internal/InternalSupportTable';
import InternalUsersTable from '../../pages/Internal/InternalUsersTable';

const InternalRouter = () => {
  return (
    <Switch>
        <InternalRoute path="/internal/:id/support">
            <InternalSupportTable/>
        </InternalRoute>
        <InternalRoute path="/internal/:id/users">
            <InternalUsersTable/>
        </InternalRoute>
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
