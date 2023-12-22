import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Preloader from "../../../components/PageLayout/Preloader";
import { fetchTournaments } from "../../../redux/slices/tournamentSlice";

const MasterParties = () => {
    const dispatch = useDispatch();
    const versionParty = useSelector(state => state.parties.version);
    const id = useSelector(state => state.parties.data ? state.parties.data._id : null);
    const uId = useSelector(state => state.profile.data._id);

    useEffect(() => {
        dispatch(fetchTournaments({id, versionParty}));
    }, [])

    const allParties = useSelector((state) => state.parties.data);
    const masterParties = allParties.filter(item => item.title !== 'Underdogg' && item.owner._id === uId);

    return (
        <div className="container pt-4">
            <section className="mb-4">
            <div className="card">
                <div className="card-header text-center py-3">
                    <h5 className="mb-0 text-center">
                        <strong>Parties Created</strong>
                    </h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Party Name</th>
                            <th scope="col">Privacy</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Fee</th>
                            <th scope="col">Joined</th>
                            <th scope="col">Invited</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                masterParties ? 
                                    masterParties?.length === 0 ? <p className="mt-3">No party found!</p> :
                                        masterParties.map((party, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>
                                                    <img className='img-fluid' src={party.photo} alt='tournamentThumbnail' width="50px" height="50px"/>
                                                    <span className='ms-3'>{party.title}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-tag me-1 text-secondary"></i><span>{party.privacy}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-trophy me-1"></i><span>{party.owner?.userName}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-clock me-1 text-secondary"></i><span>Today</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-receipt me-1 text-secondary"></i><span>0</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-users me-1 text-secondary"></i><span>0</span>
                                                </td>
                                                <td>
                                                    <span className="text-danger">
                                                    <i className="fas fa-chart-line me-1"></i><span>0</span>
                                                    </span>
                                                </td>
                                                <td>
                                                {
                                                    party.status === 'active' ? 
                                                    <span className="badge badge-success rounded-pill d-inline">
                                                        {party.status}
                                                    </span> 
                                                    : party.status === 'blocked' ? 
                                                    <span className="badge badge-warning rounded-pill d-inline">
                                                        {party.status}
                                                    </span> 
                                                    : party.status === 'paused' ? 
                                                    <span className="badge badge-warning rounded-pill d-inline">
                                                        {party.status}
                                                    </span> 
                                                    : '-'
                                                }
                                                </td>
                                                <td>
                                                    {
                                                        // tournament.status === 'active' ?
                                                        //     <Link to={`/tournament/details/${tournament._id}`}>
                                                        //         <span className="text-success">
                                                        //             <i className="fas fa-hand-point-right me-1"></i>Preview
                                                        //         </span>
                                                        //     </Link> :
                                                        party.status === 'paused' || party.status === 'blocked' ?
                                                            <span className="text-primary">
                                                                N/A
                                                            </span> :
                                                            <Link to={`/master/${id}/parties/${party._id}`}>
                                                                <span className="text-warning">
                                                                    <i className="fas fa-pen-to-square me-1"></i>Edit
                                                                </span>
                                                            </Link>
                                                    }
                                                </td>
                                            </tr>
                                        )) 
                                : <Preloader />
                            }

                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </section>
        </div>
    );
};

export default MasterParties;