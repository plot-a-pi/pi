import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import DataEntryForm from './controls/DataEntryForm';
import SessionForm from './controls/SessionForm';
import Header from './common/Header';
// import SessionStudentView from './teacherDashboard/SessionStudentView';
import SessionCvsDGraph from './graphs/SessionCvsDGraph';
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
        {/* replace with SessionStudentView to display data entry and SessionCvsDGraph at the same time */}
        <Route path='/session/:id' component={SessionForm} />
        <Route path='/submit-to-global' component={DataEntryForm} />
        <Route path='/session-graph/:id' component={SessionCvsDGraph} />
      </Switch>
    </>
  );
}
