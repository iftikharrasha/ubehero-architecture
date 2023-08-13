import React from 'react';

const CurrentMatch = ({currentMatch}) => {
    return (
        <div className="matchDetails">
            <div className="match-details-info">
                <h2>{currentMatch?.name}</h2>
            </div>

            <div className="page-banner-inner">
                <div className="match-details-header">
                    <img className="left" src={`${currentMatch?.participants[0].picture}`} alt="Purple Death Cadets"/>
                    <h3 className="left-team">{`${currentMatch?.participants[0].name}`}</h3>
                    <div className="vs">
                        <h2>vs</h2>
                    </div>
                    <h3 className="right-team">{`${currentMatch?.participants[1].name}`}</h3>
                    <img className="right" src={`${currentMatch?.participants[1].picture}`} alt="Resting Bitch Faces"/>
                </div>
            </div>
        </div>
    );
};

export default CurrentMatch;