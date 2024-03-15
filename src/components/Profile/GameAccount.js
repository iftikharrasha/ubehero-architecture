import React from 'react';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const GameAccount = ({account, cover}) => {
    // https://res.cloudinary.com/duoalyur6/image/upload/v1695208606/MOSHED-2023-9-20-17-12-57_i7hti1.gif
    // https://res.cloudinary.com/duoalyur6/image/upload/v1695224615/MOSHED-2023-9-20-21-42-44_1_mnhnik.gif
    return (
        <Card
            className='gameAccount'
            hoverable
            style={{
                width: 320,
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)', 
                backgroundImage: `url(${
                    account.platform === 'psn' ? 'https://res.cloudinary.com/duoalyur6/image/upload/v1695225139/MOSHED-2023-9-20-21-51-41_1_bprmhl.gif' :
                    account.platform === 'xbox' ? 'https://res.cloudinary.com/duoalyur6/image/upload/v1695224615/MOSHED-2023-9-20-21-42-44_1_mnhnik.gif' :
                    account.platform === 'pc' ? 'https://res.cloudinary.com/duoalyur6/image/upload/v1695372377/pc_jf7atd.gif' :
                    account.platform === 'nintendo' ? 'https://res.cloudinary.com/duoalyur6/image/upload/v1695208606/MOSHED-2023-9-20-17-12-57_i7hti1.gif' :
                    account.platform === 'mobile' ? 'https://res.cloudinary.com/duoalyur6/image/upload/v1709020274/MOSHED-2024-2-27-13-47-23-ezgif.com-crop_beo3q2.gif' :
                    'https://res.cloudinary.com/duoalyur6/image/upload/v1709020274/MOSHED-2024-2-27-13-47-23-ezgif.com-crop_beo3q2.gif'
                })`, 
                backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
            }}
            cover={
                    !cover ? null :
                    <img
                    alt="example"
                    src={account.gameLogo}
                    // src='https://res.cloudinary.com/duoalyur6/image/upload/v1695223749/xbox_qgdso3.gif'
                />
            }
            >
            <Meta
                avatar={<Avatar src={account.accountLogo} />}
                title={`IGN: ${account.playerIgn}`}
                description={
                <h6 style={{ fontSize: '14px' }}>
                    <span className='text-capital'>{account.tag ? account.tag : 'player'}</span> 
                    &nbsp;ID: {account.playerId}
                </h6>
                }
            />
        </Card>
    );
};

export default GameAccount;