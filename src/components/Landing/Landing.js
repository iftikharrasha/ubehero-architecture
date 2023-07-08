import { useEffect, useState } from 'react';
import { exploreGames } from '../../lib/constants';
import { ExploreCard } from './ExploreCard';

import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

const Landing = ({ landing }) => {
    const values = ['pubg', 'freefire', 'warzone', 'csgo', 'battlefield'];
    const [active, setActive] = useState(values[1]);
    const [amount, setAmount] = useState(5000);
    let i = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            i = (i + 1) % values.length;
            setActive(values[i]);
            setAmount(5000);
        }, amount);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            <div className="hero__wrapper">
                <div className="hero__wrapper__content">
                    <div className="hero__wrapper__content__left">
                        <Title>{landing.hero.h1}</Title>
                        <Paragraph className='p'>{landing.hero.p}</Paragraph>
                        <Button>
                            <Link to="/login"><span>JOIN NOW</span></Link>
                        </Button>
                    </div>
                    <div className="hero__wrapper__content__right">
                        {exploreGames.map((games, index) => (
                            <ExploreCard
                                key={games.id}
                                index={index}
                                active={active}
                                setActive={setActive}
                                setAmount={setAmount}
                                games={games}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Landing;