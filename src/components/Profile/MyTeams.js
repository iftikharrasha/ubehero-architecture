import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MyTeams = ({myTeams}) => {
    return (
        <div>
            <h2 className='mb-4'>My Teams: {myTeams.length}</h2>
            <div className='d-flex justify-between'>
                {
                    myTeams.length === 0 ? <p className="mt-3">No teams found!</p> :
                        myTeams.map((item, index) => (
                            <Card style={{ width: '18rem' }} className="mr-2" key={index}>
                            <Card.Img variant="top" src={item.photo} style={{ width: '30%', padding: '12px'}}/>
                                <Card.Body>
                                    <Card.Title>{item.teamName}</Card.Title>
                                    <Card.Text>
                                        Members: {item.members.length}
                                    </Card.Text>
                                    <Card.Text>
                                        {item.createdAt}
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