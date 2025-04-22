import { fetchHelper } from "@/app/helpers/fetch-helper";
import { Game, GameDetails, RedditPost, Screenshot, Trailer } from "@/app/models/game";
import { HttpResponse, SecondaryHttpResponse } from "@/app/models/httpResponse";
import { BasicPagination } from "@/app/models/pagination";
import { StoreDetails } from "@/app/models/store";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GamesState {
    upcomingGames: HttpResponse<Game> | null;
    vintageGames: HttpResponse<Game> | null;
    topRatedGames: HttpResponse<Game> | null;
    popularGames: HttpResponse<Game> | null;
    searchedGames: HttpResponse<Game> | null;
    selectedGame: GameDetails | null;
    selectedGameTrailer: SecondaryHttpResponse<Trailer> | null;
    selectedGameScreenshots: SecondaryHttpResponse<Screenshot> | null;
    sameSeriesGames: SecondaryHttpResponse<Game> | null;
    gameExtraContent: SecondaryHttpResponse<Game> | null;
    gameStores: SecondaryHttpResponse<StoreDetails> | null;
    redditPosts: SecondaryHttpResponse<RedditPost> | null;
    loading: boolean;
    error: string | null;
}
const initialState: GamesState = {
    upcomingGames: null,
    vintageGames: null,
    topRatedGames: null,
    popularGames: null,
    searchedGames: null,
    selectedGame: null,
    selectedGameTrailer: null,
    selectedGameScreenshots: null,
    sameSeriesGames: null,
    gameExtraContent: null,
    redditPosts: null,
    gameStores: null,
    loading: false,
    error: null,
};

// Create an async thunk to fetch games
export const fetchUpcomingGames = createAsyncThunk("games/fetchUpcoming", async (pg?:BasicPagination) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ...(Object.fromEntries(Object.entries(pg ?? {}).filter(([_, v]) => v !== undefined))),
        ordering: "released",
        dates: `${currentDate},${currentDate.substring(0, 4)}-12-31`,
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }

    return response;
});
export const fetchVintageGames = createAsyncThunk("games/fetchVintage", async (pg?:BasicPagination) => {
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ...(Object.fromEntries(Object.entries(pg ?? {}).filter(([_, v]) => v !== undefined))),
        ordering: "ratings_count",
        dates: "1995-01-01,2005-01-01",
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});
export const fetchTopRatedGames = createAsyncThunk("games/fetchTopRated", async (pg?: BasicPagination) => {
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ordering: "-metacritic",
        dates: "2012-01-01,2025-01-01",
        ...(Object.fromEntries(Object.entries(pg ?? {}).filter(([_, v]) => v !== undefined))),
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});
export const fetchAllGames = createAsyncThunk("games/fetchAll", async (pg?: BasicPagination) => {
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ...(Object.fromEntries(Object.entries(pg ?? {}).filter(([_, v]) => v !== undefined))),
        ordering: '-added'
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});
export const fetchSearchedGames = createAsyncThunk("games/fetchSearchedGames", async (pg?: BasicPagination) => {
    const response: HttpResponse<Game> = await fetchHelper('/games', {
        ...(Object.fromEntries(Object.entries(pg ?? {}).filter(([_, v]) => v !== undefined))),
        ordering: '-added'
    });
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});
export const fetchGame = createAsyncThunk("games/fetchGame", async (id: number) => {
    const response: GameDetails = await fetchHelper(`/games/${id}`);
    if (!response) {
        throw new Error("Failed to fetch games");
    }
    return response;
});
export const fetchGameTrailers = createAsyncThunk("games/fetchGameTrailers", async (id: number) => {
    const response: SecondaryHttpResponse<Trailer> = await fetchHelper(`/games/${id}/movies`);
    if (!response) {
        throw new Error("Failed to fetch games trailers");
    }
    return response;
});
export const fetchGameScreenshots = createAsyncThunk("games/fetchGameScreenshots", async (id: number) => {
    const response: SecondaryHttpResponse<Screenshot> = await fetchHelper(`/games/${id}/screenshots`);
    if (!response) {
        throw new Error("Failed to fetch games screenshots");
    }
    return response;
});
export const fetchGameSeries = createAsyncThunk("games/fetchGameSeries", async (id: number) => {
    const response: SecondaryHttpResponse<Game> = await fetchHelper(`/games/${id}/game-series`);
    if (!response) {
        throw new Error("Failed to fetch games series");
    }
    return response;
});
export const fetchGameExtraContent = createAsyncThunk("games/fetchGameExtraContent", async (id: number) => {
    const response: SecondaryHttpResponse<Game> = await fetchHelper(`/games/${id}/additions`);
    if (!response) {
        throw new Error("Failed to fetch games extra content");
    }
    return response;
});
export const fetchGameStores = createAsyncThunk("games/fetchGameStores", async (id: number) => {
    const response: SecondaryHttpResponse<StoreDetails> = await fetchHelper(`/games/${id}/stores`);
    if (!response) {
        throw new Error("Failed to fetch games stores");
    }
    return response;
});
export const fetchGameRedditPosts = createAsyncThunk("games/fetchGameRedditPosts", async (id: number) => {
    const response: SecondaryHttpResponse<RedditPost> = await fetchHelper(`/games/${id}/reddit`);
    if (!response) {
        throw new Error("Failed to fetch games reddit posts");
    }
    return response;
});

