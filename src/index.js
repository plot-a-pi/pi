import React from 'react';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import { SocketProvider } from 'react-socket-io-hooks';
import reducer, { initialState } from './reducer';
import { AuthProvider } from './firebase/AuthProvider';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './main.css';

render(
  <Provider store={store}>
    <SocketProvider uri='https://pi-be.herokuapp.com/' reducer={reducer} initialState={initialState} >
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SocketProvider>
  </Provider>
  ,
  document.getElementById('root')
);
