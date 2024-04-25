import React from 'react';
import { Tag } from 'antd';

const ReportTags = ({id, type}) => {
    const handleReport = (tag) => {
        console.log(id, type, tag);
    }

    return (
        <>
            <Tag color="red" style={{cursor: "pointer"}} onClick={() => handleReport('Nudity')}>Nudity</Tag>
            <Tag color="magenta" style={{cursor: "pointer"}} onClick={() => handleReport('Violence')}>Violence</Tag>
            <Tag color="volcano" style={{cursor: "pointer"}} onClick={() => handleReport('Hate')}>Hate</Tag>
            <Tag color="orange" style={{cursor: "pointer"}} onClick={() => handleReport('Slang')}>Slang</Tag>
            <Tag color="gold" style={{cursor: "pointer"}} onClick={() => handleReport('Spam')}>Spam</Tag>
            <Tag color="yellow" style={{cursor: "pointer"}} onClick={() => handleReport('False Info')}>False Info</Tag>
        </>
    );
};

export default ReportTags;