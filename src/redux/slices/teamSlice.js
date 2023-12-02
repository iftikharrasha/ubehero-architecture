import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMyTeams = createAsyncThunk(
    'myTeam/fetchMyTeams',
    async ({ id, versionTeams}, {getState}) => {
        if(!versionTeams){
            versionTeams = 0;
        }

        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try{
            const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/teams/my/${id}?version=${versionTeams}`, config)

            if(response.status === 200){
                const data = await response.json();
                if(data.status === 304) {
                    return {
                        data: getState().myTeams.data,
                        version: getState().myTeams.version,
                    };
                }else{
                    return data;
                }
            }
        }catch(e){
            console.log(e);
        }
    }
)

const myTeamSlice = createSlice({
    name: 'myTeam',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        setTeamReset: (state, action) => {
            state.data = [];
            state.version = 0;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchMyTeams.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
        builder.addCase(fetchMyTeams.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchMyTeams.rejected, (state, action) => {
            state.status = 'error';
            console.log("rejected");
        });
    },
});

export const { setTeamReset } = myTeamSlice.actions;
export default myTeamSlice.reducer;