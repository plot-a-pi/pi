import React, { useReducer } from 'react';
import styles from './MonteCarlo.css';
import MonteCarloControls from '../components/montecarlo/MonteCarloControls';
// import MonteCarloDartsGraph from '../components/monteCarlo/MonteCarloDartsGraph';
import Scatterplot from '../components/graphs/Scatterplot';
import { MonteCarloScatterplot } from '../components/graphs/MonteCarloScatterplot';
import monteCarloReducer from '../reducers/monteCarloReducer';
import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray, getYMax, getCircleTotal } from '../selectors/monteCarloSelectors';
import { add1Dart, add10Darts, add100Darts, add1000Darts, clearDarts } from '../actions/monteCarloActions';
import GraphLabelWrapper from '../components/common/GraphLabelWrapper';

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
      {/* <GraphLabelWrapper title='monteCarlo' xLabel='x' yLabel='y'> */}
      <MonteCarloScatterplot data={dartsArray} xMax={1} yMax={1} />
      {/* </GraphLabelWrapper> */}
      <MonteCarloControls actions={actions} />
      {/* <GraphLabelWrapper title='scatterPlot' xLabel='x2' yLabel='y2'> */}
      <Scatterplot data={numDartsVersusPiArray} xMax={dartsTotal} yMax={yMax} />
      {/* </GraphLabelWrapper> */}
    </div>
  );
};

export default MonteCarlo;
