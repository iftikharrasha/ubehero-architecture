import { Alert, Form, Input, Radio, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const { Option } = Select;

const GameAccountOfProfileModal = ({form, setIsFieldsFilled, gameSelected, setGameSelected, gameAccountError}) => {
    const games = useSelector(state => state.statics.games);
    const [filteredPlatforms, setFilteredPlatforms] = useState(null);

    const onCategoryChange = (value) => {
        const p = games.find((game) => game.gameTitle === value);
        setGameSelected(p);
        setFilteredPlatforms(null); //reset
    };

    return (
        <>
        <Form
            form={form}
            name="complex-form"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            layout='vertical'
            onFieldsChange={() => {
                // Check if all three fields are filled
                const fields = form.getFieldsValue();
                const allFieldsFilled = Object.values(fields).every((field) => field);
                setIsFieldsFilled(allFieldsFilled);
            }}
            >  
            <Form.Item>
                <Space.Compact>
                    <Form.Item
                        label='Game Name'
                        name={['category']}
                        style={{
                        width: 200,
                        margin: '0 8px',
                        }}
                        rules={[
                        {
                            required: true,
                            message: 'Game category is required',
                        },
                        ]}
                    >
                        <Select placeholder="Select game category" onChange={onCategoryChange}>
                            {games.map((game, i) => {
                                return <Option key={i} value={game.gameTitle}>{game.gameTitle}</Option>;
                            })}
                        </Select>
                    </Form.Item>
                    {
                    !gameSelected ? null :
                    <Form.Item
                        label='Platform'
                        name={['platform']}
                        style={{
                        width: 600,
                        margin: '0 8px',
                        }}
                        rules={[
                        {
                            required: true,
                            message: 'Platform is required',
                        },
                        ]}
                    >
                        <Radio.Group value={filteredPlatforms}>
                            {gameSelected?.eligiblePlatforms?.filter(platform => platform !== 'cross').map((platform, i) => (
                                <Radio key={i} value={platform} style={{ lineHeight: '32px' }}>
                                    {platform}
                                </Radio>
                            ))}
                            {gameSelected?.crossPlatforms?.map((platform, i) => (
                                <Radio key={i} value={platform} style={{ lineHeight: '32px' }}>
                                    {platform}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    }
                </Space.Compact>
                <Space.Compact className='mt-4'>
                    <Form.Item
                        label='In Game Name'
                        name={['playerIgn']}
                        style={{
                        width: 300,
                        margin: '0 8px',
                        }}
                        rules={[
                        {
                            required: true,
                            message: 'In game name required',
                        },
                        ]}
                    >
                        <Input
                        placeholder="Enter In Game Name"
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span className='text-capital'>Enter {gameSelected ? gameSelected.tag : 'Game'} ID</span>}
                        name={['playerId']}
                        style={{
                        width: 300,
                        margin: '0 8px',
                        }}
                        rules={[
                        {
                            required: true,
                            message: `${gameSelected ? gameSelected.tag : 'Game'} ID is required`,
                        },
                        ]}
                    >
                        <Input
                        placeholder={`Enter ${gameSelected ? gameSelected.tag : 'game'} ID`}
                        />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
            </Form> 
            {
            gameAccountError ? 
                <div className="d-flex">
                    <Alert 
                        message={gameAccountError.message}
                        description={gameAccountError.description}
                        type="warning"
                        showIcon 
                        closable={false}
                    /> 
                </div>: null
            }
        </>
    );
};

export default GameAccountOfProfileModal;