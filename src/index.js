import React from 'react';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import { SocketProvider } from 'react-socket-io-hooks';
import reducer, { initialState } from './reducer';

render(
  <SocketProvider uri='http://localhost:7891' reducer={reducer} initialState={initialState} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SocketProvider>,
  document.getElementById('root')
);
