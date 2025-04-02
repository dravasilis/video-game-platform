import { fetchHelper } from "@/app/helpers/fetch-helper";
import { HttpResponse } from "@/app/models/httpResponse";
import { BasicPagination } from "@/app/models/pagination";
import { Publisher } from "@/app/models/publisher";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DevelopersState {
    developers: HttpResponse<Publisher> | null;
    loading: boolean;
    error: string | null;
}
const initialState: DevelopersState = {
    developers: null,
    loading: false,
    error: null,
};

export const fetchDevelopers = createAsyncThunk("genres/fetchDevelopers", async (pg?: BasicPagination) => {
    pg = { ...pg, page_size: pg?.page_size ?? 20 };
    const response: HttpResponse<Publisher> = await fetchHelper('/developers', {
        ...(Object.fromEntries(Object.entries(pg ?? {}).filter(([_, v]) => v !== undefined))),
    });
    if (!response) {
        throw new Error("Failed to fetch genres");
    }
    return response;
});
// Create the slice
const developersSlice = createSlice({
    name: "developers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevelopers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDevelopers.fulfilled, (state, action) => {
                state.loading = false;
                state.developers = action.payload;
            })
            .addCase(fetchDevelopers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const selectDevelopers = (state: RootState) => state.developers;
export default developersSlice.reducer;
