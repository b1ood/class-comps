import React from 'react';
import { fetchPokemonData } from './fetch/fetch.tsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import PokemonPage from "./components/PokemonPage.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";

const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    // {
    //   path: '/page/:id',
    //   element: <PokemonPage />,
    //   // loader: async ({ params }) => fetchPokemonData(params.id),
    // },
  ]);

  return (
      <div>
          <RouterProvider router={router} />
      </div>
  );
};

export default App;
