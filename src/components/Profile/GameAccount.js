import React from 'react';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const GameAccount = ({account, cover}) => {
    return (
        <Card
            hoverable
            style={{
                width: 300,
            }}
            cover={
                    !cover ? null :
                    <img
                    alt="example"
                    src={account.gameLogo}
                />
            }
            >
            <Meta
                avatar={<Avatar src={account.accountLogo} />}
                title={`IGN: ${account.playerIgn}`}
                description={
                <h6>
                    <span className='text-capital'>{account.tag ? account.tag : 'player'}</span> 
                    &nbsp; ID: {account.playerId}
                </h6>
                }
            />
        </Card>
    );
};

export default GameAccount;