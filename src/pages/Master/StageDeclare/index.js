import React from 'react';
import StageRegistration from './StageRegistration';
import StageCredentials from './StageCredentials';
import StageResult from './StageResult';
import { Button, Result, Timeline } from 'antd';

const StageDeclare = ({ step, tId, previewURL, setPreviewURL, updatedTournament, setUpdatedTournament, compMode, currentMatch }) => {
    let content; 
    switch (step) {
        case 0:
        case 1:
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

        case 2:
            content = (
                <StageCredentials
                    tId={tId}
                    compMode={compMode}
                    currentMatch={currentMatch}
                    updatedTournament={updatedTournament} 
                />
            );
        break;

        case 3:
            content = (
                <StageResult
                    tId={tId}
                    updatedTournament={updatedTournament}
                    currentMatch={currentMatch}
                    setUpdatedTournament={setUpdatedTournament}   
                />
            );
        break;

        case 4:
            content = (
               <>
                    <h5>
                        Tournament <strong>Finished</strong>
                    </h5>
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
                </>
            );
        break;

        default:
            content = null;
    }

    return (
        <div className="mt-5">
            <Timeline
                items={[
                {
                    color: step === 1 || step === 0 ? "red" : step > 1 ? "green" : "gray",
                    children: step === 1 || step === 0 ? content : "Phase 1: Registration Time",
                },
                {
                    color: step === 2 ? "red" : step > 2 ? "green" : "gray",
                    children: step === 2 ? content : "Phase 2: Preparation Time",
                },
                {
                    color: step === 3 ? "red" : step > 3 ? "green" : "gray",
                    children: step === 3 ? content : "Phase 3: Battle Time",
                },
                {
                    color: step === 4 ? "green" : "gray",
                    children: step === 4 ? content : "Phase 4: Result Time",
                },
                ]}
            />
        </div>
    );
};

export default StageDeclare;