import React from 'react';
import { Modal } from 'antd';
import BadgeAnime from './BadgeAnime';

const BadgePopup = ({isModalOpen, setIsModalOpen, claimedBadge}) => {
    const copies = [1, 2, 3, 4, 5, 6, 7, 8];
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title={<p className="text-capital">{claimedBadge.title} Badge</p>} className='claimModal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className={claimedBadge.claimed ? "number" : "number numberDefault"}>{claimedBadge.claimed ? claimedBadge.level+1 : claimedBadge.level === 0 ? 1 : claimedBadge.level}</div>
            <div className="badgeClaimed">
                <div className='spinningasset'>
                    <img src={claimedBadge.icon} alt='claim'/>
                    {
                        copies.map((copy, index) => (
                            <i style={{ backgroundImage: `url(${claimedBadge.icon})` }} key={index}></i>
                        ))
                    }
                </div>
            </div>
            {
                claimedBadge.claimed ? 
                <>
                    <BadgeAnime/>
                    <div className="instructions text-center">
                        <h2>Congratulations</h2>
                        <p>
                            You've unlocked Level {claimedBadge.level+1} badge of {claimedBadge.title}
                        </p>
                    </div>
                    <ul className='rewards ps-0'>
                        <li>
                            <img src="https://icons.iconarchive.com/icons/iconarchive/treasure-chest/512/Blue-Flat-Treasure-Chest-icon.png" alt="loot" width={50}/>
                            <span>
                                +{claimedBadge.loots} LOOTS
                            </span>
                        </li>
                        <li>
                            <img src="https://cdn2.iconfinder.com/data/icons/outlined-valuable-items/200/minerals_green_stone-512.png" alt="gems" width={50}/>
                            <span>
                                +{claimedBadge.gems} GEMS
                            </span>
                        </li>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/5972/5972327.png" alt="xp" width={50}/>
                            <span>
                                +{claimedBadge.xp} XP
                            </span>
                        </li>
                    </ul>
                </> : 
                <div className="instructions text-center">
                    <h2>{claimedBadge.title}</h2>
                    <p>
                    {claimedBadge.instruction}
                    </p>
                </div>
            }
        </Modal>
    );
};

export default BadgePopup;