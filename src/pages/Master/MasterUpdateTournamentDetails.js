import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import TournamentStage from "../../components/Common/TournamentStage/TournamentStage";
import StageDeclare from "./StageDeclare";
import { fetchMastersTournamentDetails } from "../../redux/slices/masterTournamentSlice";
import useTimer from "../../hooks/useTimer";

const MasterUpdateDraft = () => {
    const { tId } = useParams();
    const dispatch = useDispatch();

    const masterTournaments = useSelector((state) => state.masterTournaments.data)
    const tournamentDetails = masterTournaments.find(t => t._id === tId);
    const versionTournament = tournamentDetails ? tournamentDetails.version : 0;

    const [updatedTournament, setUpdatedTournament] = useState(tournamentDetails);
    const [previewURL, setPreviewURL] = useState(null);

    const compMode = tournamentDetails?.settings?.competitionMode;
    const { step } = useTimer(tournamentDetails?.dates);
    console.log("step", step)

    useEffect(() => {
        dispatch(fetchMastersTournamentDetails({ tId, versionTournament }));
        // dispatch(fetchLeaderboards({ id, versionLeaderboard }));
        // if(compMode === 'knockout'){
        //     dispatch(fetchBrackets({ id, versionBracket }));
        // }
    }, [])

    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center overview w-75 mx-auto'
            style={{ padding: "40px 0px" }}
        >
            {
                Object.keys(tournamentDetails).length > 0 && 
                    <div className="container mb-4">
                        {/* <TournamentStage 
                            tournament={tournamentDetails}
                        /> */}
                        <TournamentStage 
                            compMode={compMode}
                            currentMatch={tournamentDetails?.bracket[0]?.matches[tournamentDetails?.settings?.currentMatchId-1]}
                            finalMatch={tournamentDetails?.bracket[0]?.matches[tournamentDetails?.settings?.maxParticipitant-2]}
                            tournament={tournamentDetails} 
                        />

                        <StageDeclare
                            step={step}
                            tId={tId}
                            previewURL={previewURL}
                            setPreviewURL={setPreviewURL}
                            updatedTournament={updatedTournament}
                            setUpdatedTournament={setUpdatedTournament}   
                            compMode={compMode}
                            currentMatch={tournamentDetails?.bracket[0]?.matches[tournamentDetails?.settings?.currentMatchId-1]}
                        />
                    </div>
            }
        </div>
    );
};

export default MasterUpdateDraft;