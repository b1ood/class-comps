import React from "react";
import {render, screen} from "@testing-library/react";
import PokemonsList from "../components/PokemonList.tsx";
import {PokemonDataInterface} from "../fetch/fetch.tsx";
import {Provider} from "react-redux";
import {store} from "../main.tsx";

const pokemonsMock: PokemonDataInterface[] = [
    {
        name: 'Ivysaur',
        id: 2,
        height: 10,
        weight: 130,
        imgSrc: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    }
]

describe('Pokemon List', () => {
    it('render', () => {
        render(
            <Provider store={store}>
                <PokemonsList
                    pokemons={pokemonsMock}
                    isLoaded={false}
                    getPrev={() => true}
                    getNext={() => true}
                    isNextButtonAvailable={true}
                    isPrevButtonAvailable={false}
                    chosenPok={() => undefined}>
                </PokemonsList>
            </Provider>
        )

        expect(screen.getByText(/Ivysaur/i)).toBeInTheDocument();
    })
})