import React from 'react';
import spinner from "../../images/spinner.gif";
const Preloader = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight:'10rem'}}>
            <img src={spinner} alt="" />
        </div>
    );
};

export default Preloader;