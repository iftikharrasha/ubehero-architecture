import { Select } from 'antd';
import React from 'react';

const SelectWinner = ({contenders, onSelect, position, disabled}) => {
    
    return (
        <>
            <Select size="medium"
                disabled={disabled}
                showSearch
                placeholder={`Select ${position} position`}
                optionFilterProp="children"
                onChange={onSelect}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={
                    contenders.map((participant) => ({
                        value: participant.userName,
                        label: participant.userName,
                    }))
                }
            />
        </>
    );
}

export default SelectWinner;