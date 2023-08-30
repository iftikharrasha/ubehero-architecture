import React from 'react';
import { CrownOutlined } from '@ant-design/icons';

const Results = ({results}) => {
    return (
        <div className="matchDetails ladderResult">
            <div className="match-details-info">
                <CrownOutlined className="crown"/>
                <img className="winner" src={results[0] ? results[0].photo : "https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-gold-medal-1st-place-award-icon-png-image_6093703.png"} alt="Purple Death Cadets"/>
                <h2>
                    {results[0] ? results[0].userName : null}
                    <br />
                    <span>1st position</span>
                </h2>
            </div>

            <div className="page-banner-inner">
                <div className="match-details-header">
                    <img className="left" src={results[1] ? results[1].photo : "https://ubehero.com/static/media/2nd.2a8e8856.jpg"} alt="2nd"/> {/* https://ubehero.com/static/media/2nd.2a8e8856.jpg */}
                    <h3 className="left-team">
                        {results[1] ? results[1].userName : null}   
                        <br />
                        <span>2nd position</span>
                    </h3>
                    <div className="vs">
                        <img className="left" src="https://ubehero.com/static/media/winner.d0150a62.png" alt="3rd"/>
                    </div>
                    <h3 className="right-team">
                        {results[2] ? results[2].userName : null}   
                        <br />
                        <span>3rd position</span>
                    </h3>
                    <img className="right" src={results[2] ? results[2].photo : "https://ubehero.com/static/media/3rd.26240a12.jpg"} alt="3rd"/> {/* https://ubehero.com/static/media/3rd.26240a12.jpg */}
                </div>
            </div>
        </div>
    );
};

export default Results;