import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchStatics = createAsyncThunk(
    'static/fetchStatics',
    async ({versionLanding, country}, {getState}) => {
        if(!versionLanding){
            versionLanding = 0;
        }
        if(!country){
            country = 'uk';
        }

        //validation left need to update the api and redux
        versionLanding = 0;

        try{
            const response = await fetch(`${process.env.REACT_APP_API_LINK}/api/v1/statics?version=${versionLanding}&country=${country}`)

            if(response.status === 200){
                const data = await response.json();
                if(data.status === 304) {
                    return {
                        landing: getState().statics.landing,
                        refs: getState().statics.refs,
                        games: getState().statics.games,
                        platforms: getState().statics.platforms,
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
        refs: null,
        games: [],
        platforms: [],
        country: 'uk',
        version: 0,
        status: 'idle',
    },
    reducers: {
        changeRegion: (state, action) => {
            state.country = action.payload; 
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchStatics.fulfilled, (state, action) => {
            state.landing = action.payload.data.countryData || state.landing;
            state.refs = action.payload.data.refs || state.refs;
            state.games = action.payload.data.games || state.games;
            state.platforms = action.payload.data.platforms || state.platforms;
            state.version = action.payload.version || state.version;
            state.country = action.payload.country || state.country; 
            state.status = 'success';
        })
        builder.addCase(fetchStatics.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchStatics.rejected, (state, action) => {
            state.status = 'error';
            console.log("rejected");
        });
    },
});

export const { changeRegion } = staticSlice.actions;
export default staticSlice.reducer;