import React from "react";

const Transactions = (props) => {
//   const { _id, tName, leaderboard, version } = props.leaderboards;
  
  return (
    <div className='card d-flex mb-3 p-3' 
      style={{position: 'relative'}}
    >
    <h2 className="mb-3">Transactions History</h2>

    <table className="table table-hover text-nowrap">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Source</th>
          <th scope="col">TrxID</th>
          <th scope="col">Amount</th>
          <th scope="col">Currency</th>
          <th scope="col">Remarks</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className="text-black">
              <i className="fas fa-money me-1"></i><span>1</span>
            </span>
          </td>
          <td>Money Transferred to cena235</td>
          <td>EToken</td>
          <td>pm_2312123</td>
          <td>
            <span className="text-danger">
              <i className="fas fa-caret-down me-1"></i><span>-$12.72</span>
            </span>
          </td>
          <td>USD</td>
          <td>Send Money</td>
          <td><span className="badge badge-warning rounded-pill d-inline">Pending</span></td>
        </tr>
        <tr>
          <td>
            <span className="text-black">
              <i className="fas fa-money me-1"></i><span>2</span>
            </span>
          </td>
          <td>Money Transferred from harrykane</td>
          <td>EToken</td>
          <td>pm_2312123</td>
          <td>
            <span className="text-success">
              <i className="fas fa-caret-up me-1"></i><span>$80.23</span>
            </span>
          </td>
          <td>USD</td>
          <td>Send Money</td>
          <td><span className="badge badge-warning rounded-pill d-inline">Awaiting</span></td>
        </tr>
        <tr>
          <td>
            <span className="text-black">
              <i className="fas fa-money me-1"></i><span>3</span>
            </span>
          </td>
          <td>Money Transferred to harrykane</td>
          <td>EToken</td>
          <td>pm_2312123</td>
          <td>
            <span className="text-danger">
              <i className="fas fa-caret-down me-1"></i><span>$11.05</span>
            </span>
          </td>
          <td>USD</td>
          <td>Send Money</td>
          <td><span className="badge badge-success rounded-pill d-inline">Succeeded</span></td>
        </tr>
      </tbody>
    </table>
    </div>
  );
};

export default Transactions;
