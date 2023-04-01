import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';
import useInbox from '../../../hooks/useInbox';
import SendInbox from './SendInbox';
import TextPanel from './TextPanel';

const InboxPopUp = () => {
    const { showInbox, setShowInbox, popUser, setPopUser } = useContext(InboxContext);
    const [uniqueRoomId, setUniqueRoomId] = useState(null);
    const [messagesRecieved, setMessagesReceived] = useState([]);

    const user = useSelector((state) => state.profile.data)

    //socket implementation
    const { socketInbox, isInboxConnected } = useInbox(); 

    useEffect(() => {
        if (socketInbox) {
            setMessagesReceived([]);
            const uniqueRoom = generateRoomId(user._id, popUser.id);
            setUniqueRoomId(uniqueRoom);
    
            const userId = user._id;
            const roomId = uniqueRoom;
        
            const data = {
                userId: userId,
                roomId: roomId,
            }
        
            socketInbox.emit("join_inbox", data);
        }
    }, [socketInbox, popUser]);

    const generateRoomId = (userId1, userId2) => {
        return userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;
    }
    const handleInboxPop = () => {
        setMessagesReceived([]);
        setShowInbox(false);
        setPopUser({});

        socketInbox.disconnect();
    };

    return (
        <section className='inbox' style={{backgroundColor: "#eee"}}>
            <div className="inbox-wapper">

                <div className="row d-flex justify-content-center">
                <div className="col-md-12">

                    <a className="btn btn-dark btn-lg btn-block expanded" data-mdb-toggle="collapse" href="#collapseExample"
                    role="button" aria-expanded={showInbox} aria-controls="collapseExample">
                    <div className="d-flex justify-content-between align-items-center text-white">
                        <span><img src={popUser.photo} alt="popUser" className='rounded me-2' style={{width: "25px", height: "100%"}}/> 
                                {popUser.userName} 
                                {/* <i className="fa fa-circle online font-lg"></i> */}
                        </span>
                        <div>
                            <i className="fas fa-close" onClick={handleInboxPop}></i>
                        </div>
                    </div>
                    {/* <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill badge-danger">
                        9+
                    </span> */}
                    </a>

                    <div className={`${showInbox ? "collapse show" : "collapse"}`} id="collapseExample">
                        <div className="card" id="chat4">
                            {
                                !socketInbox ? null : 
                               <>
                                    <TextPanel
                                        socketInbox={socketInbox}
                                        user={user}
                                        popUser={popUser}
                                        messagesRecieved={messagesRecieved}
                                        setMessagesReceived={setMessagesReceived}
                                    />
                                    <SendInbox 
                                        socketInbox={socketInbox}
                                        isInboxConnected={isInboxConnected}
                                        roomId={uniqueRoomId}
                                        room={popUser.id}
                                        receiverId={popUser.id}
                                        user={user}
                                    />
                                </>
                            }
                        </div>
                    </div>

                </div>
                </div>

            </div>
        </section>
    );
};

export default InboxPopUp;