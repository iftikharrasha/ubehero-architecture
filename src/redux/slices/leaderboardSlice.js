import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchLeaderboards = createAsyncThunk(
    'leaderboard/fetchLeaderboards',
    async ({ id, versionLeaderboard }, { getState, dispatch }) => {
        if(!versionLeaderboard || getState().tournaments.data.length === 0){
            versionLeaderboard = 0;
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournament/leaderboards/${id}?version=${versionLeaderboard}`);
        const data = await response.json();


        if(data.status === 304) {
            return getState().leaderboards.data;
        } else{
            dispatch(setLeaderboard({ tournamentId: id, leaderboardData: data.data }));
            return data;
        }
    }
);


const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        setLeaderboard: (state, action) => {
            const { tournamentId, leaderboardData } = action.payload;
            state.data = { ...state.data, [tournamentId]: leaderboardData };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchLeaderboards.fulfilled, (state, action) => {
            const { id, leaderboardData } = action.payload;
            state.data = { ...state.data, [id]: leaderboardData };
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

export const { setLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;