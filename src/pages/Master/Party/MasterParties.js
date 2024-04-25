import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Preloader from "../../../components/PageLayout/Preloader";
import { fetchTournaments } from "../../../redux/slices/tournamentSlice";
import { Button, Divider, Space, Tag } from "antd";
import useParties from "../../../hooks/useParties";

const MasterParties = () => {
    const { handleMasterPartiesList } = useParties();
    const dispatch = useDispatch();
    const versionParty = useSelector(state => state.parties.version);
    const id = useSelector(state => state.parties.data ? state.parties.data._id : null);
    const uId = useSelector(state => state.profile.data._id);

    useEffect(() => {
        dispatch(fetchTournaments({id, versionParty}));
    }, [])
    
    const [masterParties, setMasterParties] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const parties = await handleMasterPartiesList();
            setMasterParties(parties);
          } catch (error) {
            setMasterParties([]);
            console.error('Error fetching parties list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    return (
        <div className="container pt-4">
            <Divider orientation="right">
                <Space>
                    <Link to={`/master/${id}/create-party`}>
                        <Button type="default">
                            Create Party
                        </Button>
                    </Link>
                </Space>
            </Divider>
            <section className="mb-4">
            <div className="card">
                <div className="card-header text-center py-3">
                    <h5 className="mb-0 text-center">
                        <strong>My Parties</strong>
                    </h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Party Name</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Privacy</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Joined</th>
                            <th scope="col">Requested</th>
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
                                                    <img className='img-fluid' src={party.photo} alt='tournamentThumbnail' width="25px" height="25px"/>
                                                    <span className='ms-3'>{party.title}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-trophy me-1"></i><span>{party.owner?.userName}</span>
                                                </td>
                                                <td>
                                                    <Tag color="green">
                                                        {party.privacy}
                                                    </Tag> 
                                                </td>
                                                <td>
                                                    <i className="fas fa-clock me-1 text-secondary"></i>
                                                    <span>{moment(party?.createdAt).local().format("LLL")}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-receipt me-1 text-secondary"></i><span>{party.members.joined.length}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-receipt me-1 text-secondary"></i><span>{party.members.requested.length}</span>
                                                </td>
                                                <td>
                                                    <span className="text-danger">
                                                    <i className="fas fa-chart-line me-1"></i><span>0</span>
                                                    </span>
                                                </td>
                                                <td>
                                                {
                                                    party.status === 'active' ? 
                                                    <Tag color="green">
                                                        {party.status}
                                                    </Tag> 
                                                    : party.status === 'blocked' ? 
                                                    <Tag color="green">
                                                        {party.status}
                                                    </Tag> 
                                                    : party.status === 'paused' ? 
                                                    <Tag color="green">
                                                        {party.status}
                                                    </Tag> 
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
                                                            <Link to={`/master/${uId}/member-requests/${party._id}`}>
                                                                <span className="text-warning">
                                                                    <i className="fas fa-pen-to-square me-1"></i>Details
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