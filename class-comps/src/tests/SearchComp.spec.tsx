import React from "react";
import {getByRole, render, screen} from "@testing-library/react";
import SearchComp from "../components/SearchComp.tsx";
import {store} from "../main.tsx";
import {Provider} from "react-redux";

const searchPokemon = () => 'pikachu';

describe('Search comp', () => {
    it('render correctly', () => {
        render(
            <Provider store={store}>
                <SearchComp search={searchPokemon}/>
            </Provider>
        );

        expect(screen.getByText(/do you wanna play with Pokemons?/i)).toBeInTheDocument();
        expect(screen.getByText(/Hey, buddy/i)).toBeInTheDocument();
        expect(screen.getByText(/Search/i)).toBeInTheDocument();
    });
});