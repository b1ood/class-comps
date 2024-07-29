import React from 'react';
import {render, screen} from '@testing-library/react';
import ErrorBoundary from "../errorBoundary/errorBoundary.tsx";

const ProblematicComponent = () => {
    throw new Error('Test error');
};

describe('index.tsx', () => {
    it('should catches errors with ErrorBoundary', () => {
        render(
            <ErrorBoundary>
                <ProblematicComponent/>
            </ErrorBoundary>
        );

        expect(screen.getByText(/Oh no... Something went wrong/i)).toBeInTheDocument();
    });
});