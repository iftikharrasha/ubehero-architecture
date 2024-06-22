import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLogIn, setRoute, addGameAccount, addIntoFriendQueue, addXpLatest , setClaimedBadge} from "../redux/slices/profileSlice";
import useNotyf from "./useNotyf";
import { syncMyTeamDetails, addTeamCreation } from "../redux/slices/teamSlice";

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
            dispatch(syncMyTeamDetails(response.data.data));
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

    const handleTeamJoiningRequestHook = async (data, receiver, team) => {
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
                dispatch(addTeamCreation(team));
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

    const handleCreateSupportTicket = async (data) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/support/${data.issuedBy}`, data, config);
            
            if(response.data.status === 200){
                const notificationData = {
                    type: "ticket_creation",
                    subject: "You’ve created a support ticket",
                    subjectPhoto:'https://cdn-icons-png.flaticon.com/512/2057/2057748.png',
                    invokedByName: 'Help Center',
                    invokedById: "645b60abe95cd95bcfad6894",
                    receivedByName: profile.data.userName,
                    receivedById: profile.data._id,  //this user will receive notification
                    route: `support/${profile.data._id}/ticket`
                }

                // Send message to server
                socketN.emit("send_notification", notificationData);
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleMyTickets = async () => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/support/${profile.data._id}`, config);
            
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

    const handleAllTickets = async () => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/support/all/${profile.data._id}`, config);
            
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

    const handleTicketDetails = async (id) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/support/thread/${id}`, config);
            
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

    const handleCreateSupportComment = async (id, issuedBy, comment) => {
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
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/support/thread/${id}`, data, config);
            
            if(response.data.status === 200){
                if(profile.role === "admin"){
                    const notificationData = {
                        type: "ticket_comment",
                        subject: "You’ve a new comment on your ticket",
                        subjectPhoto:'https://cdn-icons-png.flaticon.com/512/2057/2057748.png',
                        invokedByName: 'Help Center',
                        invokedById: "645b60abe95cd95bcfad6894",
                        receivedByName: issuedBy.userName,
                        receivedById: issuedBy._id,  //this user will receive notification
                        route: `ticket/${id}`
                    }
    
                    // Send message to server
                    socketN.emit("send_notification", notificationData);
                    setErrorMessage(null);
                }
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }

            return response.data.success
        } catch (error) {
            console.log(error);
        }
    }

    const handleSupportStatus = async (id) => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/support/status/${id}`, config);
            
            if(response.data.status === 200){
                setErrorMessage(null);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data.status
        } catch (error) {
            console.log(error);
        }
    }

    const handleTodaysGemPrice = async () => {
        let config = {}

        if(profile.signed_in){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_LINK}/api/v1/geminy/${profile.data._id}`, config);
            
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
        handleTeamMembersListHook,
        handleMyTickets,
        handleAllTickets,
        handleTicketDetails,
        handleCreateSupportTicket,
        handleCreateSupportComment,
        handleSupportStatus,
        handleTodaysGemPrice,
        // handleBadgeListHook
    }
}

export default useProfile;