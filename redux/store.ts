import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from "./features/games/gamesSlice"; // Adjust the import path as needed
import genresReducer from "./features/genres/genresSlice"; // Adjust the import path as needed
import publishersReducer from "./features/publishers/publishersSlice"; // Adjust the import path as needed
import developersReducer from "./features/developers/developersSlice"; // Adjust the import path as needed
import platformsReducer from "./features/platforms/platformsSlice"; // Adjust the import path as needed
import searchReducer from "./features/search/searchSlice"; // Adjust the import path as needed
export const makeStore = () => {
    return configureStore({
        reducer: {
            games: gamesReducer,
            genres: genresReducer,
            publishers: publishersReducer,
            developers: developersReducer,
            platforms: platformsReducer,
            search: searchReducer,
        }
    });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
