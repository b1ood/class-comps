import React, { Component } from 'react';
import '../styles/searchComp.scss';

type SearchState = {
  value?: string;
  error?: boolean;
};

interface SearchProps<T> {
  value: T;
  search: (newValue: T) => void;
}

class SearchComp extends Component<SearchProps<string>, SearchState> {
  private disabled: boolean;

  constructor(props) {
    super(props);

    this.disabled = true;

    this.checkValue = this.checkValue.bind(this);

    this.state = {
      value: localStorage.getItem('prev')?.trim() || '',
    };
  }

  checkValue = (event) => {
    const target = event.target;
    this.setState({ value: target.value });
  };

  handleErrClick = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error('Not a correct click');
    }
    return (
      <div className="search">
        <button className="search__err-btn" onClick={this.handleErrClick}>
          Error
        </button>
        <h1 className="search__title">Hey, buddy</h1>
        <p className="search__subtitle">do you wanna play with Pokemons?</p>
        <div className="search__block">
          <input
            className="search__input"
            type="text"
            placeholder="Enter pokemon`s name"
            value={this.state.value}
            onChange={this.checkValue}
          />
          <button
            className="search__btn"
            disabled={!this.state.value && !localStorage.getItem('prev')}
            onClick={() => {
              this.setState({ value: this.state.value?.trim() });
              this.props.search(this.state.value as string);
            }}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchComp;
