import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Preloader from '../PageLayout/Preloader';
import { fetchMastersTournaments } from "../../redux/slices/masterTournamentSlice";

const MasterTournamentsTable = () => {
    const dispatch = useDispatch();
    const versionTournaments = useSelector(state => state.masterTournaments.version);
    const id = useSelector(state => state.profile.data ? state.profile.data._id : null);

    useEffect(() => {
        dispatch(fetchMastersTournaments({id, versionTournaments}));
    }, [])

    const masterTournaments = useSelector((state) => state.masterTournaments.data)

    return (
        <div className="container pt-4">
            <section className="mb-4">
            <div className="card">
                <div className="card-header text-center py-3">
                    <h5 className="mb-0 text-center">
                        <strong>Tournaments Created</strong>
                    </h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Tournament Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Registration Start</th>
                            <th scope="col">Joining Fee</th>
                            <th scope="col">Max Participants</th>
                            <th scope="col">Joined</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                masterTournaments ? 
                                    masterTournaments?.length === 0 ? <p className="mt-3">No tournaments found!</p> :
                                        masterTournaments.map((tournament, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>
                                                    <img className='img-fluid' src={tournament.tournamentThumbnail} alt='tournamentThumbnail' width="50px" height="50px"/>
                                                    <span className='ms-3'>{tournament.tournamentName}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-tag me-1 text-secondary"></i><span>{tournament.category}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-clock me-1 text-secondary"></i><span>{moment(tournament.dates?.registrationStart).fromNow()}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-receipt me-1 text-secondary"></i><span>{tournament.settings?.joiningFee}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-users me-1 text-secondary"></i><span>{tournament.settings?.maxParticipitant}</span>
                                                </td>
                                                <td>
                                                    <span className="text-danger">
                                                    <i className="fas fa-chart-line me-1"></i><span>{tournament.settings?.maxParticipitant}</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-user me-1"></i><span>{tournament.masterProfile?.userName}</span>
                                                </td>
                                                <td>
                                                {
                                                    tournament.status === 'active' ? 
                                                    <span className="badge badge-success rounded-pill d-inline">
                                                        {tournament.status}
                                                    </span> 
                                                    : tournament.status === 'pending' ? 
                                                    <span className="badge badge-primary rounded-pill d-inline">
                                                        {tournament.status}
                                                    </span>
                                                    : tournament.status === 'blocked' ? 
                                                    <span className="badge badge-warning rounded-pill d-inline">
                                                        {tournament.status}
                                                    </span> 
                                                    : tournament.status === 'revision' ? 
                                                    <span className="badge badge-dark rounded-pill d-inline">
                                                        {tournament.status}
                                                    </span> 
                                                    : tournament.status === 'draft' ? 
                                                    <span className="badge badge-warning rounded-pill d-inline">
                                                        {tournament.status}
                                                    </span> 
                                                    : '-'
                                                }
                                                </td>
                                                <td>
                                                    {
                                                        tournament.status === 'active' ?
                                                            <Link to={`/tournament/details/${tournament._id}`}>
                                                                <span className="text-success">
                                                                    <i className="fas fa-hand-point-right me-1"></i>Preview
                                                                </span>
                                                            </Link> :
                                                        tournament.status === 'pending' || tournament.status === 'blocked' ?
                                                            <span className="text-primary">
                                                                N/A
                                                            </span> :
                                                        <Link to={`/master/${id}/tournaments/${tournament._id}`}>
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

export default MasterTournamentsTable;