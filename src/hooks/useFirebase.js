import { useEffect, useState } from "react";
import axios from 'axios';
import { setLogIn, setLogOut, setRoute } from "../redux/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const useFirebase = () => {
    const dispatch = useDispatch();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const isLoggedIn = useSelector(state => state.profile.signed_in);

    const handleLogin = async (data, history, location) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/account/login`, data);
    
            if(response.data.status === 200){
                localStorage.setItem('jwt', response.data.jwt);
                localStorage.setItem('refresh', response.data.refreshToken);
                dispatch(setLogIn(response.data.data));
                dispatch(setRoute("user"))

                setErrorMessage(null);
                const destination = location?.state?.from || '/';
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegistration = async (data, history) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/account/signup`, data);
    
            if(response.data.status === 200){
                setErrorMessage(null);
                const destination = '/login';
                history.replace(destination);
            }else{
                setErrorMessage(response.data.error.message);
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribed = () => {
            const token = localStorage.getItem('jwt');
            if(token) {
                const parsedAccessToken = parseJwtToken(token);

                const sub = parsedAccessToken["sub"];
                const name = parsedAccessToken["name"];
                const email = parsedAccessToken["email"];
                const photo = parsedAccessToken["photo"];
                const typ = parsedAccessToken["typ"];

                const decodedUser = {
                    id: sub,
                    name: name,
                    email: email,
                    isSignedIn: true,
                    photo: photo,
                    permissions: typ,
                }
                setLoggedInUser(decodedUser);
            } else {
                setLoggedInUser({})
            }
        };
        unsubscribed();
        return unsubscribed;
    }, [isLoggedIn])

    const parseJwtToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }

    const handlelogOut = (history) => {
        dispatch(setLogOut())
        setLoggedInUser({});
        localStorage.removeItem('jwt');
        localStorage.removeItem('refresh');
        history.push('/');
    }

    return {
        errorMessage,
        loggedInUser,
        handlelogOut,
        handleLogin,
        handleRegistration
    }
}

export default useFirebase;