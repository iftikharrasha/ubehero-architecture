import React from 'react';
import { Modal } from 'antd';
import BadgeAnime from './BadgeAnime';

const BadgePopup = ({isModalOpen, setIsModalOpen, claimedBadge}) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title={<p className="text-capital">{claimedBadge.title} Badge</p>} className='claimModal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className={claimedBadge.claimed ? "number" : "number numberDefault"}>{claimedBadge.level+1}</div>
            <div className="badgeClaimed">
                <div className='spinningasset'>
                    <img src={claimedBadge.icon} alt='claim'/>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
                    <i style={{ backgroundImage: `url(${claimedBadge.icon})` }}></i>
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
                                +200 LOOTS
                            </span>
                        </li>
                        <li>
                            <img src="https://cdn2.iconfinder.com/data/icons/outlined-valuable-items/200/minerals_green_stone-512.png" alt="gems" width={50}/>
                            <span>
                                +1 GEMS
                            </span>
                        </li>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/5972/5972327.png" alt="xp" width={50}/>
                            <span>
                                +120 XP
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