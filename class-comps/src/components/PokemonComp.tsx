import React, {useEffect, useState} from 'react';
import {PokemonDataInterface} from "../fetch/fetch.tsx";

import '../styles/pokemonComp.scss';
import {useAppDispatch, useAppSelector} from "../store/hooks/redux.ts";
import {pokemonSlice} from "../store/reducers/pokemonSlice.ts";

interface PokemonProps {
    pokemon: PokemonDataInterface,
    getChosenPok: (pok: PokemonDataInterface) => void,
}

const Pokemon: React.FC<PokemonProps> = ({pokemon, getChosenPok}) => {

    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useAppDispatch();
    const {addPokemon, removePokemon} = pokemonSlice.actions;
    let isCheckedFromState = useAppSelector(state => state.pokemon.selectedItems.find(selectedItem=>selectedItem.name===pokemon.name))
    useEffect(() => {

    }, [isCheckedFromState])


    return (
        <div>
            <div className="pokemon-comp">
                <div>
                    <h2
                        className="pokemon-comp__name" onClick={() => {
                        getChosenPok(pokemon);
                    }}>{pokemon?.name}</h2>
                    <input type="checkbox" className="pokemon-comp__checkbox" checked={!!isCheckedFromState}
                           onChange={() => {
                               !!isCheckedFromState ? dispatch(removePokemon(pokemon)) : dispatch(addPokemon(pokemon));
                               return (!!isCheckedFromState) ? setIsChecked(false) : setIsChecked(true);
                           }}
                    />
                </div>
                <img className="pokemon-comp__img" src={pokemon?.imgSrc || ''} alt="pokPic"/>
            </div>
        </div>
    );
};

export default Pokemon;
