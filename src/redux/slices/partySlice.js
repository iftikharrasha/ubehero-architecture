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
        
        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/party/profile?version=${versionParty}`, config)

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

export const fetchPartyDetails = createAsyncThunk(
    'party/fetchPartyDetails',
    async ({ id, versionParty }, { getState }) => {
        if(!versionParty || getState().parties.data.length === 0){
            versionParty = 0;
        }
        
        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/party/${id}?version=${0}`, config);
        const data = await response.json();

        if(data.status === 304) {
            const party = getState().parties.data.find(p => p._id === id);
            const details = {
                "success": true,
                "status": 304,
                "version": party.version,
                "data": party,
            }
            return details;
        } else{
            return data;
        }
    }
);

export const fetchPartySocialPosts = createAsyncThunk(
    'party/fetchPartySocialPosts',
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

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/party/socials/${id}?version=0`, config);
        const data = await response.json();

        if(data.status === 304) {
            return getState().party.social;
        } else{
            return data;
        }
    }
);

const partiesSlice = createSlice({
    name: 'party',
    initialState: {
        data: [],
        social: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        addUserRequestToPartyService: (state, action) => {
            const { pId, uId } = action.payload;
            const party = state.data.find(p => p._id === pId);
            console.log(pId, uId, party)
            if (party) {
                // Check if the ID is not already in the pending array
                if (!party.members.requested.includes(uId)) {
                    party.members.requested = [...party.members.requested, uId];
                }
            }
        },
        addReactsIntoPost: (state, action) => {
            const { to, from, type } = action.payload;
            const party = state.social.posts.find(p => p._id === to);
      
            switch (type) {
                case '+':
                    if (!party.reacts.likes.includes(from)) {
                        party.reacts.likes.push(from);
                    }
                    if (party.reacts.dislikes.includes(from)) {
                        party.reacts.dislikes = party.reacts.dislikes.filter(id => id !== from);
                    }
                    break;
                case '-':
                    if (!party.reacts.dislikes.includes(from)) {
                        party.reacts.dislikes.push(from);
                    }
                    if (party.reacts.likes.includes(from)) {
                        party.reacts.likes = party.reacts.likes.filter(id => id !== from);
                    }
                    break;
                default:
                    // Handle unknown types or do nothing
                    break;
            }
        },
        setPartyReset: (state, action) => {
            state.data = [];
            state.social = [];
            state.version = 0;
            state.status = 'idle';
        },
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
        builder.addCase(fetchPartyDetails.fulfilled, (state, action) => {
            const index = state.data.findIndex(p => p._id === action.meta.arg.id)
            if(index === -1){
                state.data[0] = action.payload.data || state.data;
            }else{
                state.data[index] = action.payload.data || state.data;
            }
            state.status = 'success';
        })
        builder.addCase(fetchPartySocialPosts.fulfilled, (state, action) => {
            state.social = action.payload.data || state.social;
            state.status = 'success';
        })
    },
});

export const { addUserRequestToPartyService, addReactsIntoPost, setPartyReset } = partiesSlice.actions;
export default partiesSlice.reducer;