import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const errorHandler = ({error}: {error:any}): React.JSX.Element => {
  return (<ErrorMessage message={error.message} />);
}

root.render(
  <ErrorBoundary FallbackComponent={errorHandler}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
