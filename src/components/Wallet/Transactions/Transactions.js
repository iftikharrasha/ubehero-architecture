import React from "react";
import Table from 'react-bootstrap/Table';

const Transactions = (props) => {
//   const { _id, tName, leaderboard, version } = props.leaderboards;
  
  return (
    <div className='card d-flex mb-3 p-3' 
      style={{position: 'relative'}}
    >
      <h2 className="mb-3">List of transactions | Counts: 1</h2>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Source</th>
          <th>TrxID</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Remarks</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>1</td>
            <td>Money Transferred to cena235</td>
            <td>EToken</td>
            <td>pm_1212541254</td>
            <td>10$</td>
            <td>USD</td>
            <td>Send Money</td>
            <td>Succeeded</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Money Transferred to cena235</td>
            <td>EToken</td>
            <td>pm_1212541254</td>
            <td>10$</td>
            <td>USD</td>
            <td>Send Money</td>
            <td>Succeeded</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Money Transferred to cena235</td>
            <td>EToken</td>
            <td>pm_1212541254</td>
            <td>10$</td>
            <td>USD</td>
            <td>Send Money</td>
            <td>Succeeded</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Money Transferred to cena235</td>
            <td>EToken</td>
            <td>pm_1212541254</td>
            <td>10$</td>
            <td>USD</td>
            <td>Send Money</td>
            <td>Succeeded</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Money Transferred to cena235</td>
            <td>EToken</td>
            <td>pm_1212541254</td>
            <td>10$</td>
            <td>USD</td>
            <td>Send Money</td>
            <td>Succeeded</td>
        </tr>
        {/* {
          leaderboard.map((row, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{row.userName}</td>
              <td>{row.gender}</td>
              <td>{row.country}</td>
              <td>{row.photo}</td>
            </tr>
          ))
        } */}
      </tbody>
    </Table>
    </div>
  );
};

export default Transactions;
