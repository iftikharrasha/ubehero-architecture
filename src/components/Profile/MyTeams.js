import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MyTeams = ({teams}) => {
    return (
        <div>
            <h2 className='mb-4'>My teams: {teams.length}</h2>
            <div className='d-flex justify-between'>
                {
                teams.map((item, index) => (
                    <Card style={{ width: '18rem' }} className="mr-2" key={index}>
                    <Card.Img variant="top" src={item.teamsPhoto} style={{ width: '30%', padding: '12px'}}/>
                        <Card.Body>
                            <Card.Title>{item.teamName}</Card.Title>
                            <Card.Text>
                                Members: {item.members.length}
                            </Card.Text>
                            <Card.Text>
                                {item.dateCreated}
                            </Card.Text>
                            <Button variant="primary">Check</Button>
                        </Card.Body>
                    </Card>
                ))
                }
                
            </div>
        </div>
    );
};

export default MyTeams;