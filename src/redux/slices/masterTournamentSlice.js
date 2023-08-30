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
                return getState().masterTournaments.data;
            }else{
                return data;
            }
        }
    }
);

export const fetchMastersTournamentDetails = createAsyncThunk(
    'masterTournament/fetchMastersTournamentDetails',
    async ({ tId, versionTournament }, { getState }) => {
        if(!versionTournament || getState().masterTournaments.data.length === 0){
            versionTournament = 0;
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/${tId}?version=${versionTournament}`);
        const data = await response.json();

        if(data.status === 304) {
            const tournament = getState().masterTournaments.data.find(t => t._id === tId);
            // console.log(tournament);
            const details = {
                "success": true,
                "status": 304,
                "version": tournament.version,
                "data": tournament,
            }
            return details;
        } else{
            return data;
        }
    }
);

const masterTournamentSlice = createSlice({
    name: 'masterTournament',
    initialState: {
        data: null,
        version: 0,
        status: 'idle',
    },
    reducers: {
        setMasterLogOut: (state, action) => {
            state.data = null;
            state.version = 0;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchMastersTournaments.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
        builder.addCase(fetchMastersTournamentDetails.fulfilled, (state, action) => {
            const index = state.data.findIndex(t => t._id === action.meta.arg.tId)
            if(index === -1){
                state.data[0] = action.payload.data || state.data;
            }else{
                state.data[index] = action.payload.data || state.data;
            }
            // state.version = action.payload.version || state.version;
            state.status = 'success';
        })
    },
});

export const { setMasterLogOut } = masterTournamentSlice.actions;
export default masterTournamentSlice.reducer;