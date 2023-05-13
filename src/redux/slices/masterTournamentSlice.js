import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMastersTournaments = createAsyncThunk(
    'masterTournament/fetchMastersTournaments',
    async ({id, versionTournaments}, {getState}) => {
        if(!versionTournaments){
            versionTournaments = 0;
        }
        
        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/master/${id}?version=${versionTournaments}`, config)

        if(response.status === 200){
            const data = await response.json();
            if(data.status === 304) {
                return getState().masterTournament.data;
            }else{
                return data;
            }
        }
    }
)

const masterTournamentSlice = createSlice({
    name: 'masterTournament',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        addToTournamentsList: (state, action) => {
            state.data.push(action.payload);
        },
        updateTournamentsDetails: (state, action) => {
            console.log("index", action.payload)
            const index = state.data.findIndex(t => t._id === action.payload._id)
            if (index !== -1) {
                state.data[index] = {...action.payload};
            }
        },
        deleteTournamentsDetails: (state, action) => {
            state.data = state.data.filter(t => t._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchMastersTournaments.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
    },
});

export const { addToWishList, removeFromWishList, addToTournamentsList, updateTournamentsDetails, deleteTournamentsDetails } = masterTournamentSlice.actions;
export default masterTournamentSlice.reducer;