// Create the slice
const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        clearGames: (state) => {
            state.searchedGames = null; // Reset games state without making a request
        },
        clearSelectedGame: (state) => {
            state.selectedGame = null; // Reset games state without making a request
        },
    },
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
            })
            .addCase(fetchSearchedGames.fulfilled, (state, action) => {
                state.searchedGames = action.payload;
            })
            .addCase(fetchGame.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGame.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedGame = action.payload;
            })
            .addCase(fetchGame.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchGameTrailers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameTrailers.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedGameTrailer = action.payload;
            })
            .addCase(fetchGameTrailers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchGameScreenshots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameScreenshots.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedGameScreenshots = action.payload;
            })
            .addCase(fetchGameScreenshots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchGameSeries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameSeries.fulfilled, (state, action) => {
                state.loading = false;
                state.sameSeriesGames = action.payload;
            })
            .addCase(fetchGameSeries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchGameExtraContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameExtraContent.fulfilled, (state, action) => {
                state.loading = false;
                state.gameExtraContent = action.payload;
            })
            .addCase(fetchGameExtraContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchGameStores.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameStores.fulfilled, (state, action) => {
                state.loading = false;
                state.gameStores = action.payload;
            })
            .addCase(fetchGameStores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchGameRedditPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameRedditPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.redditPosts = action.payload;
            })
            .addCase(fetchGameRedditPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

// Selectors
export const selectUpcomingGames = (state: RootState) => state.games.upcomingGames;
export const selectVintageGames = (state: RootState) => state.games.vintageGames;
export const selectTopRatedGames = (state: RootState) => state.games.topRatedGames;
export const selectAllGames = (state: RootState) => state.games;
export const selectSearchedGames = (state: RootState) => state.games;
export const selectGameById = (state: RootState) => state.games;
export const selectGameTrailers = (state: RootState) => state.games.selectedGameTrailer;
export const selectGameScreenshots = (state: RootState) => state.games.selectedGameScreenshots;
export const selectSeriesGames = (state: RootState) => state.games.sameSeriesGames;
export const selectGameExtraContent = (state: RootState) => state.games.gameExtraContent;
export const selectGameStores = (state: RootState) => state.games.gameStores;
export const selectRedditPosts = (state: RootState) => state.games.redditPosts;
export const { clearGames,clearSelectedGame } = gamesSlice.actions;

// Export the reducer to be added to the store
export default gamesSlice.reducer;
