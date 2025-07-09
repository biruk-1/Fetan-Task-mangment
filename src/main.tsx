import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { makeServer } from './services/mockServer';
import App from './App';
import './index.css';

// Start the mock API server
if (process.env.NODE_ENV === 'development') {
  makeServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
); 