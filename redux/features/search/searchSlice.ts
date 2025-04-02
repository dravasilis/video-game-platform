import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    isPressed: boolean;
}

const initialState: SearchState = {
    isPressed: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchPressed: (state, action: PayloadAction<boolean>) => {
            state.isPressed = action.payload;
        },
        toggleSearch: (state) => {
            state.isPressed = !state.isPressed;
        },
    },
});

export const { setSearchPressed, toggleSearch } = searchSlice.actions;
export default searchSlice.reducer;
