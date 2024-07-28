import React, {useEffect, useState} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";
import {ThemeContextProvider} from "./context/ThemeContext.ts";

const App: React.FC = () => {

    const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');
    const body = document.body;
    body.className = themeMode;

    const lightTheme = () => {
        localStorage.setItem('theme', 'light');
        setThemeMode('light');
    }

    const darkTheme = () => {
        localStorage.setItem('theme', 'dark');
        setThemeMode('dark');
    }

    useEffect(() => {

    }, [themeMode])

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainPage/>,
        },
        {
            path: '*',
            element: <NotFoundPage/>,
        },
        // {
        //   path: '/page/:id',
        //   element: <PokemonPage />,
        //   // loader: async ({ params }) => fetchPokemonData(params.id),
        // },
    ]);

    return (
        <div>
            <ThemeContextProvider value={{themeMode, darkTheme, lightTheme}}>
                <RouterProvider router={router}/>
            </ThemeContextProvider>
        </div>
    );
};

export default App;
