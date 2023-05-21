import React from 'react';
import { Switch } from 'react-router-dom';
import MasterUpdateTournamentDetails from '../../pages/Master/MasterUpdateTournamentDetails';
import MasterCreateTournament from '../../pages/Master/MasterCreateTournament';
import MasterTournaments from '../../pages/Master/MasterTournaments';
import MasterDashboard from '../../pages/Master/MasterDashboard';
import MasterRoute from '../Privates/MasterRoute';

const MasterRouter = () => {
  return (
    <Switch>
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
    </Switch>
  );
};

export default MasterRouter;
