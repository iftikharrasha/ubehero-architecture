import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProfileDetails = ({profile}) => {
  const { _id, userName, joiningDate, photo, version, stats } = profile;
  const now = ((stats.currentXP / (stats.currentXP  + stats.nextLevelRequiredXP)) * 100)
  
  return (
    <div className='card d-flex mb-3 p-3' 
      style={{position: 'relative'}}
    >
      <div className='row'>
        <div className='col-md-3'>
          <img className="img-fluid" src={photo} alt='profile-pic' />
        </div>
        <div className='col-md-9'>
          <div className='card-body'>
            <h5 className='card-title'>{userName}</h5>
            <h6>Joining Date: {joiningDate}</h6>
            <p className='card-text'>version: {version}</p>
            {/* <Link to={`/tournament/details/${_id}`}><button>Join Now</button></Link> */}
          </div>
          <div className='card-body'>
            <h5 className='card-title'>Level {stats?.currentLevel}: {stats?.levelTitle}</h5>
            <ProgressBar striped animated variant="success" now={now} label={`${now}%`} />
            <div className="d-flex justify-content-between mt-2">
              <h6>Current XP: {stats?.currentXP}</h6>
              <p className='card-text'>XP required to reach level 2: {stats?.nextLevelRequiredXP}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
