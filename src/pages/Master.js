import React from 'react';
import { Link } from 'react-router-dom';

const Master = () => {
    return (
        <div>
        <nav
            id="sidebarMenu"
            className="collapse d-lg-block masterNav collapse bg-white"
            >
            <div className="position-sticky">
            <div className="list-group list-group-flush mx-3">
                <Link
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple active"
                aria-current="true"
                >
                <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
                </Link>
                {/* <a
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                >
                <i className="fas fa-chart-area fa-fw me-3"></i><span>Webiste traffic</span>
                </a> */}
                {/* <a
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-lock fa-fw me-3"></i><span>Password</span></a> */}
                {/* <a
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-chart-pie fa-fw me-3"></i><span>Announcements</span>
                </a> */}
                {/* <a
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-globe fa-fw me-3"></i><span>International</span></a> */}
                <Link
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Tournaments</span></Link>
                <Link
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></Link>
                <Link
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-building fa-fw me-3"></i><span>Followers</span></Link>
                <Link
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-calendar fa-fw me-3"></i><span>Results</span></Link>
                <Link
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-users fa-fw me-3"></i><span>Participants</span></Link>
                <Link
                to="master/inner-page"
                className="list-group-item list-group-item-action py-2 ripple"
                ><i className="fas fa-money-bill fa-fw me-3"></i><span>Income</span></Link>
            </div>
            </div>
        </nav>

        <main>
            <div className="container pt-4">
                <section className="mb-4">
                <div className="card">
                    <div className="card-header text-center py-3">
                    <h5 className="mb-0 text-center">
                        <strong>Master Performance KPIs</strong>
                    </h5>
                    </div>
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Product Detail Views</th>
                            <th scope="col">Unique Purchases</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Product Revenue</th>
                            <th scope="col">Avg. Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">Value</th>
                            <td>18,492</td>
                            <td>228</td>
                            <td>350</td>
                            <td>$4,787.64</td>
                            <td>$13.68</td>
                            </tr>
                            <tr>
                            <th scope="row">Percentage change</th>
                            <td>
                                <span className="text-danger">
                                <i className="fas fa-caret-down me-1"></i
                                    ><span>-48.8%%</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-success">
                                <i className="fas fa-caret-up me-1"></i><span>14.0%</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-success">
                                <i className="fas fa-caret-up me-1"></i><span>46.4%</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-success">
                                <i className="fas fa-caret-up me-1"></i><span>29.6%</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-danger">
                                <i className="fas fa-caret-down me-1"></i
                                    ><span>-11.5%</span>
                                </span>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">Absolute change</th>
                            <td>
                                <span className="text-danger">
                                <i className="fas fa-caret-down me-1"></i
                                    ><span>-17,654</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-success">
                                <i className="fas fa-caret-up me-1"></i><span>28</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-success">
                                <i className="fas fa-caret-up me-1"></i><span>111</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-success">
                                <i className="fas fa-caret-up me-1"></i
                                    ><span>$1,092.72</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-danger">
                                <i className="fas fa-caret-down me-1"></i
                                    ><span>$-1.78</span>
                                </span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </section>

                <section>
                <div className="row">
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div className="align-self-center">
                            <i className="fas fa-pencil-alt text-info fa-3x"></i>
                            </div>
                            <div className="text-end">
                            <h3>278</h3>
                            <p className="mb-0">New Tournaments</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div>
                            <h3 className="text-success">156</h3>
                            <p className="mb-0">New Participants</p>
                            </div>
                            <div className="align-self-center">
                            <i className="far fa-user text-success fa-3x"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div className="align-self-center">
                            <i className="fas fa-chart-line text-success fa-3x"></i>
                            </div>
                            <div className="text-end">
                            <h3>64.89 %</h3>
                            <p className="mb-0">Bounce Rate</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div className="align-self-center">
                            <i className="fas fa-map-marker-alt text-danger fa-3x"></i>
                            </div>
                            <div className="text-end">
                            <h3>423</h3>
                            <p className="mb-0">Total Visits</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div>
                            <h3 className="text-info">278</h3>
                            <p className="mb-0">New Posts</p>
                            </div>
                            <div className="align-self-center">
                            <i className="fas fa-book-open text-info fa-3x"></i>
                            </div>
                        </div>
                        <div className="px-md-1">
                            <div className="progress mt-3 mb-1 rounded" style={{height: "7px"}}>
                            <div
                                className="progress-bar bg-info"
                                role="progressbar"
                                style={{width: "80%"}}
                                aria-valuenow="80"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div>
                            <h3 className="text-warning">156</h3>
                            <p className="mb-0">New Comments</p>
                            </div>
                            <div className="align-self-center">
                            <i className="far fa-comments text-warning fa-3x"></i>
                            </div>
                        </div>
                        <div className="px-md-1">
                            <div className="progress mt-3 mb-1 rounded"  style={{height: "7px"}}>
                            <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{width: "35%"}}
                                aria-valuenow="35"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div>
                            <h3 className="text-success">64.89 %</h3>
                            <p className="mb-0">Bounce Rate</p>
                            </div>
                            <div className="align-self-center">
                            <i className="fas fa-mug-hot text-success fa-3x"></i>
                            </div>
                        </div>
                        <div className="px-md-1">
                            <div className="progress mt-3 mb-1 rounded" style={{height: "7px"}}>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{width: "60%"}}
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                            <div>
                            <h3 className="text-danger">423</h3>
                            <p className="mb-0">Total Visits</p>
                            </div>
                            <div className="align-self-center">
                            <i className="fas fa-map-signs text-danger fa-3x"></i>
                            </div>
                        </div>
                        <div className="px-md-1">
                            <div className="progress mt-3 mb-1 rounded" style={{height: "7px"}}>
                            <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{width: "40%"}}
                                aria-valuenow="40"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                <section>
                <div className="row">
                    <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between p-md-1">
                            <div className="d-flex flex-row">
                            <div className="align-self-center">
                                <i className="fas fa-pencil-alt text-info fa-3x me-4"></i>
                            </div>
                            <div>
                                <h4>Total Hosted</h4>
                                <p className="mb-0">Per Month</p>
                            </div>
                            </div>
                            <div className="align-self-center">
                            <h2 className="h1 mb-0">18</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between p-md-1">
                            <div className="d-flex flex-row">
                            <div className="align-self-center">
                                <i
                                className="far fa-comment-alt text-warning fa-3x me-4"
                                ></i>
                            </div>
                            <div>
                                <h4>Total Followers</h4>
                                <p className="mb-0">Monthly blog posts</p>
                            </div>
                            </div>
                            <div className="align-self-center">
                            <h2 className="h1 mb-0">195</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between p-md-1">
                            <div className="d-flex flex-row">
                            <div className="align-self-center">
                                <h2 className="h1 mb-0 me-4">$456.00</h2>
                            </div>
                            <div>
                                <h4>Total Revenue</h4>
                                <p className="mb-0">Monthly Sales</p>
                            </div>
                            </div>
                            <div className="align-self-center">
                            <i className="far fa-heart text-danger fa-3x"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex justify-content-between p-md-1">
                            <div className="d-flex flex-row">
                            <div className="align-self-center">
                                <h2 className="h1 mb-0 me-4">$36,000.00</h2>
                            </div>
                            <div>
                                <h4>Expenditure</h4>
                                <p className="mb-0">Monthly Cost</p>
                            </div>
                            </div>
                            <div className="align-self-center">
                            <i className="fas fa-wallet text-success fa-3x"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
        </main>
        </div>
    );
};

export default Master;