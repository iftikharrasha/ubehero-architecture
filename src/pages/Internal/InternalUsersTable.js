import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Preloader from "../../components/PageLayout/Preloader";
import { fetchInternalsUsers } from "../../redux/slices/internalUsersSlice";

const InternalUsersTable = () => {
    const dispatch = useDispatch();
    const versionUsers = useSelector(state => state.internalUsers.version);
    const id = useSelector(state => state.profile.data ? state.profile.data._id : null);

    useEffect(() => {
        dispatch(fetchInternalsUsers({id, versionUsers}));
    }, [])

    const internalUsers = useSelector((state) => state.internalUsers.data)

    return (
        <div className="container pt-4">
            <section className="mb-4">
            <div className="card">
                <div className="card-header text-center py-3">
                    <h5 className="mb-0 text-center">
                        <strong>Users List</strong>
                    </h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th scope="col">No.</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Joined Date</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Email</th>
                            <th scope="col">Verified</th>
                            <th scope="col">Role</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                internalUsers ? 
                                    internalUsers?.length === 0 ? <p className="mt-3">No user found!</p> :
                                        internalUsers.map((user, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>
                                                    <img className='img-fluid' src={user.photo} alt='user thumb' width="30px" height="30px"/>
                                                    <Link to={`/user/details/${user._id}`}>
                                                        <span className='ms-3'>{user.userName}</span>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <i className="fas fa-tag me-1 text-secondary"></i><span>{user.gender}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-clock me-1 text-secondary"></i><span>{moment(user.createdAt).fromNow()}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-receipt me-1 text-secondary"></i><span>{user.balance}</span>
                                                </td>
                                                <td>
                                                    <i className="fas fa-users me-1 text-secondary"></i><span>{user.emailAddress}</span>
                                                </td>
                                                <td>
                                                {
                                                    user.emailVerified ? 
                                                        <span className="text-success">
                                                            <i className="fas fa-check me-1"></i><span></span>
                                                        </span>
                                                        : 
                                                        <span className="text-danger">
                                                            <i className="fas fa-close me-1"></i><span></span>
                                                        </span>
                                                }
                                                </td>
                                                <td>
                                                {
                                                    user.permissions.includes("admin") ? 
                                                    <span className="badge badge-danger rounded-pill d-inline">
                                                        Admin
                                                    </span> 
                                                    : user.permissions.includes("master") ? 
                                                    <span className="badge badge-warning rounded-pill d-inline">
                                                        Master
                                                    </span>
                                                    : 
                                                    <span className="badge badge-primary rounded-pill d-inline">
                                                        User
                                                    </span>
                                                }
                                                </td>
                                                <td>
                                                {
                                                    user.status === 'active' ? 
                                                    <span className="badge badge-success rounded-pill d-inline">
                                                        {user.status}
                                                    </span> 
                                                    : user.status === 'inactive' ? 
                                                    <span className="badge badge-primary rounded-pill d-inline">
                                                        {user.status}
                                                    </span>
                                                    : user.status === 'blocked' ? 
                                                    <span className="badge badge-danger rounded-pill d-inline">
                                                        {user.status}
                                                    </span> 
                                                    : '-'
                                                }
                                                </td>
                                                <td>
                                                    <Link to={`/internal/${id}/user/${user._id}`}>
                                                        <span className="text-warning">
                                                            <i className="fas fa-pen-to-square me-1"></i>Edit
                                                        </span>
                                                    </Link>
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

export default InternalUsersTable;