import React, { useReducer } from 'react';
import MonteCarloControls from '../components/monteCarlo/MonteCarloControls';
import MonteCarloDartsGraph from '../components/monteCarlo/MonteCarloDartsGraph';
import ScatterGraph from '../components/graphs/ScatterGraph';
import monteCarloReducer from '../reducers/monteCarloReducer';
import { getPiApproximation, getSampleSize, getDartsArray, getSampleSizePiArray } from '../selectors/monteCarloSelector';
import { add1Dart, add10Darts, add100Darts, add1000Darts } from '../actions/monteCarloActions';

const MonteCarlo = () => {
  const [monteCarloState, dispatch] = useReducer(monteCarloReducer, { piApproximation: null, sampleSize: null, dartsArray: [], sampleSizePiArray: [] });

  const actions = [
    { name: 'ADD_1_DART', text: '1', actionCreator: () => dispatch(add1Dart()) },
    { name: 'ADD_10_DARTS', text: '10', actionCreator: () => dispatch(add10Darts()) },
    { name: 'ADD_100_DARTS', text: '100', actionCreator: () => dispatch(add100Darts()) },
    { name: 'ADD_1000_DARTS', text: '1000', actionCreator: () => dispatch(add1000Darts()) },
  ];

  const piApproximation = getPiApproximation();
  const sampleSize = getSampleSize();
  const dartsArray = getDartsArray();
  const sampleSizePiArray = getSampleSizePiArray();

  return (
    <>
      <MonteCarloDartsGraph />
      <MonteCarloControls actions={actions} />
      <ScatterGraph data={sampleSizePiArray} xMax={sampleSize} yMax={5} xLabel={'Sample Size of Darts'} yLabel={'Pi Approximation'} title={'Pi Approximation vs Sample Size of Darts'}/>
    </>
  );
};

export default MonteCarlo;
