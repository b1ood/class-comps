import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleDarkMode} from "../store/actions/DarkModeAction.ts";

import '../styles/searchComp.scss';
import '../styles/darkMode.scss';

interface SearchProps<T> {
    value?: T;
    search: (newValue: T) => void;
}

const SearchComp = (props: SearchProps<string>) => {
    const [inpValue, setInpValue] = useState(localStorage.getItem('prev') || '');
    const [err, setErr] = useState(false);

    const dispatch = useDispatch();
    const mode = useSelector((state) => state.darkMode);
    const {isDarkMode} = mode;
    const body = document.body;

    const switchDarkMode = () => {
        isDarkMode
            ? dispatch(handleDarkMode(false))
            : dispatch(handleDarkMode(true));
    };

    useEffect(() => {
        isDarkMode ? body.classList.add('dark') : body.classList.remove('dark');
    }, [isDarkMode]);

    const checkValue = (event) => {
        const target = event.target;
        setInpValue(target.value);
    };

    const handleErrClick = () => {
        setErr(true);
    };

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
                    value={inpValue}
                    onChange={checkValue}
                />
                <button
                    className="search__btn"
                    disabled={!inpValue && !localStorage.getItem('prev')}
                    onClick={() => {
                        props.search(inpValue);
                    }}
                >
                    Search
                </button>
                <div className="checkbox-wrapper-6">
                    <input className="tgl tgl-light" id="cb1-6" type="checkbox" checked={isDarkMode}
                           onClick={() => switchDarkMode()}/>
                    <label className="tgl-btn" htmlFor="cb1-6" />
                </div>
            </div>
        </div>
    );
};

export default SearchComp;
