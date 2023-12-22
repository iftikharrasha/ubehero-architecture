import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchParties = createAsyncThunk(
    'party/fetchParties',
    async ({versionParty}, {getState}) => {
        if(!versionParty){
            versionParty = 0;
        }
        
        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/party?version=${versionParty}`, config)

        if(response.status === 200){
            const data = await response.json();
            if(data.status === 304) {
                return getState().parties.data;
            }else{
                return data;
            }
        }
    }
)

const partiesSlice = createSlice({
    name: 'party',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    extraReducers: (builder) => {
        builder.addCase(fetchParties.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
        builder.addCase(fetchParties.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchParties.rejected, (state, action) => {
            state.status = 'error';
            console.log("rejected");
        });
    },
});

export default partiesSlice.reducer;