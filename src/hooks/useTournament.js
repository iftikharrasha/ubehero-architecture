import { useState } from "react";
import axios from 'axios';
import { setPurchasedItem } from "../redux/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import useNotyf from "./useNotyf";
import { useHistory } from "react-router-dom";

const useTournament = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const [regDone, setRegDone] = useState(false);
    const profile = useSelector(state => state.profile);
    const history = useHistory();

    //just for testing purposes for notifications
    const jwt = localStorage.getItem("jwt");
    const { socketN } = useNotyf(profile.data, jwt);

    const handleTournamentPurchase = async (data, gameId, method) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        const purchaseItem = {
            purchasedById: profile.data._id,
            amount: data?.settings?.joiningFee,
            country: "gb",
            currency: "usd",
            trx: "Pm_1asdaTr2343asw",
            medthod: method,
            remarks: "registration",
            route: "u2a",
            activity: "expense",
            description: data.tournamentName,
            tId: data._id,
            gameId: gameId
        }
        console.log(gameId, purchaseItem);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/registration/${data._id}`, purchaseItem, config);
            
            if(response.data.status === 200){
                const notificationData = {
                    type: "tournament_registration",
                    subject: "You’ve joined the tournament",
                    subjectPhoto: data.tournamentThumbnail,
                    invokedByName: data.tournamentName,
                    invokedById: data._id,
                    receivedByName: profile.data.userName,
                    receivedById: profile.data._id,  //this user will receive notification
                    route: `tournament/details/${data._id}`
                }

                // Send message to server
                socketN.emit("send_notification", notificationData);

                setErrorMessage(null);
                setRegDone(true);
                dispatch(setPurchasedItem(data._id));
                const destination = `/tournament/details/${data._id}/chatroom`;
                history.replace(destination);
                window.location.reload();
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTournamentDraftCreate = async (data, role) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        const draftItem = {
            tournamentName: data.tournamentName,
            category: data.category,
            masterProfile: profile.data._id,
            region: data.region,
            platforms: data.platforms,
            dates: {
                registrationStart: data.date
            }
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments`, draftItem, config);
            
            if(response.data.status === 200){
                const notificationData = {
                    type: "tournament_draft_creation",
                    subject: "You’ve created this tournament draft",
                    subjectPhoto:"https://i.ibb.co/5FFYTs7/avatar.jpg",
                    invokedByName: data.tournamentName,
                    invokedById: "645b60abe95cd95bcfad6894",
                    receivedByName: profile.data.userName,
                    receivedById: profile.data._id,  //this user will receive notification
                    route: `master/${profile.data._id}/tournaments/${response.data.data._id}`
                }

                // Send message to server
                socketN.emit("send_notification", notificationData);

                setErrorMessage(null);
                const destination = `/${role}/${profile.data._id}/tournaments`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTournamentDraftUpdate = async (data, role, status) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        const draftItem = {
            ...data,
            status: status
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/${data._id}`, draftItem, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
                const destination = `/${role}/${data._id}/tournaments`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleApprovalUpdate = async (data, role) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/approve/${data._id}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
                const destination = `/${role}/${data._id}/tournaments`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTournamentCredential = async (id, data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/credentials/${id}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
                const destination = `/master/${id}/tournaments`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTournamentResult = async (id, data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/result/${id}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
                const destination = `/master/${id}/tournaments`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTournamentDraftDelete = async (id, role) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/${id}`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
                const destination = `/${role}/${id}/tournaments`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    return {
        regDone,
        errorMessage,
        setErrorMessage,
        handleTournamentPurchase,
        handleTournamentDraftCreate,
        handleTournamentDraftUpdate,
        handleApprovalUpdate,
        handleTournamentCredential,
        handleTournamentResult,
        handleTournamentDraftDelete,
    }
}

export default useTournament;