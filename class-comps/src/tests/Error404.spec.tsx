import React from 'react';
import {render, screen} from "@testing-library/react";
import NotFoundPage from "../components/NotFoundPage.tsx";

describe('Not found page', () => {
    it('should render correctly', () => {
        render(<NotFoundPage/>);
        expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
})