import { combineReducers } from "redux";
import { darkModeReducer } from "./DarkModeReducer";
import {selectedPokemonsReducer} from "./SelectedItems.ts";

export default combineReducers({
    darkMode: darkModeReducer,
    selectedPokemons: selectedPokemonsReducer,
});
