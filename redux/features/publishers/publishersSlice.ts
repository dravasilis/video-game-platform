import { fetchHelper } from "@/app/helpers/fetch-helper";
import { Genre } from "@/app/models/genre";
import { HttpResponse } from "@/app/models/httpResponse";
import { BasicPagination } from "@/app/models/pagination";
import { Publisher } from "@/app/models/publisher";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PublishersState {
    publishers: HttpResponse<Publisher> | null;
    loading: boolean;
    error: string | null;
}
const initialState: PublishersState = {
    publishers: null,
    loading: false,
    error: null,
};

export const fetchPublishers = createAsyncThunk("genres/fetchPublishers", async (pg?:BasicPagination) => {
    pg = {...pg,page_size: pg?.page_size ?? 20}
    const response: HttpResponse<Publisher> = await fetchHelper('/publishers', {
        ...pg
    });
    if (!response) {
        throw new Error("Failed to fetch genres");
    }
    return response;
});
// Create the slice
const publishersSlice = createSlice({
    name: "publishers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPublishers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPublishers.fulfilled, (state, action) => {
                state.loading = false;
                state.publishers = action.payload;
            })
            .addCase(fetchPublishers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const selectPublishers = (state: RootState) => state.publishers.publishers;
export default publishersSlice.reducer;
