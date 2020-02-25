import React from 'react';
import Nav from './common/Nav';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Nav />
    </Router>
  );
}

