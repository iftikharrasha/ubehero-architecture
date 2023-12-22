import React from 'react';

const CurrentMatch = ({currentMatch}) => {
    return (
        <div className="matchDetails">
            <div className="match-details-info">
                <h2>{currentMatch?.name}</h2>
            </div>

            <div className="page-banner-inner">
                <div className="match-details-header">
                    <img className="left" src={currentMatch?.participants[0]?.picture ? currentMatch?.participants[0]?.picture : 'https://img.freepik.com/free-icon/mime_318-856855.jpg?q=10&h=200'} alt="participant"/>
                    <h3 className="left-team">{currentMatch?.participants[0]?.name ? currentMatch?.participants[0]?.name : 'TBD'}</h3>
                    <div className="vs">
                        <h2>vs</h2>
                    </div>
                    <h3 className="right-team">{currentMatch?.participants[1]?.name ? currentMatch?.participants[1]?.name : 'TBD'}</h3>
                    <img className="right" src={currentMatch?.participants[1]?.picture ? currentMatch?.participants[0]?.picture : 'https://img.freepik.com/free-icon/mime_318-856855.jpg?q=10&h=200'} alt="participant"/>
                </div>
            </div>
        </div>
    );
};

export default CurrentMatch;