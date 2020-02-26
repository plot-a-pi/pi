import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import SessionForm from './controls/SessionForm';
import DataEntryForm from './controls/DataEntryForm';
import SessionGraph from './graphs/SessionGraph';
import TeacherSessions from './teacherDashboard/TeacherSessions';
import TeacherDashboard from './teacherDashboard/TeacherDashboard';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/teachers' component={TeacherDashboard} />
      <Route path='/teacher-sessions' component={TeacherSessions} />
      <Route path='/session/:id' component={SessionForm} />
      <Route path='/submit-to-global' component={DataEntryForm} />
      <Route path='/session-graph/:id' component={SessionGraph} />
    </Switch>
  );
}
