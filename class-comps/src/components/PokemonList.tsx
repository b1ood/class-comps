import React from 'react';
import {PokemonDataInterface} from '../fetch/fetch.tsx';
import Pokemon from './PokemonComp.tsx';
import Loader from './UI/loader/Loader.tsx';

import '../styles/pokemonList.scss';
import '../styles/pokemonComp.scss';

interface PokemonListProps {
    pokemons: PokemonDataInterface[],
    isLoaded: boolean,
    getPrev: () => void;
    getNext: () => void;
    isNextButtonAvailable: boolean | undefined,
    isPrevButtonAvailable: boolean | undefined,
    chosenPok: (pok: PokemonDataInterface) => void,
}

const PokemonsList: React.FC<PokemonListProps> = (
    {
        pokemons,
        isLoaded,
        getPrev,
        getNext,
        isNextButtonAvailable,
        isPrevButtonAvailable,
        // next,
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
                {pokemons.length !== 1 &&
                  <div className="demo__pagination">
                    <button
                      className="demo__btn-pagination"
                      disabled={isPrevButtonAvailable}
                      onClick={() => {
                          getPrev();
                      }}>Prev
                    </button>
                    <button
                      className="demo__btn-pagination"
                      disabled={isNextButtonAvailable}
                      onClick={() => {
                          getNext();
                      }}>Next
                    </button>
                  </div>
                }
            </div>
        )
};

export default PokemonsList;
