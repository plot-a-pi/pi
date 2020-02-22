import React from 'react';
import ScatterGraph from '../components/graphs/ScatterGraph';
import dartsArray from '../data/montecarlo';

export default function App() {
  return (
    <ScatterGraph data={dartsArray} xMax={1} yMax={1} xLabel={'x'} yLabel={'y'} title={'Monte Carlo Pi Approximation'} />
  );
}
