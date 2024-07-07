import React, { Component } from 'react';
import PokemonComp from './PokemonComp.tsx';
import { fetchAllPokemons, fetchPokemonData, PokemonDataInterface } from '../fetch/fetch.tsx';
import Loader from './UI/Loader.tsx';

type DemoState = {
  pokemonsData?: PokemonDataInterface[];
  prevPokemonData?: PokemonDataInterface | null;
  isLoading: boolean;
};

class DemonstrationComp extends Component<PokemonDataInterface, DemoState> {
  private pokemonDataArray: PokemonDataInterface[] = [];

  constructor(props) {
    super(props);
    this.state = {
      pokemonsData: [],
      prevPokemonData: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    const prev = localStorage.getItem('prev');
    this.setState({ isLoading: true });
    if (!prev) {
      fetchAllPokemons().then((data) => {
        data.results.map((pokemonData) => {
          fetchPokemonData(pokemonData.name)
            .then((data) => {
              this.pokemonDataArray.push(data);
            })
            .then(() => {
              this.setState({ pokemonsData: this.pokemonDataArray, isLoading: false });
            });
        });
      });
    } else {
      fetchPokemonData(prev).then((data) => {
        this.setState({ prevPokemonData: data, isLoading: false });
      });
    }
  }

  render() {
    const { prevPokemonData } = this.state;
    const { newPok } = this.props;
    if (newPok) {
      return this.state.isLoading ? (
        <Loader />
      ) : (
        <div className="demo">
          <div key={newPok.id}>
            <PokemonComp
              id={newPok.id}
              name={newPok.name}
              height={newPok.height}
              weight={newPok.weight}
              imgSrc={newPok.imgSrc}
              stats={newPok.stats}
            />
          </div>
        </div>
      );
    }
    if (prevPokemonData) {
      return this.state.isLoading ? (
        <Loader />
      ) : (
        <div className="demo">
          <div key={prevPokemonData.id}>
            <PokemonComp
              id={prevPokemonData.id}
              name={prevPokemonData.name}
              height={prevPokemonData.height}
              weight={prevPokemonData.weight}
              imgSrc={prevPokemonData.imgSrc}
              stats={prevPokemonData.stats}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="demo">
          {this.state.isLoading ? (
            <Loader />
          ) : (
            this.pokemonDataArray.map((pokemon) => (
              <div key={pokemon.id}>
                <PokemonComp
                  id={pokemon.id}
                  name={pokemon.name}
                  height={pokemon.height}
                  weight={pokemon.weight}
                  imgSrc={pokemon.imgSrc}
                  stats={pokemon.stats}
                />
              </div>
            ))
          )}
        </div>
      );
    }
  }
}

export default DemonstrationComp;
