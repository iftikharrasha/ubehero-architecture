import React from 'react';
import useTimer from '../../../hooks/useTimer';
import StageRegistration from './StageRegistration';
import StageCredentials from './StageCredentials';
import StageResult from './StageResult';
import { Button, Result } from 'antd';

const StageDeclare = ({ tId, previewURL, setPreviewURL, updatedTournament, setUpdatedTournament }) => {
    const { step } = useTimer(updatedTournament.dates);
    let content; 

    switch (step) {
        case 0:
            content = (
                <StageRegistration
                    tId={tId}
                    previewURL={previewURL}
                    setPreviewURL={setPreviewURL}
                    updatedTournament={updatedTournament}
                    setUpdatedTournament={setUpdatedTournament}   
                />
            );
        break;

        case 1:
            content = (
                <StageCredentials
                    tId={tId}
                    updatedTournament={updatedTournament}
                    setUpdatedTournament={setUpdatedTournament}   
                />
            );
        break;

        case 2:
            content = (
                <StageResult
                    tId={tId}
                    updatedTournament={updatedTournament}
                    setUpdatedTournament={setUpdatedTournament}   
                />
            );
        break;

        case 3:
            content = (
                <Result
                    status="success"
                    title="Successfully finished the tournament!"
                    subTitle="Please wait to get your rewards sent by the admins soon."
                    extra={[
                    <Button type="primary" key="console">
                        Dashboard
                    </Button>,
                    <Button key="buy">Create Again</Button>,
                    ]}
                />
            );
        break;

        default:
            content = null;
    }

    return (
        <>
            {content}
        </>
    );
};

export default StageDeclare;