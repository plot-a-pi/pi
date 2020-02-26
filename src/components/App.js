import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import SessionForm from './controls/SessionForm';
import DataEntryForm from './controls/DataEntryForm';
import SessionGraph from './graphs/SessionGraph';
import MonteCarlo from '../containers/MonteCarlo';

export default function App() {
  return (
    <>
      <MonteCarlo />
      {/* <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/session/:id' component={SessionForm} />
        <Route path='/submit-to-global' component={DataEntryForm} />
        <Route path='/session-graph/:id' render = {() => (
          <SessionGraph />
        )} />
      </Switch> */}
    </>
  );
}

