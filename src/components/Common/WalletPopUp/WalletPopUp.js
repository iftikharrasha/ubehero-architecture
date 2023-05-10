import { Link } from 'react-router-dom';

const WalletPopUp = ({userId}) => {

  return (
    <div className="dropdown">
        <Link to={`/`} className="mx-4 dropdown-toggle hidden-arrow text-white" id="navbarDropdownMenuLink"
        role="button" data-mdb-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-wallet"></i>
            <span className="badge rounded-pill badge-notification bg-secondary">$0</span>
        </Link>

        <ul className="dropdown-menu p-0 overflow-hidden" aria-labelledby="navbarDropdownMenuLink">
            <div className="container p-0">
                <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-12">

                    <div className="card">
                        <div className="card-header d-flex justify-content-start align-items-center p-3 bg-secondary text-white border-bottom-0">
                            <img src="https://i.ibb.co/vjpGbfj/balance-Coin.webp" className="rounded-circle img-fluid" style={{width: "25px"}} alt="wallet"/>
                            <p className="mb-0 fw-bold ms-2">Wallet Details</p>
                        </div>
                        <div className="card-body text-center">
                            <div className="d-flex justify-content-between text-center mt-2 mb-2 walletFont">
                                <div>
                                    <p className="text-muted mb-0">Balance</p>
                                    <p className="mb-2 h5">$0</p>
                                </div>
                                <div className="px-4">
                                    <p className="text-muted mb-0">Income</p>
                                    <p className="mb-2 h5">$566</p>
                                </div>
                                <div>
                                    <p className="text-muted mb-0">Pending</p>
                                    <p className="mb-2 h5 text-success">$23 <i className="fas fa-caret-up me-1"></i></p>
                                </div>
                            </div>
                            <Link to={`/wallet/${userId}`}>
                            <button type="button" className="btn btn-secondary btn-rounded btn-sm">
                                My Wallet
                            </button>
                            </Link>
                        </div>
                    </div>

                </div>
                </div>
            </div>
            {/* <li className="notyf-item">
                <Link className="dropdown-item" to={`/wallet/${userId}`}>
                    <div className='d-flex justify-content-between align-items-center'>
                    <div className='text-left subject d-flex justify-content-center align-items-center'>
                        <span className='d-flex justify-content-center align-items-center'>
                        <i className="fas fa-bell text-secondary"></i>
                        </span>
                    </div>
                    </div>
                </Link>
            </li> */}
        </ul>
    </div>
  );
};

export default WalletPopUp;