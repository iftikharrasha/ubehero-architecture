import React from 'react';
import CurrentMatch from '../../../pages/Master/StageDeclare/CurrentMatch';

const Matches = ({matches}) => {
    return (
        < div className='matches'>
        {
            matches.map((currentMatch, index) => (
                <>
                    {
                        matches.length === 4 ? null :
                        <CurrentMatch currentMatch={currentMatch}/>
                    }
                </>
            ))
        }
        </div>
    );
};

export default Matches;