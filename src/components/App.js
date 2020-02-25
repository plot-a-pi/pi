import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import DataEntryForm from './controls/DataEntryForm';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/submit-to-global' component={DataEntryForm} />
      </Switch>
    </>
  );
}
