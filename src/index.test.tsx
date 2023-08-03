import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

const Child = () => {
    throw new Error()
}

const errorHandler = ({error}: {error:any}): React.JSX.Element => {
    return (<ErrorMessage message={error.message} />);
}

describe('Error Boundary', ():void => {
    it(`should render error boundary component when there is an error`, ():void => {
        render(
            <ErrorBoundary FallbackComponent={errorHandler}>
                <Child />
            </ErrorBoundary>
        )
        const firstButtonElement = screen.getByText(/Reload Page/i);
        expect(firstButtonElement).toBeInTheDocument();
        fireEvent.click(screen.getByText(/Reload Page/i));
        const secondButtonElement = screen.getByText(/Reload Page/i);
        expect(secondButtonElement).toBeInTheDocument();
    })
})