import React from 'react';

import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Landing = ({landing}) => {

    return (
        <div className='mb-5'>
            <Title>{landing.hero.h1}</Title>
            <Paragraph style={{fontSize: '20px'}}>{landing.hero.p}</Paragraph>
        </div>
    );
};

export default Landing;