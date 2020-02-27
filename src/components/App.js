import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import SessionForm from './controls/SessionForm';
import DataEntryForm from './controls/DataEntryForm';
import Header from './common/Header';
import SessionGraph from './graphs/SessionGraph';
import TeacherSessions from './teacherDashboard/TeacherSessions';
import TeacherDashboard from './teacherDashboard/TeacherDashboard';
import { withSession } from '../firebase/AuthProvider';
import MonteCarlo from '../containers/MonteCarlo';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/montecarlo' component={MonteCarlo} />
        <Route path='/teachers' component={TeacherDashboard} />
        <Route path='/teacher-sessions' component={withSession(TeacherSessions)} />
        <Route path='/session/:id' component={SessionForm} />
        <Route path='/submit-to-global' component={DataEntryForm} />
        <Route path='/session-graph/:id' component={SessionGraph} />
      </Switch>
    </>
  );
}

// 
