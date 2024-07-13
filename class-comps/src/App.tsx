import React, { useEffect, useState} from 'react';
import SearchComp from './components/SearchComp.tsx';
import {fetchAllPokemons, fetchPokemonData, PokemonDataInterface, PokemonsData} from './fetch/fetch.tsx';
import ErrorBoundary from './errorBoundary/errorBoundary.tsx';
import PokemonsList from './components/DemonstrationComp.tsx';

const App: React.FC = () => {
  const [pokData, setPokData] = useState<PokemonDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const getAllPokemons = async () => {
    setIsLoading(true);
    const response = await fetchAllPokemons(limit, page);
    setTotalCount(response.headers['x-total-count']);
    const pokemonsData: PokemonsData = await response.data;
    const result = pokemonsData.results.map(async (pokemon) => {
      const pokemonData = await fetchPokemonData(pokemon.name);
      setPokData(prevItems => [...prevItems, pokemonData]);
    });
    if (result.length) {
      setIsLoading(false);
    }
  }

  const searchPokemon = async (value) => {
    setIsLoading(true);
    setPokData([]);
    if (value) {
      localStorage.setItem('prev', value?.toLowerCase()?.trim());
      const pokemonData = await fetchPokemonData(value.toLowerCase());
      setPokData(prevItems => [...prevItems, pokemonData]);
      setIsLoading(false);
    } else {
      getAllPokemons();
      localStorage.clear();
    }
  };

  useEffect(() => {
    let prev = localStorage.getItem('prev');
    if (prev) {
      searchPokemon(prev);
      return;
    }
    getAllPokemons();
  }, []);

  return (
      <div>
        <ErrorBoundary>
          <SearchComp search={searchPokemon} />
          <PokemonsList pokemons={pokData} isLoaded={isLoading}/>
        </ErrorBoundary>
      </div>
  );
};

export default App;
