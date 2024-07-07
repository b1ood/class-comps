export interface PokemonDataInterface {
  id: number;
  name: string;
  height: number;
  weight: number;
  imgSrc: string;
  stats: StatsInterface[];
}

export interface StatsInterface {
  base_stat: number;
  stat: {
    name: string;
  };
}

export const fetchPokemonData = async (pokemonName) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();

    const pokemon: PokemonDataInterface = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      imgSrc: data.sprites.front_default,
      stats: data.stats,
    };
    return pokemon;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAllPokemons = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=49&offset=0');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
