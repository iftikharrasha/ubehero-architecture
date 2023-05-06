import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMyTransactions = createAsyncThunk(
    'myTransaction/fetchMyTransactions',
    async ({ id, versionTransactions}, {getState}) => {
        if(!versionTransactions){
            versionTransactions = 0;
        }

        const isLoggedIn = getState().profile.signed_in;
        let config = {}

        if(isLoggedIn){
            const token = localStorage.getItem('jwt');
            config.headers = { "Authorization": "Bearer " + token, ...config.headers};
        }

        try{
            const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/wallet/transactions/${id}?version=${versionTransactions}`, config)

            if(response.status === 200){
                const data = await response.json();
                if(data.status === 304) {
                    return {
                        data: getState().myTransactions.data,
                        version: getState().myTransactions.version,
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

const myTransactionSlice = createSlice({
    name: 'myTransaction',
    initialState: {
        data: [],
        version: 0,
        status: 'idle',
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchMyTransactions.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
        builder.addCase(fetchMyTransactions.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchMyTransactions.rejected, (state, action) => {
            state.status = 'error';
            console.log("rejected");
        });
    },
});

export default myTransactionSlice.reducer;