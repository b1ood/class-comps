import React, { useState } from 'react';
import '../styles/searchComp.scss';

interface SearchProps<T> {
  value?: T;
  search: (newValue: T) => void;
}

const SearchComp = (props: SearchProps<string>) => {
  const [inpValue, setInpValue] = useState(localStorage.getItem('prev') || '');
  const [err, setErr] = useState(false);

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
        </div>
      </div>
  );
};

export default SearchComp;
