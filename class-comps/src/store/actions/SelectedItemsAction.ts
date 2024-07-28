import {ADD_POKEMON_IN_LIST, REMOVE_POKEMON_FROM_LIST} from "../../types/types";
import {PokemonDataInterface} from "../../fetch/fetch.tsx";

export const handleSelectedPokemon = (pokemon: PokemonDataInterface) => {
    let selectedPoks: PokemonDataInterface[] = JSON.parse(localStorage.getItem('selectedPoks')) || [];

    if (!selectedPoks.some(selectedPok => selectedPok.name === pokemon.name)) {
        selectedPoks.push(pokemon);
        localStorage.setItem('selectedPoks', JSON.stringify(selectedPoks));

        return {
            type: ADD_POKEMON_IN_LIST,
            payload: pokemon,
        };
    }

    selectedPoks.filter(selectedPok => selectedPok.id !== pokemon.id);
    localStorage.setItem('selectedPoks', JSON.stringify(selectedPoks));
    return {
        type: REMOVE_POKEMON_FROM_LIST,
        payload: pokemon,
    };
};