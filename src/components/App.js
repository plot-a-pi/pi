import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import SessionForm from './controls/SessionForm';
import DataEntryForm from './controls/DataEntryForm';

export default function App() {
  return (
<<<<<<< HEAD
    <h1>Hello World</h1>
    
=======
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/session/:id' component={SessionForm} />
      <Route path='/submit-to-global' component={DataEntryForm} />
    </Switch>
>>>>>>> 17f8788e90daa3251184ae79b46b10535343f2f7
  );
}
