import React from 'react';

const Prizes = ({prizes}) => {
    return (
        <div className='d-flex justify-between'>
        <ul>
            <li>
                <p>firstPrize: {prizes.money.firstPrize}</p>
            </li>
            <li>
                <p>secondPrize: {prizes.money.secondPrize}</p>
            </li>
            <li>
                <p>thirdPrize: {prizes.money.thirdPrize}</p>
            </li>
            <li>
                <p>totalPrize: {prizes.money.totalPrize}</p>
            </li>
            <li>
                <p>masterProfit: {prizes.money.masterProfit}</p>
            </li>
        </ul>
        <ul>
            <li>
                <p>firstXp: {prizes.xp.firstXp}</p>
            </li>
            <li>
                <p>secondXp: {prizes.xp.secondXp}</p>
            </li>
            <li>
                <p>thirdXp: {prizes.xp.thirdXp}</p>
            </li>
            <li>
                <p>totalXp: {prizes.xp.totalXp}</p>
            </li>
            <li>
                <p>masterXp: {prizes.xp.masterXp}</p>
            </li>
        </ul>
    </div>
    );
};

export default Prizes;