import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTournaments = createAsyncThunk(
    'tournament/fetchTournaments',
    async ({versionTournaments}, {getState}) => {
        if(!versionTournaments){
            versionTournaments = 0;
        }
        
        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments?version=${versionTournaments}`, config)

        if(response.status === 200){
            const data = await response.json();
            if(data.status === 304) {
                return getState().tournaments.data;
            }else{
                return data;
            }
        }
    }
)

// export const fetchTournaments = createAsyncThunk(
//     'tournament/fetchTournaments',
//     async ({versionTournaments, status, masterProfile}, {getState}) => {
//         if(!versionTournaments){
//             versionTournaments = 0;
//         }
        
//         const isLoggedIn = getState().profile.signed_in;
//         const role = getState().profile.role;
//         const _id = getState().profile.data._id
        
//         let config = {}
//         const query = {};
//         let response = [];

//         if(role === "admin"){
//             response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/by?version=${versionTournaments}`, config)
//         }else if(role === "master"){
//             response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/by?version=${versionTournaments}&masterProfile=${_id}`, config)
//         }else{
//             response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/by?version=${versionTournaments}&status=active`, config)
//         }

//         if (versionTournaments) {
//             query.version = versionTournaments;
//         }

//         if (status) {
//             query.status = status;
//         }
    
//         if (masterProfile) {
//             query.masterProfile = masterProfile;
//         }

//         if(isLoggedIn){
//             const token = localStorage.getItem('jwt');
//             config.headers = { "Authorization": "Bearer " + token, ...config.headers};
//         }

//         if(response.status === 200){
//             const data = await response.json();
//             if(data.status === 304) {
//                 return getState().tournaments.data;
//             }else{
//                 return data;
//             }
//         }
//     }
// )

export const fetchTournamentDetails = createAsyncThunk(
    'tournament/fetchTournamentDetails',
    async ({ id, versionTournament }, { getState }) => {
        if(!versionTournament || getState().tournaments.data.length === 0){
            versionTournament = 0;
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/${id}?version=${versionTournament}`);
        const data = await response.json();

        if(data.status === 304) {
            const tournament = getState().tournaments.data.find(t => t._id === id);
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


//extra need to work on
// export const updateTournament = (tournament) => (dispatch, getState) => {
//     const tournaments = [...getState().tournaments.data];
//     const index = tournaments.findIndex(t => t._id === tournament._id);
//     tournaments[index] = tournament;
//     dispatch(updateTournaments(tournaments));
// }

// export const updateTournaments = (tournaments) => ({
//     type: 'tournament/updateTournaments',
//     payload: tournaments,
// });


const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: {
        data: [],
        wishList: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        addToWishList: (state, action) => {
            state.wishList.push(action.payload);   //here we are mutating directly which wasn't possible before 'IMMER LIBRARY'
        },
        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter(t => t._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTournaments.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })

        builder.addCase(fetchTournamentDetails.fulfilled, (state, action) => {
            const index = state.data.findIndex(t => t._id === action.meta.arg.id)
            if(index === -1){
                state.data[0] = action.payload.data || state.data;
            }else{
                state.data[index] = action.payload.data || state.data;
            }
            // state.version = action.payload.version || state.version;
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

export const { addToWishList, removeFromWishList } = tournamentSlice.actions;
export default tournamentSlice.reducer;