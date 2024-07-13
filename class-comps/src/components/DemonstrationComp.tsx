import React from 'react';
import { PokemonDataInterface } from '../fetch/fetch.tsx';
import Pokemon from './PokemonComp.tsx';
import Loader from "./UI/Loader.tsx";

interface PokemonListProps {
    pokemons: PokemonDataInterface[],
    isLoaded: boolean
}

const PokemonsList: React.FC<PokemonListProps> = ({pokemons, isLoaded}) => {
    return isLoaded ?
        (<div className="loader-wrapper">
            <Loader/>
        </div>) :
        (
            <div className="demo">
                {pokemons.map(pokemon =>
                    <div key={pokemon.id}>
                        <Pokemon
                            id={pokemon.id}
                            name={pokemon.name}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            imgSrc={pokemon.imgSrc}
                            stats={pokemon.stats}
                        />
                    </div>
                )}
            </div>
        )
};

export default PokemonsList;
