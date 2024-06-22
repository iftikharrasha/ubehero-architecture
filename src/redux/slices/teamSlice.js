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
);

export const fetchTeamDetails = createAsyncThunk(
    'myTeam/fetchTeamDetails',
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

const myTeamSlice = createSlice({
    name: 'myTeam',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        syncMyTeamDetails: (state, action) => {
            const index = state.data.findIndex(t => t._id === action.payload._id);
            if(index !== -1){
                state.data[index] = action.payload || state.data;
            }
        },
        setTeamReset: (state, action) => {
            state.data = [];
            state.version = 0;
            state.status = 'idle';
        },
        addTeamCreation: (state, action) => {
            state.data.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTeamDetails.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
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

export const { syncMyTeamDetails, setTeamReset, addTeamCreation } = myTeamSlice.actions;
export default myTeamSlice.reducer;