import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import TournamentStage from "../../../components/Common/TournamentStage/TournamentStage";
import { fetchMastersTournamentDetails } from "../../../redux/slices/masterTournamentSlice";
import useTimer from "../../../hooks/useTimer";
import "react-datepicker/dist/react-datepicker.css";
import StageDeclare from "./StageDeclare/StageDeclare";

const MasterUpdateDraft = () => {
    const { tId } = useParams();
    const dispatch = useDispatch();

    const masterTournaments = useSelector((state) => state.masterTournaments.data)
    const tournamentDetails = masterTournaments.find(t => t._id === tId);
    const versionTournament = tournamentDetails ? tournamentDetails.version : 0;

    const [updatedTournament, setUpdatedTournament] = useState(tournamentDetails);
    const [previewURL, setPreviewURL] = useState(updatedTournament.tournamentThumbnail);

    const compMode = tournamentDetails?.settings?.competitionMode;
    const { step } = useTimer(tournamentDetails?.dates);

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
                        <TournamentStage 
                            compMode={compMode}
                            currentMatch={tournamentDetails?.bracket[0]?.matches[tournamentDetails?.settings?.currentMatchId-1]}
                            finalMatch={tournamentDetails?.bracket[0]?.matches[tournamentDetails?.settings?.maxParticipitant-2]}
                            tournament={updatedTournament} 
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