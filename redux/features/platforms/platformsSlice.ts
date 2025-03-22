import { fetchHelper } from "@/app/helpers/fetch-helper";
import { HttpResponse } from "@/app/models/httpResponse";
import { BasicPagination } from "@/app/models/pagination";
import { Platform } from "@/app/models/platform";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PlatformsState {
    platforms: HttpResponse<Platform> | null;
    loading: boolean;
    error: string | null;
}
const initialState: PlatformsState = {
    platforms: null,
    loading: false,
    error: null,
};

export const fetchPlatforms = createAsyncThunk("genres/fetchPlatforms", async (pg?:BasicPagination) => {
    pg = {...pg,page_size: pg?.page_size ?? 20}
    const response: HttpResponse<Platform> = await fetchHelper('/platforms', {
        ...pg
    });
    if (!response) {
        throw new Error("Failed to fetch platforms");
    }
    return response;
});
// Create the slice
const platformsSlice = createSlice({
    name: "platforms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlatforms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlatforms.fulfilled, (state, action) => {
                state.loading = false;
                state.platforms = action.payload;
            })
            .addCase(fetchPlatforms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const selectPlatforms = (state: RootState) => state.platforms.platforms;
export default platformsSlice.reducer;
