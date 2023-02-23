import React from "react";

const WalletDetails = (props) => {
  const { _id, userName, balance, photo, version } = props.user;
  
  return (
    <div className='card d-flex mb-3 p-3' 
      style={{position: 'relative'}}
    >
      <div className='row'>
        <div className='col-md-1'>
          <img className="img-fluid mt-2" src="https://i.ibb.co/vjpGbfj/balance-Coin.webp" alt='profile-pic' />
        </div>
        <div className='col-md-11'>
          <div className='card-body'>
            <h6>Balance: {balance}</h6>
            <p className='card-text'>version: {version}</p>
            {/* <Link to={`/tournament/details/${_id}`}><button>Join Now</button></Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
