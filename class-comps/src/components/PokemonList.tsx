import React from 'react';
import {PokemonDataInterface} from '../fetch/fetch.tsx';
import Pokemon from './PokemonComp.tsx';
import Loader from './UI/Loader.tsx';

import '../styles/pokemonList.scss';
import '../styles/pokemonComp.scss';

interface PokemonListProps {
    pokemons: PokemonDataInterface[],
    isLoaded: boolean,
    getPrev: () => void;
    getNext: () => void;
    prev: string | undefined,
    next: string | undefined,
    chosenPok: (pok: PokemonDataInterface) => void,
}

const PokemonsList: React.FC<PokemonListProps> = (
    {
        pokemons,
        isLoaded,
        getPrev,
        getNext,
        prev,
        next,
        chosenPok,
    }) => {

    return isLoaded ?
        (<div className="loader-wrapper">
            <Loader/>
        </div>) :
        (
            <div>
                <div className="demo">
                    {pokemons.map(pokemon =>
                        <div key={pokemon.id}>
                                <Pokemon
                                    pokemon={pokemon}
                                    getChosenPok={chosenPok}
                                 />
                        </div>
                    )}
                </div>
                <div className="demo__pagination">
                    <button
                        className="demo__btn-pagination"
                        disabled={!prev}
                        onClick={() => {
                            getPrev();
                        }}>Prev
                    </button>
                    <button
                        className="demo__btn-pagination"
                        disabled={!next}
                        onClick={() => {
                            getNext();
                        }}>Next
                    </button>
                </div>
            </div>
        )
};

export default PokemonsList;
