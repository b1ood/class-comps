import React from 'react';
import Stats from './StatsComp.tsx';
import {PokemonDataInterface} from "../fetch/fetch.tsx";
import {Link, Route, useLocation, useNavigate} from "react-router-dom";

import '../styles/pokemonComp.scss';

interface PokemonProps {
    pokemon: PokemonDataInterface,
    getChosenPok: (pok: PokemonDataInterface) => void,
}

const Pokemon: React.FC<PokemonProps> = ({pokemon, getChosenPok}) => {
    const navigate = useNavigate();


  return (
        <div className="pokemon__page">
            <div className="pokemon">
                <h2 className="pokemon__name" onClick={()=> {
                    // navigate('page/' + pokemon.id)
                    getChosenPok(pokemon);
                }}>{pokemon.name}</h2>
                <img src={pokemon.imgSrc} alt="pokPic" />
                <h3>Size</h3>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <h3>Stats</h3>
                <div className="pokemon__stats">
                    {pokemon.stats?.map((stat) => <Stats base_stat={stat.base_stat} stat={stat.stat}/>)}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
