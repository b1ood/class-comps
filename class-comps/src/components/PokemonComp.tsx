import React from 'react';
import Stats from './StatsComp.tsx';
import '../styles/pokemonCard.scss';
import {PokemonDataInterface} from "../fetch/fetch.tsx";

const Pokemon: React.FC<PokemonDataInterface> = (pokemon) => {
    return (
    <div>
      <div className="pokemon">
        <h2 className="pokemon__name">{pokemon.name}</h2>
        <img src={pokemon.imgSrc} alt="pokPic" />
        <h3>Size</h3>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <h3>Stats</h3>
        <div className="pokemon__stats">
          {pokemon.stats?.map((stat) => <Stats base_stat={stat.base_stat} stat={stat.stat} />)}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
