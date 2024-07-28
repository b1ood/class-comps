import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import {Provider} from "react-redux";
import {setupStore} from "./store";

export const store = setupStore();

window.addEventListener('DOMContentLoaded', function() {
    ReactDOM.createRoot(document.getElementById('root')!)
        .render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
})
