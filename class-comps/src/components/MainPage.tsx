import React, {useEffect, useState} from 'react';
import {PokemonDataInterface} from "../fetch/fetch.tsx";
import SearchComp from "./SearchComp.tsx";
import PokemonsList from "./PokemonList.tsx";
import ErrorBoundary from "../errorBoundary/errorBoundary.tsx";
import PokemonPage from "./PokemonPage.tsx";
import {useAppDispatch, useAppSelector} from "../store/hooks/redux";
import {
    downloadFile,
    fetchPokemonByName,
    fetchPokemons,
    selectAll,
    unSelectAll
} from "../store/reducers/pokemonSlice.ts";

export const MainPage = () => {
    const [offset, setOffset] = useState(0);
    const [isPrevButtonAvailable, setPrev] = useState(true);
    const [isNextButtonAvailable, setNext] = useState(false);
    const [chosenPok, setChosenPok] = useState<PokemonDataInterface>();
    const dispatch = useAppDispatch();
    let pokemonData = useAppSelector(state => state.pokemon.pokemons)
    let loading = useAppSelector(state => state.pokemon.loading)
    let dataForDownload = useAppSelector(state => state.pokemon.selectedItems)
    // let totalCountPokemon = useAppSelector(state => state.pokemonReducer.totalCountPokemon)


    const searchPokemon = async (value?: string) => {
        if (value && value.length >= 1) {
            dispatch(fetchPokemonByName(value));
        }
        return dispatch(fetchPokemons({limit: 10, offset: offset}));
    };

    const getPrev = () => {
        setOffset(offset => offset - 10);
    }


    const getNext = () => {
        setOffset(offset => offset + 10);
    }

    const getChosenPok = (chosenPok: PokemonDataInterface | undefined) => {
        setChosenPok(chosenPok);
    }

    useEffect(() => {
        // setNext(offset + 10 >= totalCountPokemon)
        setPrev(offset === 0)
        dispatch(fetchPokemons({limit: 10, offset: offset}));
        console.log()
    }, [offset]);

    return (
        <div>
            <ErrorBoundary>
                <SearchComp search={searchPokemon}/>
                <div className="box">
                    <PokemonsList
                        data-testid="pokemon-list"
                        pokemons={pokemonData} isLoaded={true}
                        isPrevButtonAvailable={isPrevButtonAvailable}
                        isNextButtonAvailable={isNextButtonAvailable}
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
                        isLoaded={loading}
                      />
                    }
                </div>
                {dataForDownload.length !== 0 &&
                  <div className="button-group">
                      {/*<button className="button-group__button"*/}
                      {/*        onClick={() => {*/}
                      {/*            dispatch(selectAll())*/}
                      {/*        }}>Select All</button>*/}
                    <button
                      className="button-group__button" disabled={dataForDownload.length === 0}
                      onClick={() => dispatch(unSelectAll())}>Unselect All
                    </button>
                    <button
                      className="button-group__button" disabled={dataForDownload.length === 0}
                      onClick={() => dispatch(downloadFile(dataForDownload))}>Download {dataForDownload.length} selected
                    </button>
                  </div>
                }
            </ErrorBoundary>
        </div>
    );
};

export default MainPage;
