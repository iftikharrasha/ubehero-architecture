import React from 'react';
import MasterLayout from '../../components/PageLayout/MasterLayout';
import MasterTournamentsTable from '../../components/Master/MasterTournamentsTable';

const MasterTournaments = () => {
    return (
        <MasterLayout>
            <MasterTournamentsTable/>
        </MasterLayout>
    );
};

export default MasterTournaments;