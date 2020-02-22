import React, { useReducer } from 'react';
import MonteCarloControls from '../components/monteCarlo/MonteCarloControls';
import MonteCarloDartsGraph from '../components/monteCarlo/MonteCarloDartsGraph';
import ScatterGraph from '../components/graphs/ScatterGraph';
import monteCarloReducer from '../reducers/monteCarloReducer';
import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray } from '../selectors/monteCarloSelector';
import { add1Dart, add10Darts, add100Darts, add1000Darts, clearDarts } from '../actions/monteCarloActions';

const MonteCarlo = () => {
  const [monteCarloState, dispatch] = useReducer(monteCarloReducer, { piApproximation: null, dartsTotal: 0, circleTotal: 0, dartsArray: [], dartsTotalPiArray: [] });

  const actions = [
    { name: 'ADD_1_DART', text: '1', actionCreator: () => dispatch(add1Dart()) },
    { name: 'ADD_10_DARTS', text: '10', actionCreator: () => dispatch(add10Darts()) },
    { name: 'ADD_100_DARTS', text: '100', actionCreator: () => dispatch(add100Darts()) },
    { name: 'ADD_1000_DARTS', text: '1000', actionCreator: () => dispatch(add1000Darts()) },
    { name: 'CLEAR_DARTS', text: 'Reset', actionCreator: () => dispatch(clearDarts()) }
  ];

  const piApproximation = getPiApproximation();
  const dartsTotal = getDartsTotal();
  const dartsArray = getDartsArray();
  const numDartsVersusPiArray = getNumDartsVersusPiArray();

  return (
    <>      
      <h1>{piApproximation}</h1>
      <ScatterGraph data={dartsArray} xMax={1} yMax={1} xLabel={'x'} yLabel={'y'} title={'Darts'} />
      {/* <MonteCarloControls actions={actions} /> */}
      <ScatterGraph data={numDartsVersusPiArray} xMax={dartsTotal} yMax={5} xLabel={'Sample Size of Darts'} yLabel={'Pi Approximation'} title={'Pi Approximation vs Sample Size of Darts'}/>
    </>
  );
};

export default MonteCarlo;
