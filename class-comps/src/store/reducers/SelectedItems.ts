const defaultState = [];

export const selectedPokemonsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_POKEMON_IN_LIST':
            return { ...state, pokemons: action.payload }

        default:
            return state;
    }
}