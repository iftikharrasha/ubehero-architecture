import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGiftCards = createAsyncThunk(
    'giftcard/fetchGiftCards',
    async ({versionGiftCard}, {getState}) => {
        if(!versionGiftCard){
            versionGiftCard = 0;
        }

        try{
            const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/wallet/topup?version=${versionGiftCard}`)

            if(response.status === 200){
                const data = await response.json();
                if(data.status === 304) {
                    return {
                        data: getState().giftcards.data,
                        version: getState().giftcards.version,
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

const walletSlice = createSlice({
    name: 'giftcard',
    initialState: {
        data: null,
        wishList: [],
        version: 0,
        status: 'idle',
    },
    reducers: {
        addToGiftWishList: (state, action) => {
            state.wishList.push(action.payload);   //here we are mutating directly which wasn't possible before 'IMMER LIBRARY'
        },
        removeFromGiftWishList: (state, action) => {
            state.wishList = state.wishList.filter(t => t._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchGiftCards.fulfilled, (state, action) => {
            state.data = action.payload.data || state.data;
            state.version = action.payload.version || state.version;
            state.status = 'success';
        })
        builder.addCase(fetchGiftCards.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGiftCards.rejected, (state, action) => {
            state.status = 'error';
            console.log("rejected");
        });
    },
});

export const { addToGiftWishList, removeFromGiftWishList } = walletSlice.actions;
export default walletSlice.reducer;