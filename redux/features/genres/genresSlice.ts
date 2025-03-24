import { fetchHelper } from "@/app/helpers/fetch-helper";
import { Genre } from "@/app/models/genre";
import { HttpResponse } from "@/app/models/httpResponse";
import { BasicPagination } from "@/app/models/pagination";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GenresState {
    genres: HttpResponse<Genre> | null;
    loading: boolean;
    error: string | null;
}
const initialState: GenresState = {
    genres: null,
    loading: false,
    error: null,
};

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async (pg?:BasicPagination) => {
    const response: HttpResponse<Genre> = await fetchHelper('/genres', {
        ...( Object.fromEntries(Object.entries(pg??{}).filter(([_, v]) => v !== undefined))),
    });
    if (!response) {
        throw new Error("Failed to fetch genres");
    }
    return response;
});
// Create the slice
const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const selectGenres = (state: RootState) => state.genres;
export default genresSlice.reducer;
