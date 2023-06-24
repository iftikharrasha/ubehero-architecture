import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import TournamentStage from "../../components/Common/TournamentStage/TournamentStage";
import StageDeclare from "./StageDeclare";

const MasterUpdateDraft = () => {
    const masterTournaments = useSelector((state) => state.masterTournaments.data)
    const [updatedTournament, setUpdatedTournament] = useState({});
    const [previewURL, setPreviewURL] = useState(null);

    const { tId } = useParams();

    useEffect(() => {
        if(masterTournaments){
            const thisTournament = masterTournaments.find(tournament => tournament._id === tId);
            setUpdatedTournament(thisTournament)
            setPreviewURL(thisTournament.tournamentThumbnail)
        }
    }, [masterTournaments, tId]);

    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center overview w-75 mx-auto'
            style={{ padding: "40px 0px" }}
        >
            {
                Object.keys(updatedTournament).length > 0 && 
                    <div className="container mb-4">
                        <TournamentStage tournament={updatedTournament}/>

                        <StageDeclare
                            tId={tId}
                            previewURL={previewURL}
                            setPreviewURL={setPreviewURL}
                            updatedTournament={updatedTournament}
                            setUpdatedTournament={setUpdatedTournament}   
                        />
                    </div>
            }
        </div>
    );
};

export default MasterUpdateDraft;