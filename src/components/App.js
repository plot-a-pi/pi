import React from 'react';
import ScatterGraph from './graphs/ScatterGraph';

export default function App() {
  return (
    <ScatterGraph data={[[3, 6], [5, 15], [90, 150]]} xMax={90} yMax={150} xLabel={'XXX'} yLabel={'hiiiiii'} title={'Values vs Values'}/>
  );
}
