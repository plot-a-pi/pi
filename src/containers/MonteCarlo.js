import React, { useReducer } from 'react';
import styles from './MonteCarlo.css';
import MonteCarloControls from '../components/montecarlo/MonteCarloControls';
// import MonteCarloDartsGraph from '../components/monteCarlo/MonteCarloDartsGraph';
import Scatterplot from '../components/graphs/Scatterplot';
import { MonteCarloScatterplot } from '../components/graphs/MonteCarloScatterplot';
import monteCarloReducer from '../reducers/monteCarloReducer';
import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray, getYMax, getCircleTotal } from '../selectors/monteCarloSelectors';
import { add1Dart, add10Darts, add100Darts, add1000Darts, clearDarts } from '../actions/monteCarloActions';

const MonteCarlo = () => {
  const [piState, dispatch] = useReducer(monteCarloReducer, { piApproximation: null, dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximationsArray: [], yMax: 4 });

  const actions = [
    { name: 'ADD_1_DART', text: '1', actionCreator: () => dispatch(add1Dart()) },
    { name: 'ADD_10_DARTS', text: '10', actionCreator: () => dispatch(add10Darts()) },
    { name: 'ADD_100_DARTS', text: '100', actionCreator: () => dispatch(add100Darts()) },
    { name: 'ADD_1000_DARTS', text: '1000', actionCreator: () => dispatch(add1000Darts()) },
    { name: 'CLEAR_DARTS', text: 'Reset', actionCreator: () => dispatch(clearDarts()) }
  ];

  const piApproximation = getPiApproximation(piState);
  const dartsTotal = getDartsTotal(piState);
  const circleTotal = getCircleTotal(piState);
  const dartsArray = getDartsArray(piState);
  const numDartsVersusPiArray = getNumDartsVersusPiArray(piState);
  const yMax = getYMax(piState);

  return (
    <div className={styles.MonteCarlo}>
      <h2>Darts Inside Circle</h2>
      <h2>{circleTotal}</h2>
      <h2>Total Darts</h2>
      <h2>{dartsTotal}</h2>
      <h2>Current Pi Approximation</h2>
      <h1>{piApproximation.toFixed(4)}</h1>
<<<<<<< HEAD
      <MonteCarloScatterplot data={dartsArray} />
=======
      <MonteCarloScatterplot data={dartsArray} xMax={1} yMax={1} />
>>>>>>> f696384e0388aef34e78b7a0a5be1f31a4285086
      <MonteCarloControls actions={actions} />
      <Scatterplot data={numDartsVersusPiArray} xMax={dartsTotal} yMax={yMax} />
    </div>
  );
};

export default MonteCarlo;
