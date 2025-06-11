import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

interface FavoritesState {
    favorites: number[];
    loading: boolean;
    error: string | null;
}
const initialState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null,
};


export const listenToFavorites = createAsyncThunk(
    "user/listenToFavorites",
    async (userId: string, { dispatch }) => {
        if (userId === '') {
            dispatch(favoritesUpdated([]));
            return;
        }
        const db = getFirestore();
        const userRef = doc(db, 'users', userId);

        return new Promise<void>((resolve, reject) => {
            const unsubscribe = onSnapshot(userRef, (doc) => {
                if (doc.exists()) {
                    const userData = doc.data();
                    if (userData?.favorites) {
                        // Dispatch an action to update favorites in Redux
                        dispatch(favoritesUpdated(userData.favorites));
                    }
                }
            }, reject);

            // Return the unsubscribe function for cleanup
            return () => unsubscribe();
        });
    }
);

// Create the slice
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        favoritesUpdated: (state, action) => {
            state.favorites = action.payload;
        },

    },
    extraReducers: (builder) => {
    },
});

export const selectFavorites = (state: RootState) => state.favorites;
export const { favoritesUpdated } = favoritesSlice.actions;
export default favoritesSlice.reducer;
