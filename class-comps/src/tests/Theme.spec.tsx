import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import ThemeToggle from "../context/ThemeToggle.tsx";

describe('theme change', () => {
    it('should render with light theme', () => {
        render(
            <ThemeToggle />
        )
        expect(screen.getByRole('themeToggle')).toBeInTheDocument();
    });

    it('should change theme', () => {
        render(
            <ThemeToggle />
        )

        fireEvent.change(screen.getByRole('themeToggle'));
        expect(document.body.classList.contains('light')).toBe(false);
    })
})