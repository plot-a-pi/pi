import React from 'react';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import { AuthProvider } from './firebase/AuthProvider';
import './main.css';


render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
