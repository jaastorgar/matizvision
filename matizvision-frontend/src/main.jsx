import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FontSizeProvider } from './context/FontSizeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FontSizeProvider>
      <App />
    </FontSizeProvider>
  </BrowserRouter>
);