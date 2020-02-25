import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  );
}
