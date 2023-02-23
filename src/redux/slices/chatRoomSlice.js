import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchChatRoom = createAsyncThunk(
    'chatroom/fetchChatRoom',
    async ({ id, versionChatroom }, { getState, dispatch }) => {
        if(!versionChatroom || getState().tournaments.data.length === 0){
            versionChatroom = 0;
        }

        const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/tournament/chatroom/${id}?version=${versionChatroom}`);
        const data = await response.json();


        if(data.status === 304) {
            return getState().leaderboards.data;
        } else{
            dispatch(setChatroom({ tournamentId: id, chatroomData: data.data }));
            return data;
        }
    }
);


const chatRoomSlice = createSlice({
    name: 'chatroom',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        setChatroom: (state, action) => {
            const { tournamentId, chatroomData } = action.payload;
            state.data = { ...state.data, [tournamentId]: chatroomData };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchChatRoom.fulfilled, (state, action) => {
            const { id, chatroomData } = action.payload;
            state.data = { ...state.data, [id]: chatroomData };
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

export const { setChatroom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;