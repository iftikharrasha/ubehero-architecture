import { createSlice } from "@reduxjs/toolkit";

const mySiteSettingsSlice = createSlice({
    name: 'mySiteSettings',
    initialState: {
        darkMode: false,
    },
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },
    },
});

export const { setDarkMode } = mySiteSettingsSlice.actions;
export default mySiteSettingsSlice.reducer;