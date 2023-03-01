import React from 'react';

const UserList = ({leaderboard}) => {
    return (
        <div id="plist" className="people-list">
            <div className="input-group">
                <div className="input-group-prepend">
                    <i className="fa fa-users"></i> Participants: {leaderboard.length}
                </div>
            </div>
            <ul className="list-unstyled chat-list mt-2 mb-0">
                {
                    leaderboard.map((participant, index) => (
                        <li className="clearfix active mb-1" key={index}>
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                            <div className="about">
                                <div className="name">{participant.userName}</div>
                                <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default UserList;