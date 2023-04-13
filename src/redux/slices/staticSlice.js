import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchLanding = createAsyncThunk(
    'static/fetchLanding',
    async ({versionLanding, country}, {getState}) => {
        if(!versionLanding){
            versionLanding = 0;
        }
        if(!country){
            country = 'uk';
        }
        versionLanding = 0; //validation left

        try{
            const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/statics/landing?version=${versionLanding}&country=${country}`)

            if(response.status === 200){
                const data = await response.json();
                if(data.status === 304) {
                    return {
                        landing: getState().statics.landing,
                        version: getState().statics.version,
                        country: getState().statics.country
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

const staticSlice = createSlice({
    name: 'static',
    initialState: {
        landing: null,
        version: 0,
        country: 'uk',
        status: 'idle',
    },
    reducers: {
        changeRegion: (state, action) => {
            state.country = action.payload; 
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchLanding.fulfilled, (state, action) => {
            state.landing = action.payload.data || state.landing;
            state.version = action.payload.version || state.version;
            state.country = action.payload.country || state.country; 
            state.status = 'success';
        })
        builder.addCase(fetchLanding.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchLanding.rejected, (state, action) => {
            state.status = 'error';
            console.log("rejected");
        });
    },
});

export const { changeRegion } = staticSlice.actions;
export default staticSlice.reducer;