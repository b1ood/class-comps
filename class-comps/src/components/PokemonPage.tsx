import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './UI/Loader.tsx';
import Stats from './StatsComp.tsx';

import "../styles/pokemonComp.scss"
import {PokemonDataInterface} from "../fetch/fetch.tsx";

const PokemonPage = (pokemon: PokemonDataInterface) => {

    return pokemon ? (
            <div>
                <div className="pokemon-box">
                    <div className="pokemon">
                        <h2 className="pokemon__name">{pokemon.name}</h2>
                        <img src={pokemon.imgSrc} alt="pokPic"/>
                        <h3>Size</h3>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <h3>Stats</h3>
                        <div className="pokemon__stats">
                            {pokemon.stats?.map((stat) => <Stats base_stat={stat.base_stat} stat={stat.stat}/>)}
                        </div>
                    </div>
                </div>
                <button
                    className="return" onClick={() => localStorage.clear()}>
                    <Link to={'/'}>Back to all</Link>
                </button>
            </div>
        ) :
        (<div className="loader-wrapper">
            <Loader/>
        </div>);
};

export default PokemonPage;