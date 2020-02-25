import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import SessionForm from './controls/SessionForm';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/session/:id' component={SessionForm} />
    </Switch>
  );
}
