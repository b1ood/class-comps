import {combineReducers, configureStore} from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokemonSlice";

export const rootReducer = combineReducers({
    pokemon: pokemonReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
