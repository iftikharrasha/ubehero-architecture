import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchInternalsTournaments = createAsyncThunk(
    'internalTournament/fetchInternalsTournaments',
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
        
        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/internal/${id}?version=${versionTournaments}`, config)

        if(response.status === 200){
            const data = await response.json();
            if(data.status === 304) {
                return getState().internalTournament.data;
            }else{
                return data;
            }
        }
    }
)

const internalTournamentSlice = createSlice({
    name: 'internalTournament',
    initialState: {
        data: null,
        version: 0,
        status: 'idle',
    },
    reducers: {
        setInternalLogOut: (state, action) => {
            state.data = null;
            state.version = 0;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchInternalsTournaments.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
    },
});

export const { setInternalLogOut } = internalTournamentSlice.actions;
export default internalTournamentSlice.reducer;