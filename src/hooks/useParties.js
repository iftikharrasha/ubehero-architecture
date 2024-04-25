import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useNotyf from "./useNotyf";
import { addUserRequestToPartyService } from "../redux/slices/partySlice";

const useParties = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const profile = useSelector(state => state.profile);
    const actingAs = useSelector(state => state.profile.actingAs);
    const history = useHistory();

    //just for testing purposes for notifications
    const jwt = localStorage.getItem("jwt");
    const { socketN } = useNotyf(profile.data, jwt);

    const handlePartyCreate = async (data, role) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        const draftItem = {
            ...data,
            owner: profile.data._id
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/party`, draftItem, config);
            
            if(response.data.status === 200){
                const notificationData = {
                    type: "party_creation",
                    subject: "You’ve created this party",
                    subjectPhoto:response.data.data.photo,
                    invokedByName: data.title,
                    invokedById: "645b60abe95cd95bcfad6894",
                    receivedByName: profile.data.userName,
                    receivedById: profile.data._id,  //this user will receive notification
                    // route: `master/${profile.data._id}/parties/${response.data.data._id}`
                    route: `profile/${profile.data._id}`
                }

                // Send message to server
                socketN.emit("send_notification", notificationData);

                setErrorMessage(null);
                const destination = `/${role}/${profile.data._id}/parties`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handlePartyEventListHook = async (pid) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/party/events/${pid}?version=0`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    const handlePartyJoin = async (data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/party/${data.partyId}`, data, config);
            
            if(response.data.status === 200){
                // const notificationData = {
                //     type: "party_join",
                //     subject: "You’ve requested to join the party",
                //     subjectPhoto:response.data.data.photo,
                //     invokedByName: response.data.data.title,
                //     invokedById: "645b60abe95cd95bcfad6894",
                //     receivedByName: profile.data.userName,
                //     receivedById: profile.data._id,  //this user will receive notification
                //     route: `party/details/${response.data.data._id}`
                // }

                // // Send message to server
                // socketN.emit("send_notification", notificationData);
                setErrorMessage(null);

                //also add to redux user profile
                const pId = response.data.data._id;
                const uId = profile.data._id;
                console.log("hook", pId, uId)
                dispatch(addUserRequestToPartyService({pId, uId}));
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handlePartyJoinApprove = async (pId, type, data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_LINK}/api/v1/party/${pId}?type=${type}`, data, config);
            
            if(response.data.status === 200){
                // // const notificationData = {
                // //     type: "party_join",
                // //     subject: "You’ve requested to join the party",
                // //     subjectPhoto:response.data.data.photo,
                // //     invokedByName: response.data.data.title,
                // //     invokedById: "645b60abe95cd95bcfad6894",
                // //     receivedByName: profile.data.userName,
                // //     receivedById: profile.data._id,  //this user will receive notification
                // //     route: `party/details/${response.data.data._id}`
                // // }

                // // // Send message to server
                // // socketN.emit("send_notification", notificationData);
                // setErrorMessage(null);

                // //also add to redux user profile
                // const pId = response.data.data._id;
                // const uId = profile.data._id;
                // console.log("hook", pId, uId)
                // dispatch(addUserRequestToPartyService({pId, uId}));
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetPartySocialPostComments = async (id, postId) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/party/comments/${id}?version=0&postId=${postId}`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }

            return response.data.data[0].comments
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreatePartySocialComment = async (id, postId, comment) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        const data = {
            author: profile.data._id,
            comment: comment
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/party/comments/${id}?version=0&postId=${postId}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }

            console.log(response.data)
            console.log(response.data.data.comments)

            return response.data.success
        } catch (error) {
            console.log(error);
        }
    }

    const handlePostReactService = async (id, data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/party/reacts/${id}?postId=${data.to}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }

            return true
        } catch (error) {
            console.log(error);
        }
    }

    const handlePartyPeopleListHook = async (pId) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/party/people/${pId}`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    const handlePartiesList = async () => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/party?version=0`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleMasterPartiesList = async () => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/party/master?version=0`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    const handlePartiesYouMayKnowList = async (id) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/party/related/${id}?version=0`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    return {
        actingAs,
        errorMessage,
        handlePartyCreate,
        handlePartyJoin,
        handlePartyJoinApprove,
        handlePartyEventListHook,
        handlePartyPeopleListHook,
        handleGetPartySocialPostComments,
        handleCreatePartySocialComment,
        handlePostReactService,
        handlePartiesList,
        handleMasterPartiesList,
        handlePartiesYouMayKnowList
    }
}

export default useParties;