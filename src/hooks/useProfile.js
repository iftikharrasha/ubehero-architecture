import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLogIn, setRoute } from "../redux/slices/profileSlice";

const useProfile = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const profile = useSelector(state => state.profile);
    const actingAs = useSelector(state => state.profile.actingAs);
    const history = useHistory();

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
    }
}

export default useProfile;