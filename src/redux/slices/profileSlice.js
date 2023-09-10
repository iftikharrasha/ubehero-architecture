import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
            // const index = state.data.gameAccounts.findIndex(t => t._id === action.payload._id)
            // if(index === -1){
            //     state.data.gameAccounts[0] = action.payload;
            // }else{
            //     state.data.gameAccounts.push(action.payload);
            // }
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

        // builder.addCase(fetchTournaments.pending, (state) => {
        //     state.status = 'pending';
        // })

        // builder.addCase(fetchTournaments.rejected, (state) => {
        //     state.status = 'error';
        // })
    },
});

export const { setLogIn, setLogOut, setRoute, setRole, setPurchasedItem, addGameAccount } = profileSlice.actions;
export default profileSlice.reducer;