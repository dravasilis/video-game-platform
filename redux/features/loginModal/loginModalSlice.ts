import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginModalState {
    triggerOpen: boolean;
}

const initialState: LoginModalState = {
    triggerOpen: false,
};

const loginModalSlice = createSlice({
    name: "loginModal",
    initialState,
    reducers: {
        setLoginModalOpen: (state, action: PayloadAction<boolean>) => {
            state.triggerOpen = action.payload;
        }
    },
});

export const { setLoginModalOpen } = loginModalSlice.actions;
export const selectLoginModalStatus = (state: RootState) => state.loginModal.triggerOpen;

export default loginModalSlice.reducer;
