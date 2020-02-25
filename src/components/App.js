import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Home from './home/Home';
import SessionForm from './controls/SessionForm';
import DataEntryForm from './controls/DataEntryForm';
import TeacherSessions from './teacherDashboard/TeacherSessions';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={TeacherSessions} />
      <Route path='/session/:id' component={SessionForm} />
      <Route path='/submit-to-global' component={DataEntryForm} />
    </Switch>
  );
}
