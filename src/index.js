import React from 'react';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import './main.css';


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
