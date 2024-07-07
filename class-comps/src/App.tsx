import React, { Component } from 'react';
import SearchComp from './components/SearchComp.tsx';
import DemonstrationComp from './components/DemonstrationComp.tsx';
import { fetchPokemonData, PokemonDataInterface } from './fetch/fetch.tsx';
import ErrorBoundary from './errorBoundary/errorBoundary.tsx';

type AppState = {
  pokData: PokemonDataInterface | null;
};

class App extends Component<null, AppState> {
  constructor(props) {
    super(props);
    this.searchPokemon = this.searchPokemon.bind(this);

    this.state = {
      pokData: null,
    };
  }

  searchPokemon = (value) => {
    if (value) {
      localStorage.setItem('prev', value?.toLowerCase()?.trim());
      fetchPokemonData(value.toLowerCase()).then((data) => {
        this.setState({ pokData: data });
      });
    } else {
      localStorage.clear();
      location.reload();
    }
  };

  render() {
    return (
      <div>
        <ErrorBoundary>
          <SearchComp search={this.searchPokemon} />
          <DemonstrationComp newPok={this.state.pokData} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
