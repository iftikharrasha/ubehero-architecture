import headset from '../../images/headset.svg';

export const ExploreCard = ({ index, active, setActive, setAmount, games }) => {
    const handleClick = () => {
        if (setActive && setAmount && games) {
          setActive(games.id);
          setAmount(5000);
        }
    };

    return (
        <div className={active === games?.id ? "hero__card heroActive" : "hero__card"} onClick={handleClick}>
            <img
                src={games?.imgUrl}
                className="hero__card__thumb"
                alt="explore"
            />
            {active !== games?.id ? (
                <h2>{games?.title}</h2>
            ) : (
                <div className="hero__card__expand">
                    <div className="hero__card__expand__icon">
                        <img
                            src={headset}
                            alt="headset"
                        />
                    </div>
                    <h2>{games?.title}</h2>
                    <p>
                        Underdog allow gamers all over the world, with all skills to compete on their
                        favourite game and make money.
                    </p>
                </div>
            )}
        </div>
    );
};
