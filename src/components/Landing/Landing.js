import React from 'react';

import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Landing = ({landing}) => {

    return (
        <div>
            <Title>{landing.hero.h1}</Title>
            <Paragraph>{landing.hero.p}</Paragraph>
        </div>
    );
};

export default Landing;