import React from "react";
import Table from 'react-bootstrap/Table';

const Leaderboards = (props) => {
  const { _id, tName, leaderboard, version } = props.leaderboards;
  
  return (
    <div className='card d-flex mb-3 p-3' 
      style={{position: 'relative'}}
    >
      <h2 className="mb-3">Leaderboard of {tName} | Members: {leaderboard.length}</h2>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Gender</th>
          <th>Country</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        {
          leaderboard.map((row, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{row.userName}</td>
              <td>{row.gender}</td>
              <td>{row.country}</td>
              <td>{row.photo}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
    </div>
  );
};

export default Leaderboards;
