import React from 'react';
import {PokemonDataInterface} from "../fetch/fetch.tsx";
import {render, screen} from "@testing-library/react";
import PokemonPage from "../components/PokemonPage.tsx";

const pokemonData: PokemonDataInterface = {
    name: 'Ivysaur',
    id: 2,
    height: 10,
    weight: 130,
    imgSrc: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
}

describe('PokemonComp info', () => {
    it('should render detail content', () => {
        render(
            <PokemonPage
                id={pokemonData.id}
                name={pokemonData.name}
                height={pokemonData.height}
                weight={pokemonData.weight}
                imgSrc={pokemonData.imgSrc}
                stats={pokemonData.stats}
                isLoaded={false}>
            </PokemonPage>
        );

        expect(screen.getByText('Ivysaur')).toBeInTheDocument();
        expect(screen.getByText('Size')).toBeInTheDocument();
        expect(screen.getByText('Stats')).toBeInTheDocument();
    });
})