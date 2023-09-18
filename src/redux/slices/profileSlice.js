import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIpInfo = createAsyncThunk(
    'profile/fetchIpInfo', 
    async ({version}, {getState}) => {
    // if(!version){
    //     version = 0;
    // }
    try {
        const ipResponse = await axios.get('https://api64.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;
        
        const apiUrl = `https://ipinfo.io/${ipAddress}/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`;
    
        // Make an HTTP GET request to the ipinfo.io API using axios
        const response = await axios.get(apiUrl);

        if(response.data.privacy.vpn){
            console.log("isVpn", response.data.privacy.vpn);
            return {
                intel: getState().profile.intel,
                vpn: response.data.privacy.vpn,
            };
        }else{
            console.log("isVpn", response.data.privacy.vpn);
            const data = {
                intel: {
                    ip: response.data.ip,
                    coordinates: response.data.loc,
                    city: response.data.city,
                    region: response.data.region,
                    country: response.data.country,
                    timezone: response.data.timezone,
                    vpn: response.data.privacy.vpn,
                },
                vpn: response.data.privacy.vpn,
            }
        
            return data;
        }
      } catch (error) {
        throw error;
      }
  });

export const fetchProfileDetails = createAsyncThunk(
    'profile/fetchProfileDetails',
    async ({ id, version }, { getState }) => {
        if(!version){
            version = 0;
        }

        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/account/profile/${id}?version=${version}`, config);
        const data = await response.json();

        if(data.status === 304) {
            return getState().profile.data;
        } else{
            return data;
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: null,
        version: 0,
        signed_in: false,
        actingAs: "user",
        role: "user",
        status: 'idle',
        vpn: false,
        intel: null,
    },
    reducers: {
        setLogIn: (state, action) => {
            state.data = action.payload || state.data;
            state.signed_in = true;
        },
        setLogOut: (state, action) => {
            state.data = null;
            state.version = 0;
            state.signed_in = false;
            state.status = 'idle';
        },
        setRoute: (state, action) => {
            state.actingAs = action.payload || state.actingAs;
        },
        setRole: (state, action) => {
            state.role = action.payload || state.role;
        },
        setPurchasedItem: (state, action) => {
            let payloadArray = [action.payload];
            state.data.purchasedItems.tournaments = payloadArray;
        },
        addGameAccount: (state, action) => {
            state.data.gameAccounts.push(action.payload);
        },
        addIntoFriendQueue: (state, action) => {
            const { from, to, type } = action.payload;
      
            switch (type) {
                case 'friend_request_send':
                    if (!state.data.requests.friend.sent.includes(to)) {
                        state.data.requests.friend.sent.push(to);
                    }
                    break;
                case 'friend_request_accept':
                    state.data.requests.friend.pending = state.data.requests.friend.pending.filter(id => id !== to);
                    if (!state.data.requests.friend.mutuals.includes(to)) {
                        state.data.requests.friend.mutuals.push(to);
                    }
                    break;
                case 'friend_request_reject':
                    state.data.requests.friend.pending = state.data.requests.friend.pending.filter(id => id !== to);
                    break;
                case 'friend_request_unfriend':
                    state.data.requests.friend.mutuals = state.data.requests.friend.mutuals.filter(id => id !== to);
                    break;
                default:
                    // Handle unknown types or do nothing
                    break;
            }
        },
        addToPendingFriendList: (state, action) => {
            const id = action.payload;
  
            // Check if the ID is not already in the pending array
            if (!state.data.requests.friend.pending.includes(id)) {
                state.data.requests.friend.pending.push(id);
            }
        },
        addToMutualFriendList: (state, action) => {
            const from = action.payload;
  
            state.data.requests.friend.pending = state.data.requests.friend.pending.filter(id => id !== from);
            // Check if the ID is not already in the pending array
            if (!state.data.requests.friend.mutuals.includes(from)) {
                state.data.requests.friend.mutuals.push(from);
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProfileDetails.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.signed_in = true;
            state.status = 'success';
        })
        builder.addCase(fetchIpInfo.fulfilled, (state, action) => {
          state.status = 'success';
          state.intel = action.payload.intel;
          state.vpn = action.payload.vpn;
        })

        // builder.addCase(fetchTournaments.pending, (state) => {
        //     state.status = 'pending';
        // })

        // builder.addCase(fetchTournaments.rejected, (state) => {
        //     state.status = 'error';
        // })
    },
});

export const { setLogIn, setLogOut, setRoute, setRole, setPurchasedItem, addGameAccount, addIntoFriendQueue, addToPendingFriendList, addToMutualFriendList } = profileSlice.actions;
export default profileSlice.reducer;