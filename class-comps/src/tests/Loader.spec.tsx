import React from "react";
import {render, screen} from "@testing-library/react";
import Loader from "../components/UI/Loader.tsx";

describe('Pokemon list', () => {
    it('render correctly', () => {
        render(<Loader/>);

        expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
    });
})