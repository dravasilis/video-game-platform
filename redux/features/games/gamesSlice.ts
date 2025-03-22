import { fetchHelper } from "@/app/helpers/fetch-helper";
import { Game } from "@/app/models/game";
import { HttpResponse } from "@/app/models/httpResponse";
import { BasicPagination } from "@/app/models/pagination";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GamesState {
    upcomingGames: HttpResponse<Game> | null;
    vintageGames: HttpResponse<Game> | null;
    topRatedGames: HttpResponse<Game> | null;
    popularGames: HttpResponse<Game> | null;
    loading: boolean;
    error: string | null;
}
const initialState: GamesState = {
    upcomingGames: null,
    vintageGames: null,
    topRatedGames: null,
    popularGames: null,
    loading: false,
    error: null,
};

// Create an async thunk to fetch games
export const fetchUpcomingGames = createAsyncThunk("games/fetchUpcoming", async () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ordering: "released",
        dates: `${currentDate},${currentDate.substring(0, 4)}-12-31`,
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }

    return response;
});
export const fetchVintageGames = createAsyncThunk("games/fetchVintage", async () => {
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ordering: "ratings_count",
        dates: "1995-01-01,2005-01-01",
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});
export const fetchTopRatedGames = createAsyncThunk("games/fetchTopRated", async () => {
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ordering: "-metacritic",
        dates: "2012-01-01,2025-01-01",
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});
export const fetchAllGames = createAsyncThunk("games/fetchAll", async (pg?:BasicPagination) => {
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ordering: "-ratings_count",
        ...pg
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});

// Create the slice
const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpcomingGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUpcomingGames.fulfilled, (state, action) => {
                state.loading = false;
                state.upcomingGames = action.payload;
            })
            .addCase(fetchUpcomingGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(fetchVintageGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVintageGames.fulfilled, (state, action) => {
                state.loading = false;
                state.vintageGames = action.payload;
            })
            .addCase(fetchVintageGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(fetchTopRatedGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopRatedGames.fulfilled, (state, action) => {
                state.loading = false;
                state.topRatedGames = action.payload;
            })
            .addCase(fetchTopRatedGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchAllGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllGames.fulfilled, (state, action) => {
                state.loading = false;
                state.popularGames = action.payload;
            })
            .addCase(fetchAllGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

// Selectors
export const selectUpcomingGames = (state: RootState) => state.games.upcomingGames;
export const selectVintageGames = (state: RootState) => state.games.vintageGames;
export const selectTopRatedGames = (state: RootState) => state.games.topRatedGames;
export const selectAllGames = (state: RootState) => state.games.popularGames;

// Export the reducer to be added to the store
export default gamesSlice.reducer;
