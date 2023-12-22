import React from 'react';
import { Switch } from 'react-router-dom';
import MasterUpdateTournamentDetails from '../../pages/Master/Tournament/MasterUpdateTournamentDetails';
import MasterCreateTournament from '../../pages/Master/Tournament/MasterCreateTournament';
import MasterTournaments from '../../pages/Master/Tournament/MasterTournaments';
import MasterDashboard from '../../pages/Master/Tournament/MasterDashboard';
import MasterRoute from '../Privates/MasterRoute';
import MasterCreateParty from '../../pages/Master/Party/MasterCreateParty';
import MasterParties from '../../pages/Master/Party/MasterParties';

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
      <MasterRoute path="/master/:id/parties">
        <MasterParties/>
      </MasterRoute>
      <MasterRoute path="/master/:id/create-party">
        <MasterCreateParty/>
      </MasterRoute>
      <MasterRoute path="/master/:id">
        <MasterDashboard/>
      </MasterRoute>
    </Switch>
  );
};

export default MasterRouter;
