import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import '../styles/searchComp.scss';
import '../styles/darkMode.scss';
import ThemeToggle from "../context/ThemeToggle.tsx";
import {useSearch} from "../store/hooks/redux.ts";
import {fetchPokemons} from "../store/reducers/pokemonSlice";

interface SearchProps<T> {
    value?: T;
    search: (newValue: T) => void;
}

const SearchComp = (props: SearchProps<string>) => {

    const [err, setErr] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const search = useSearch();
    const dispatch = useDispatch();
    let prev = localStorage.getItem('prev');

    const checkValue = (event) => {
        const value = event.target.value;
        const mappedValue = value.toLowerCase().trim();
        setSearchValue(mappedValue);
        localStorage.setItem('prev', mappedValue);
    };

    const handleErrClick = () => {
        setErr(true);
    };


    useEffect(() => {
        if (prev) {
            setSearchValue(prev);
            props.search(prev);
        } else {
            setSearchValue('');
            localStorage.clear();
            props.search(searchValue);
        }
    },[search]);

    if (err) {
        throw new Error('Not a correct click')
    }
    return (
        <div className="search">
            <button className="search__err-btn" onClick={handleErrClick}>
                Error
            </button>
            <h1 className="search__title">Hey, buddy</h1>
            <p className="search__subtitle">do you wanna play with Pokemons?</p>
            <div className="search__block">
                <input
                    className="search__input"
                    type="text"
                    placeholder="Enter pokemon`s name"
                    value={searchValue}
                    onChange={checkValue}
                    aria-label="search-input"
                />
                <button
                    className="search__btn"
                    onClick={() => {
                        props.search(searchValue);
                    }}
                >
                    Search
                </button>
                <ThemeToggle></ThemeToggle>
            </div>
        </div>
    );
};

export default SearchComp;
