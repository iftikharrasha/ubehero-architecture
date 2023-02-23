import React from 'react';
import useAuth from '../../../hooks/useAuth';

const ChatRoom = ({tournamentDetails, leaderboardDetails, chatroomDetails}) => {
    const { _id, tournamentName, tournamentThumbnail } = tournamentDetails;
    const { leaderboard } = leaderboardDetails;
    const { messages, version } = chatroomDetails;
    const { loggedInUser } = useAuth();

    return (
       <div className='chatroom'>
        <div className="container">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <div className="chat">
                            <div className="chat-header clearfix">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <img src={tournamentThumbnail} alt="avatar"/>
                                        <div className="chat-about">
                                            <h6 className="m-b-0">{tournamentName}</h6>
                                            <small>version: {version}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-history">
                                <ul className="m-b-0">
                                    {
                                        messages.map((item, index) => (
                                            <li className="clearfix" key={index}>
                                                {/* <div className="message-data text-right">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                                                </div> */}
                                                <div className={item.senderName.toLowerCase() === loggedInUser.name ? "message other-message float-right" : item.routeId === 1 ? "message other-message float-right masterAnnouncement" : "message my-message"}>
                                                    <p>{item.message}</p>
                                                    <span className="message-data-time">{item.timeStamp}</span>
                                                </div>                                    
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="chat-message clearfix">
                                <div className="input-group mb-0">
                                    <input type="text" className="form-control" placeholder="Enter text here..."/>   
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-send"></i></span>
                                    </div>                                 
                                </div>
                            </div>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ChatRoom;