import React from 'react';
import ScatterGraph from '../graphs/ScatterGraph';
import { generateMonteCarloData } from '../../data/montecarlo';
const monteCarloData = generateMonteCarloData(1000);
const dartsArray = monteCarloData.dartsArray;
const sampleSizVersusPi = monteCarloData.sampleSizeVersusPiArray;

const MonteCarloDartsGraph = () => {

  return (
    <>
      <ScatterGraph data={dartsArray} xMax={1} yMax={1} xLabel={'x'} yLabel={'y'} title={'Darts'} />
      <ScatterGraph data={sampleSizVersusPi} xMax={1000} yMax={5} xLabel={'Sample Size'} yLabel={'Pi Approximation'} title={'Monte Carlo Pi Approximation'} />
    </>
  );
};

export default MonteCarloDartsGraph;
