import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from '../ErrorMessage/ErrorMessage';

describe('renders App', () => {
  const errorHandler = ({error}: {error:any}) => {
    return (<ErrorMessage message={error.message} />);
  }

  it('Should render App', () => {
    render(
      <ErrorBoundary FallbackComponent={errorHandler}>
        <App />
      </ErrorBoundary>
    );
    setTimeout(() => {
      const titleElement = screen.getByText(/Todo List/i);
      expect(titleElement).toBeInTheDocument();
      const addButtonElement = screen.getByText(/Add/i);
      expect(addButtonElement).toBeInTheDocument();
      const updateButtonElement = screen.getByText(/Update/i);
      expect(updateButtonElement).toBeInTheDocument();
      const deleteButtonElement = screen.getByText(/Delete/i);
      expect(deleteButtonElement).toBeInTheDocument();
      const titleTableHeaderElement = screen.getByText(/Title/i);
      expect(titleTableHeaderElement).toBeInTheDocument();
      const actionTableHeaderElement = screen.getByText(/Action/i);
      expect(actionTableHeaderElement).toBeInTheDocument();
    }, 2000)
  })

  it('Should render add todo modal', () => {
    render(
      <ErrorBoundary FallbackComponent={errorHandler}>
        <App />
      </ErrorBoundary>
    );
    setTimeout(() => {
      fireEvent.click(screen.getByText(/Add/i));
      const titleElement = screen.getByText(/Add Todo/i);
      expect(titleElement).toBeInTheDocument();
      const keyNameElement = screen.getByText(/Title/i);
      expect(keyNameElement).toBeInTheDocument();
      const addButtonElement = screen.getByText(/Add/i);
      expect(addButtonElement).toBeInTheDocument();
      const closeButtonElement = screen.getByLabelText('svg');
      expect(closeButtonElement).toBeInTheDocument();
    }, 2000)
  })

  it('Should render update todo modal', () => {
    render(
      <ErrorBoundary FallbackComponent={errorHandler}>
        <App />
      </ErrorBoundary>
    );
    setTimeout(() => {
      fireEvent.click(screen.getByText(/Update/i));
      const titleElement = screen.getByText(/Update Todo/i);
      expect(titleElement).toBeInTheDocument();
      const keyNameElement = screen.getByText(/Title/i);
      expect(keyNameElement).toBeInTheDocument();
      const updateButtonElement = screen.getByText(/Update/i);
      expect(updateButtonElement).toBeInTheDocument();
      const closeButtonElement = screen.getByLabelText('svg');
      expect(closeButtonElement).toBeInTheDocument();
    }, 2000)
  })

  it('Should render delete todo modal', () => {
    render(
      <ErrorBoundary FallbackComponent={errorHandler}>
        <App />
      </ErrorBoundary>
    );
    setTimeout(() => {
      fireEvent.click(screen.getByText(/Delete/i));
      const titleElement = screen.getByText(/Delete Todo/i);
      expect(titleElement).toBeInTheDocument();
      const contentElement = screen.getByText(/Are you going to delete current todo?/i);
      expect(contentElement).toBeInTheDocument();
      const okButtonElement = screen.getByText(/Ok/i);
      expect(okButtonElement).toBeInTheDocument();
      const cancelButtonElement = screen.getByText(/Cancel/i);
      expect(cancelButtonElement).toBeInTheDocument();
      const closeButtonElement = screen.getByLabelText('svg');
      expect(closeButtonElement).toBeInTheDocument();
    }, 2000)
  })
});
