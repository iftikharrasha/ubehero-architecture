import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import InboxContext from '../../../Contexts/InboxContext/InboxContext';

const InboxPopUp = () => {
    const { showInbox, setShowInbox } = useContext(InboxContext);
    const messagesColumnRef = useRef(null);

    const handleInboxPop = () => {
        setShowInbox(!showInbox);
    };
    
    useEffect(() => {
        if (messagesColumnRef && messagesColumnRef.current) {
            const { scrollHeight, clientHeight } = messagesColumnRef.current;
            messagesColumnRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messagesColumnRef]);

    return (
        <section className='inbox' style={{backgroundColor: "#eee"}}>
            <div className="inbox-wapper" ref={messagesColumnRef}>

                <div className="row d-flex justify-content-center">
                <div className="col-md-12">

                    <a className="btn btn-dark btn-lg btn-block expanded" data-mdb-toggle="collapse" href="#collapseExample"
                    role="button" aria-expanded={showInbox} aria-controls="collapseExample">
                    <div className="d-flex justify-content-between align-items-center text-white">
                        <span>Alexhells</span>
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
                        <div className="card-body" data-mdb-perfect-scrollbar="true"
                        style={{position: "relative", height: "400px"}}>

                        <div className="d-flex flex-row justify-content-start">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                            <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Hi</p>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>How are you
                                ...???</p>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>What are you
                                doing
                                tomorrow? Can we come up a bar?</p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                            </div>
                        </div>

                        <div className="divider d-flex align-items-center mb-4">
                            <p className="text-center mx-3 mb-0" style={{color: "#a2aab7"}}>Today</p>
                        </div>

                        <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                            <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">Hiii, I'm good.</p>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">How are you doing?</p>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">Long time no see! Tomorrow
                                office. will
                                be free on sunday.</p>
                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:06</p>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                        </div>

                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                            <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Okay</p>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>We will go on
                                Sunday?</p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">00:07</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">That's awesome!</p>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">I will meet you Sandon Square
                                sharp at
                                10 AM</p>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">Is that okay?</p>
                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:09</p>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                        </div>

                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                            <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Okay i will meet
                                you on
                                Sandon Square</p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">00:11</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">Do you have pictures of Matley
                                Marriage?</p>
                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:11</p>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                        </div>

                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                            <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Sorry I don't
                                have. i
                                changed my phone.</p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">00:13</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-end">
                            <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-secondary">Okay then see you on sunday!!
                            </p>
                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:15</p>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                            alt="avatar 1" style={{width: "45px", height: "100%"}}/>
                        </div>

                        </div>
                        <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                            alt="avatar 3" style={{width: "45px", height: "100%"}}/>
                        <input type="text" className="form-control form-control-lg ms-2" id="exampleFormControlInput3"
                            placeholder="Type message"/>
                        {/* <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                        <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a> */}
                        <a className="ms-3 link-secondary" href="#!"><i className="fas fa-paper-plane"></i></a>
                        </div>
                    </div>
                    </div>

                </div>
                </div>

            </div>
            </section>
    );
};

export default InboxPopUp;