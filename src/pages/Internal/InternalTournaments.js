import React from 'react';
import InternalTournamentsTable from '../../components/Internal/InternalTournamentsTable';
import InternalLayout from '../../components/PageLayout/InternalLayout';

const InternalTournaments = () => {
    return (
        <InternalLayout>
            <InternalTournamentsTable/>
        </InternalLayout>
    );
};

export default InternalTournaments;