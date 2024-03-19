import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLogIn, setRoute, addGameAccount, addIntoFriendQueue, addXpLatest , setClaimedBadge} from "../redux/slices/profileSlice";
import useNotyf from "./useNotyf";
import { addTeamCreation } from "../redux/slices/teamSlice";
import { addUserRequestToPartyService } from "../redux/slices/partySlice";

const useProfile = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const profile = useSelector(state => state.profile);
    const actingAs = useSelector(state => state.profile.actingAs);
    const history = useHistory();

    //just for testing purposes for notifications
    const jwt = localStorage.getItem("jwt");
    const { socketN } = useNotyf(profile.data, jwt);

    const handleSwitchProfile = (e, role) => {
      let destination;
      if(role === "admin"){
          dispatch(setRoute("admin"))
          destination = `/internal/${profile.data._id}`;
      }else if(role === "master"){
          dispatch(setRoute("master"))
          destination = `/master/${profile.data._id}`;
      }else{
          dispatch(setRoute("user"))
          destination = `/profile/${profile.data._id}`;
      }
      history.replace(destination);
    }

    const handleGameAccountAdd = async (data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/account/gameaccount/${data.uId}`, data, config);
            
            if(response.data.status === 200){
                const notificationData = {
                    type: "gameaccount_creation",
                    subject: "You’ve created this game account",
                    subjectPhoto:response.data.data.accountLogo,
                    invokedByName: response.data.data.playerIgn,
                    invokedById: "645b60abe95cd95bcfad6894",
                    receivedByName: profile.data.userName,
                    receivedById: profile.data._id,  //this user will receive notification
                    route: `profile/${profile.data._id}/gameaccounts`
                }

                // Send message to server
                socketN.emit("send_notification", notificationData);
                setErrorMessage(null);

                //also add to redux user profile
                dispatch(addGameAccount(response.data.data));
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleVerifyTeamMemberAdd = async (data, category) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/account/verifyTeamMemberAdd/${profile.data._id}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTeamsList = async (pid) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/teams?version=0`, config);
            
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

    const handleTeamCreation = async (data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/teams`, data, config);
            console.log(response.data.data.members.invited)
            
            if(response.data.status === 200){
                const notificationData = {
                    type: "team_creation",
                    subject: "You’ve created this team",
                    subjectPhoto:response.data.data.photo,
                    invokedByName: response.data.data.teamName,
                    invokedById: "645b60abe95cd95bcfad6894",
                    receivedByName: profile.data.userName,
                    receivedById: profile.data._id,  //this user will receive notification
                    route: `team/${response.data.data._id}`
                }

                // Send message to server
                socketN.emit("send_notification", notificationData);

                //send the invited players notification as well.
                response.data.data.members.invited.forEach((invited) => {
                    const notificationData = {
                        type: "team_creation",
                        subject: "You’re invited to join this team",
                        subjectPhoto:response.data.data.photo,
                        invokedByName: response.data.data.teamName,
                        invokedById: "645b60abe95cd95bcfad6894",
                        receivedByName: profile.data.userName,
                        receivedById: invited._id,  //this user will receive notification
                        route: `team/${response.data.data._id}`
                    }

                    // Send message to server
                    socketN.emit("send_notification", notificationData);
                })

                setErrorMessage(null);

                //also add to redux user profile
                dispatch(addTeamCreation(response.data.data));
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTeamDetails = async (id) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/teams/${id}?version=0`, config);
            console.log("1. response", response);
            
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

    const handleTeamActivation = async (data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_LINK}/api/v1/teams/${data._id}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleFriendRequestHook = async (data, receiver) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/account/friend/${data.from}`, data, config);
            
            if(response.data.status === 200){
                let notificationData = null;
                switch (data.type) {
                    case 'friend_request_send':
                        notificationData = {
                            type: data.type,
                            subject: "Sent you a friend request",
                            subjectPhoto: profile?.data?.photo,
                            invokedByName: profile?.data?.userName,
                            invokedById: profile?.data?._id,
                            receivedByName: receiver.userName,
                            receivedById: receiver._id, 
                            route: `profile/${profile?.data?._id}`
                        }
                        // Send message to server
                        socketN.emit("send_notification", notificationData);
                        break;
                    case 'friend_request_accept':
                        notificationData = {
                            type: data.type,
                            subject: "Accepted your friend request",
                            subjectPhoto: profile?.data?.photo,
                            invokedByName: profile?.data?.userName,
                            invokedById: profile?.data?._id,
                            receivedByName: receiver.invokedByName,
                            receivedById: receiver.invokedById, 
                            route: `profile/${profile?.data?._id}`
                        }
                        // Send message to server
                        socketN.emit("send_notification", notificationData);
                        break;
                    default:
                        // Handle unknown types or do nothing
                        break;
                }
                setErrorMessage(null);
                dispatch(addIntoFriendQueue(response.data.data));
                console.log("xp", response);
                if(response.data.xp){
                    dispatch(addXpLatest(response.data.xp));
                }
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleTeamJoiningRequestHook = async (data, receiver) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/teams/members/${data.from}`, data, config);
            console.log(response.data)
            
            if(response.data.status === 200){
                let notificationData = null;
                switch (data.type) {
                    case 'invite_request_accept':
                        notificationData = {
                            type: data.type,
                            subject: "Accepted your team join invitation",
                            subjectPhoto: profile?.data?.photo,
                            invokedByName: profile?.data?.userName,
                            invokedById: profile?.data?._id,
                            receivedByName: receiver.userName,
                            receivedById: receiver._id, 
                            route: `team/${data.to}`
                        }
                        // Send message to server
                        socketN.emit("send_notification", notificationData);
                        break;
                    // case 'friend_request_accept':
                    //     notificationData = {
                    //         type: data.type,
                    //         subject: "Accepted your friend request",
                    //         subjectPhoto: profile?.data?.photo,
                    //         invokedByName: profile?.data?.userName,
                    //         invokedById: profile?.data?._id,
                    //         receivedByName: receiver.invokedByName,
                    //         receivedById: receiver.invokedById, 
                    //         route: `profile/${profile?.data?._id}`
                    //     }
                    //     // Send message to server
                    //     socketN.emit("send_notification", notificationData);
                    //     break;
                    default:
                        // Handle unknown types or do nothing
                        break;
                }
                setErrorMessage(null);
                console.log("xp", response);
                if(response.data.xp){
                    dispatch(addXpLatest(response.data.xp));
                }
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleFriendListHook = async () => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/account/friend/${profile.data._id}`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.data.requests
        } catch (error) {
            console.log(error);
        }
    }

    const handleClaimingBadgetHook = async (badge) => {
        console.log(badge);
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/account/badgeclaim/${badge.slag}/${profile.data._id}`, config);
            console.log("4. response", response);
            
            if(response.data.status === 200){
                console.log("5. response.data", response.data);
                dispatch(setClaimedBadge(response.data.data));
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleProfileDraftUpdate = async (data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/account/profile/${data._id}`, data, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
                dispatch(setLogIn(response.data.data));
                const destination = `/profile/${data._id}`;
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

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

    const handlePartySocialPosts = async (id) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/party/socials/${id}?version=0`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }

            return response.data.data[0].posts
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

    const handleTeamMembersListHook = async (tId) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/teams/members/${tId}`, config);
            
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
        handleSwitchProfile,
        handleProfileDraftUpdate,
        handleTeamActivation,
        handleGameAccountAdd,
        handleTeamCreation,
        handleTeamsList,
        handleTeamDetails,
        handleTeamJoiningRequestHook,
        handleVerifyTeamMemberAdd,
        handleFriendRequestHook,
        handleFriendListHook,
        handleClaimingBadgetHook,
        handlePartyCreate,
        handlePartyJoin,
        handlePartyEventListHook,
        handlePartyPeopleListHook,
        handlePartySocialPosts,
        handleGetPartySocialPostComments,
        handleTeamMembersListHook,
        // handleBadgeListHook
    }
}

export default useProfile;