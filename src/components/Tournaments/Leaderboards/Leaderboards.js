import React, { useState } from "react";
import PopupModal from "../../Common/PopupModal/PopupModal";

const Leaderboards = ({leaderboards}) => {
  const [popupUser, setPopupUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
      setPopupUser(null)
      setShow(false)
  };
  const handleShow = (user) => {
      setPopupUser(user)
      setShow(true)
  };
  
  return (
    <div className='card d-flex mb-3 p-3' 
      style={{position: 'relative'}}
    >
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Level</th>
            <th>Played</th>
            <th>Wins</th>
            <th>XP</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>

        {
            leaderboards.length === 0 ? 
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="my-3">
                    <p className="fw-bold mb-1">No entry so far!</p>
                  </div>
                </div>
              </td>
            </tr>
            :
              leaderboards.map((item, index) => (
                <tr key={index} onClick={(e) => handleShow(item)} className="cursor-pointer">
                  <td>{index+1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                          src={item.photo}
                          alt=""
                          style={{width: "45px", height: "45px"}}
                          className="rounded-circle"
                          />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.userName}</p>
                        <p className="text-muted mb-0">Country: {item.country}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{item.stats?.levelTitle}</p>
                    <p className="text-muted mb-0">Level {item.stats?.level}</p>
                  </td>
                  <td>{item.stats?.totalGamePlayed}</td>
                  <td>{item.stats?.totalWins}</td>
                  <td>{item.stats?.totalXp}</td>
                  <td>
                    <span className="badge badge-success rounded-pill d-inline">Verified</span>
                  </td>
                </tr>
              ))
        }
          
        </tbody>
      </table>

      {/* popup for user profile */}
      <PopupModal show={show} handleClose={handleClose} popupUser={popupUser}/>
    </div>
  );
};

export default Leaderboards;
