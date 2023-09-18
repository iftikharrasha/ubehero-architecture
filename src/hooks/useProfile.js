import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLogIn, setRoute, addGameAccount, addIntoFriendQueue } from "../redux/slices/profileSlice";
import useNotyf from "./useNotyf";

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
                            receivedById: receiver.key, 
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
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
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
            const response = await axios.patch(`${process.env.REACT_APP_API_LINK}/api/v1/account/profile/${data._id}`, data, config);
            
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

    return {
        actingAs,
        errorMessage,
        handleSwitchProfile,
        handleProfileDraftUpdate,
        handleGameAccountAdd,
        handleFriendRequestHook,
    }
}

export default useProfile;