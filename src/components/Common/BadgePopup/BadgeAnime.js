import React from 'react';
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../../lib/Lottie/lf30_brfwfvq7.json";

const BadgeAnime = () => {
    const options = {
      animationData: groovyWalkAnimation,
      loop: true,
      autoplay: true,
    };

    const { View } = useLottie(options);

    return (
        <div className='badgeAnime'>{View}</div>
    );
};

export default BadgeAnime;