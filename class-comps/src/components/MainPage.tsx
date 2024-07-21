import React, {useEffect, useState} from 'react';
import {fetchAllPokemons, fetchPokemonData, PokemonDataInterface, PokemonsData} from "../fetch/fetch.tsx";
import SearchComp from "./SearchComp.tsx";
import PokemonsList from "./PokemonList.tsx";
import ErrorBoundary from "../errorBoundary/errorBoundary.tsx";
import PokemonPage from "./PokemonPage.tsx";

const MainPage = () => {
    const [pokData, setPokData] = useState<PokemonDataInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [prev, setPrev] = useState('');
    const [next, setNext] = useState('');
    const [chosenPok, setChosenPok] = useState<PokemonDataInterface>();

    const getAllPokemons = async (url?: string) => {
        setIsLoading(true);
        const response = await fetchAllPokemons(url);
        setPrev(response.data.previous);
        setNext(response.data.next);
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

    const getPrev = () => {
        setPokData([]);
        getAllPokemons(prev);
    }

    const getNext = () => {
        setPokData([]);
        getAllPokemons(next);
    }

    const getChosenPok = (chosenPok: PokemonDataInterface | undefined) => {
        setChosenPok(chosenPok);
    }

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
                <SearchComp search={searchPokemon}/>
                <div className="box">
                    <PokemonsList
                        pokemons={pokData} isLoaded={isLoading}
                        prev={prev} next={next}
                        getNext={() => getNext()}
                        getPrev={() => getPrev()}
                        chosenPok={getChosenPok}/>
                    {chosenPok &&
                      <PokemonPage
                        id={chosenPok.id}
                        name={chosenPok.name}
                        height={chosenPok.height}
                        weight={chosenPok.weight}
                        imgSrc={chosenPok.imgSrc}
                        stats={chosenPok.stats}
                        isLoaded={isLoading}
                      />
                    }
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default MainPage;