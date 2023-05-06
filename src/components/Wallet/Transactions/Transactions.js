import React from "react";

const Transactions = ({transactions}) => {
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


      {
        transactions.length === 0 ? <p className="mt-3">No transactions found!</p> :
          transactions.map((item, index) => (
              <tr key={index}>
                <td>
                  <span className="text-black">
                    <i className="fas fa-money me-1"></i><span>{index+1}</span>
                  </span>
                </td>
                <td>{item.description}</td>
                <td>{item.method}</td>
                <td>{item.trx}</td>
                <td>
                    {
                        item.activity === 'expense' ? 
                        <span className="text-danger">
                          <i className="fas fa-caret-down me-1"></i><span>-{item.amount}</span> 
                        </span> 
                      : item.activity === 'earning' ? 
                        <span className="text-success">
                          <i className="fas fa-caret-up me-1"></i><span>{item.amount}</span>
                        </span>
                      : item.activity === 'withdrawal' ? 
                      <span className="text-success">
                        <i className="fas fa-check me-1"></i><span>{item.amount}</span>
                      </span>
                      : '-'
                    }
                  
                </td>
                <td>{item.currency}</td>
                <td>{item.remarks}</td>
                <td>
                  {
                      item.status === 'approved' ? 
                      <span className="badge badge-success rounded-pill d-inline">
                        {item.status}
                      </span> 
                    : item.status === 'pending' ? 
                      <span className="badge badge-warning rounded-pill d-inline">
                        {item.status}
                      </span>
                    : item.status === 'cancelled' ? 
                      <span className="badge badge-warning rounded-pill d-inline">
                        {item.status}
                      </span> 
                    : item.status === 'incoming' ? 
                    <span className="badge badge-warning rounded-pill d-inline">
                      {item.status}
                    </span> 
                    : '-'
                  }
                </td>
              </tr>
          ))
      }
      </tbody>
    </table>
    </div>
  );
};

export default Transactions;
