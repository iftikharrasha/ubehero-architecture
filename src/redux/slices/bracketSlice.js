import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBrackets = createAsyncThunk(
    'bracket/fetchBrackets',
    async ({ id, versionBracket }, { getState, dispatch }) => {
        if(!versionBracket || getState().tournaments.data.length === 0){
            versionBracket = 0;
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/tournaments/bracket/${id}?version=${versionBracket}`);
        const data = await response.json();


        if(data.status === 304) {
            return getState().brackets.data;
        } else{
            dispatch(setBracket({ tournamentId: id, bracketData: data.data }));
            return data;
        }
    }
);

const bracketdSlice = createSlice({
    name: 'bracket',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        setBracket: (state, action) => {
            const { tournamentId, bracketData } = action.payload;
            state.data = { ...state.data, [tournamentId]: bracketData };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchBrackets.fulfilled, (state, action) => {
            const { id, bracketData } = action.payload;
            state.data = { ...state.data, [id]: bracketData };
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

export const { setBracket } = bracketdSlice.actions;
export default bracketdSlice.reducer;