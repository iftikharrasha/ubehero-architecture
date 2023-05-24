import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchInternalsUsers = createAsyncThunk(
    'internalUser/fetchInternalsUsers',
    async ({id, versionUsers}, {getState}) => {
        if(!versionUsers){
            versionUsers = 0;
        }
        
        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/account/list/${id}?version=${versionUsers}`, config)

        if(response.status === 200){
            const data = await response.json();
            if(data.status === 304) {
                return getState().internalUser.data;
            }else{
                return data;
            }
        }
    }
)

const internalUsersSlice = createSlice({
    name: 'internalUser',
    initialState: {
        data: null,
        version: 0,
        status: 'idle',
    },
    reducers: {
        setInternalUserBlackOut: (state, action) => {
            state.data = null;
            state.version = 0;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchInternalsUsers.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
    },
});

export const { setInternalUserBlackOut } = internalUsersSlice.actions;
export default internalUsersSlice.reducer;