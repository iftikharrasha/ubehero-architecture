import { useState } from "react";
import axios from 'axios';
import { setPurchasedItem } from "../redux/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const usePurchase = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const profile = useSelector(state => state.profile);

    const handleTournamentPurchase = async (data, method, socketN, history) => {
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
            tId: data._id
        }

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
                dispatch(setPurchasedItem(data._id));
                const destination = `/tournament/details/${data._id}/chatroom`;
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
        errorMessage,
        handleTournamentPurchase
    }
}

export default usePurchase;