import React from 'react';
import useTimer from '../../../hooks/useTimer';
import StageRegistration from './StageRegistration';
import StageCredentials from './StageCredentials';
import StageResult from './StageResult';
import { Button, Result, Timeline } from 'antd';

const StageDeclare = ({ tId, previewURL, setPreviewURL, updatedTournament, setUpdatedTournament }) => {
    const { step } = useTimer(updatedTournament.dates);
    // let step = 1;
    let content; 
    console.log('step', step)

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
                    updatedTournament={updatedTournament}
                    setUpdatedTournament={setUpdatedTournament}   
                />
            );
        break;

        case 3:
            content = (
                <StageResult
                    tId={tId}
                    updatedTournament={updatedTournament}
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
                    children: step === 1 || step === 0 ? content : "Registration Phase",
                },
                {
                    color: step === 2 ? "red" : step > 2 ? "green" : "gray",
                    children: step === 2 ? content : "Lineup Phase",
                },
                {
                    color: step === 3 ? "red" : step > 3 ? "green" : "gray",
                    children: step === 3 ? content : "Tournament Start Phase",
                },
                {
                    color: step === 4 ? "green" : "gray",
                    children: step === 4 ? content : "Result Uploading Phase",
                },
                ]}
            />
        </div>
    );
};

export default StageDeclare;