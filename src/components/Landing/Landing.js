import React from 'react';

const Landing = ({landing}) => {

    return (
        <div>
            <h1 className='mb-2'>{landing.hero.h1}</h1>
            <p className='mb-4'>{landing.hero.p}</p>
        </div>
    );
};

export default Landing;