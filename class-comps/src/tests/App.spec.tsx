import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import App from "../App.tsx";
import {Provider} from "react-redux";
import {store} from "../main.tsx";
import SearchComp from "../components/SearchComp.tsx";

const searchPokemon = () => 'pikachu';

describe('App comp', () => {
    it('toggle theme', () => {
        render(
            <Provider store={store}>
                <SearchComp search={searchPokemon}/>
            </Provider>
        );

        expect(document.body.classList.contains('dark')).toBe(false);
    });

    it('render not found page', () => {
        render(
            <App/>
        );

        window.history.pushState({}, 'Not Found', '/unknown');
        fireEvent.popState(window);
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });
})