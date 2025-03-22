import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from "./features/games/gamesSlice"; // Adjust the import path as needed
import genresReducer from "./features/genres/genresSlice"; // Adjust the import path as needed

export const makeStore = () => {
    return configureStore({
        reducer: {
            games: gamesReducer,
            genres:genresReducer
        }
    });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
