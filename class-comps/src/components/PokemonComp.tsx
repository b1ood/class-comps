import React, {useEffect, useState} from 'react';
import {PokemonDataInterface} from "../fetch/fetch.tsx";

import '../styles/pokemonComp.scss';
import {useDispatch, useSelector} from "react-redux";
import {ADD_POKEMON_IN_LIST} from "../types/types.ts";
import {handleSelectedPokemon} from "../store/actions/SelectedItemsAction.ts";

interface PokemonProps {
    pokemon: PokemonDataInterface,
    getChosenPok: (pok: PokemonDataInterface) => void,
}

const Pokemon: React.FC<PokemonProps> = ({pokemon, getChosenPok}) => {

    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();

    const addPokemon = (pokemon) => {
        dispatch(handleSelectedPokemon(pokemon));
    }

    const checkSelectedPok = (id) => {
        const selectedPoks: PokemonDataInterface[] = JSON.parse(localStorage.getItem('selectedPoks')) || [];

        if (selectedPoks.some(selectedPok => id === selectedPok.id)) {
            return setIsChecked(true);
        } else {
            selectedPoks.filter(selectedPok => selectedPok.id !== pokemon.id);
            localStorage.setItem('selectedPoks', JSON.stringify(selectedPoks));
            return setIsChecked(false);
        }

    }

    useEffect(() => {
        checkSelectedPok(pokemon.id)
    }, [isChecked]);

    return (
        <div>
            <div className="pokemon-comp">
                <div>
                    <h2
                        className="pokemon-comp__name" onClick={() => {
                        getChosenPok(pokemon);
                    }}>{pokemon.name}</h2>
                    <input type="checkbox" className="pokemon-comp__checkbox" checked={isChecked}
                           onChange={() => {
                               addPokemon(pokemon);
                               return (isChecked) ? setIsChecked(false) : setIsChecked(true);
                           }}
                    />
                </div>
                <img className="pokemon-comp__img" src={pokemon.imgSrc} alt="pokPic"/>
            </div>
        </div>
    );
};

export default Pokemon;
