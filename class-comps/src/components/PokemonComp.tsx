import React, { Component } from 'react';
import { PokemonDataInterface } from '../fetch/fetch.tsx';
import '../styles/pokemonCard.scss';
import StatsComp from './StatsComp.tsx';

class PokemonComp extends Component<PokemonDataInterface, null> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pokemon">
        <h2 className="pokemon__name">{this.props.name}</h2>
        <img src={this.props.imgSrc} alt="pokPic" />
        <h3>Size</h3>
        <p>Height: {this.props.height}</p>
        <p>Weight: {this.props.weight}</p>
        <h3>Stats</h3>
        <div className="pokemon__stats">
          {this.props.stats.map((stat) => (
            <StatsComp base_stat={stat.base_stat} stat={stat.stat} />
          ))}
        </div>
      </div>
    );
  }
}

export default PokemonComp;
