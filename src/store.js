const { createStore } = require('redux');
import userReducer from './reducers/userReducer';

export default createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
