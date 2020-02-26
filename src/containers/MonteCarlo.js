import React, { useReducer } from 'react';
import MonteCarloControls from '../components/montecarlo/MonteCarloControls';
// import MonteCarloDartsGraph from '../components/monteCarlo/MonteCarloDartsGraph';
import Scatterplot from '../components/graphs/Scatterplot';
import { MonteCarloScatterplot } from '../components/graphs/MonteCarloScatterplot';
import monteCarloReducer from '../reducers/monteCarloReducer';
import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray } from '../selectors/monteCarloSelectors';
import { add1Dart, add10Darts, add100Darts, add1000Darts, clearDarts } from '../actions/monteCarloActions';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';

const MonteCarlo = () => {
  const [piState, dispatch] = useReducer(monteCarloReducer, { piApproximation: null, dartsTotal: 1, circleTotal: 1, dartsArray: [], piApproximationsArray: [] });

  const actions = [
    { name: 'ADD_1_DART', text: '1', actionCreator: () => dispatch(add1Dart()) },
    { name: 'ADD_10_DARTS', text: '10', actionCreator: () => dispatch(add10Darts()) },
    { name: 'ADD_100_DARTS', text: '100', actionCreator: () => dispatch(add100Darts()) },
    { name: 'ADD_1000_DARTS', text: '1000', actionCreator: () => dispatch(add1000Darts()) },
    { name: 'CLEAR_DARTS', text: 'Reset', actionCreator: () => dispatch(clearDarts()) }
  ];

  // change to select

  const piApproximation = getPiApproximation(piState);
  const dartsTotal = getDartsTotal(piState);
  const dartsArray = getDartsArray(piState);
  const numDartsVersusPiArray = getNumDartsVersusPiArray(piState);

  return (
    <>
      <Header />
      <Nav />
      {/* <h1>{piApproximation}</h1> */}
      <MonteCarloScatterplot data={dartsArray} xMax={1} yMax={1} />
      <MonteCarloControls actions={actions} />
      <Scatterplot data={numDartsVersusPiArray} xMax={dartsTotal} yMax={5} />
    </>
  );
};

export default MonteCarlo;
