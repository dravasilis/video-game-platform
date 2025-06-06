import { HttpResponse } from "@/app/models/httpResponse";
import { auth } from "@/lib/firebase";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged, User } from "firebase/auth";

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}
const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchFirebaseUser = createAsyncThunk<User | null>(
    "user/fetchFirebaseUser",
    async (_, { rejectWithValue }) => {
        return new Promise<User | null>((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe(); // Stop listening after first call
                resolve(user);
            }, reject);
        });
    }
);
// Create the slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFirebaseUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFirebaseUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchFirebaseUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user";
            });
    },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
