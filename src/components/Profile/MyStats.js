import React from 'react';
import Card from 'react-bootstrap/Card';

const MyStats = ({stats}) => {
    return (
        <div>
            <h2 className='mb-4'>My Stats: {stats.games.length}</h2>
            <div>
                <Card style={{ width: '100%' }} className="mb-2" >
                    <Card.Img variant="top" src="https://i.ibb.co/RTmh5CL/fifa-game-icon.webp" style={{ width: '10%'}}/>
                    <Card.Body style={{ width: '80%', margin: '0 auto' }} className="mb-2" >
                        <Card.Title>Fifa</Card.Title>
                        <div className="d-flex justify-content-between">
                            <Card.Text>
                                Played: {stats.games.fifa ? stats.games.fifa.defeat : 0}
                            </Card.Text>
                            <Card.Text>
                                Win: {stats.games.fifa ? stats.games.fifa.win : 0}
                            </Card.Text>
                            <Card.Text>
                                Defeat: {stats.games.fifa ? stats.games.fifa.defeat : 0}
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '100%' }} className="mb-2" >
                    <Card.Img variant="top" src="https://i.ibb.co/n7zxVbX/pubg-game-icon.webp" style={{ width: '10%'}}/>
                    <Card.Body style={{ width: '80%', margin: '0 auto' }}>
                        <Card.Title>Pubg</Card.Title>
                        <div className="d-flex justify-content-between">
                            <Card.Text>
                                Played: {stats.games.pubg ? stats.games.pubg.defeat : 0}
                            </Card.Text>
                            <Card.Text>
                                Win: {stats.games.pubg ? stats.games.pubg.win : 0}
                            </Card.Text>
                            <Card.Text>
                                Defeat: {stats.games.pubg ? stats.games.pubg.defeat : 0}
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '100%' }} className="mb-2 position-relative" >
                    <Card.Img variant="top" src="https://i.ibb.co/HhCBvDG/freefire-game-icon.webp" style={{ width: '10%'}}/>
                        <Card.Body style={{ width: '80%', margin: '0 auto' }}>
                        <Card.Title>CS:GO</Card.Title>
                        <div className="d-flex justify-content-between">
                            <Card.Text>
                                Played: {stats.games.csgo ? stats.games.csgo.played : 0}
                            </Card.Text>
                            <Card.Text>
                                Win: {stats.games.csgo ? stats.games.csgo.win : 0}
                            </Card.Text>
                            <Card.Text>
                                Defeat: {stats.games.csgo ? stats.games.csgo.defeat : 0}
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '100%' }} className="mb-2 position-relative" >
                        <Card.Img variant="top" src="https://i.ibb.co/JtzsRyK/cod-game-icon.webp" style={{ width: '10%'}}/>
                        <Card.Body style={{ width: '80%', margin: '0 auto' }}>
                            <Card.Title>Warzone</Card.Title>
                            <div className="d-flex justify-content-between">
                                <Card.Text>
                                    Played: {stats.games.warzone ? stats.games.warzone.played : 0}
                                </Card.Text>
                                <Card.Text>
                                    Win: {stats.games.warzone ? stats.games.warzone.win : 0}
                                </Card.Text>
                                <Card.Text>
                                    Defeat: {stats.games.warzone ? stats.games.warzone.defeat : 0}
                                </Card.Text>
                            </div>
                        </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default MyStats;