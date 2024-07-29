import React from 'react';
import {pokemonSlice} from "../store/reducers/pokemonSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks/redux.ts";

export const NotFoundPage = () => {
    return (
        <div>
            <h1 className="not-found">404 - Page Not Found</h1>
        </div>
    );
};

export default NotFoundPage;