import React from 'react';
<<<<<<< HEAD
import MonteCarlo from '../containers/MonteCarlo';

export default function App() {
  return (
    <MonteCarlo />
=======
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import SessionForm from './controls/SessionForm';
import DataEntryForm from './controls/DataEntryForm';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/session/:id' component={SessionForm} />
      <Route path='/submit-to-global' component={DataEntryForm} />
    </Switch>
>>>>>>> 8ca51cc9eef52bedcefe2c044383ad551ef1fa85
  );
}
