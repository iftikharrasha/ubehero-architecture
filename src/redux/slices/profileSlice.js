import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProfileDetails = createAsyncThunk(
    'profile/fetchProfileDetails',
    async ({ id, version }, { getState }) => {
        if(!version){
            version = 0;
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/account/profile/${id}?version=${version}`);
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

export const { setLogIn, setLogOut, setRoute } = profileSlice.actions;
export default profileSlice.reducer;