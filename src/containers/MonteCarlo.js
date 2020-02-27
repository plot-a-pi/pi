import React, { useReducer } from 'react';
import MathJax from 'react-mathjax';
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
  
  const derivation = ' \\frac{Darts \\, Inside \\, Circle}{Total \\, Darts} \\, \\approx \\, \\frac{Circle \\, Area}{Square \\, Area} \\, = \\, \\frac{\\pi r^2}{(2r)^2} \\, \\approx \\, \\frac{\\pi}{4}';
  const statsEquation = `\\pi \\, \\approx \\, 4 * \\frac {${circleTotal}}{${dartsTotal}} \\, = \\, ${piApproximation.toFixed(5)}`;

  return (
    <div className={styles.MonteCarlo}>
      <div className={styles.stats}>
        <h3>Darts Inside Circle: <span>{circleTotal}</span></h3>
        <h3>Total Darts: <span>{dartsTotal}</span></h3>
        <MathJax.Provider>
          <div className={styles.stats}>
            <MathJax.Node formula={derivation} />
            <MathJax.Node formula={statsEquation} />
          </div>
        </MathJax.Provider>
      </div>
      <div className={styles.dartContainer}>
        <div className={styles.dartboard}>
          <MonteCarloScatterplot data={dartsArray} />
        </div>
        <MonteCarloControls actions={actions} />
      </div>
      <div className={styles.scatterplot}>
        <Scatterplot data={numDartsVersusPiArray} xMax={dartsTotal} yMax={yMax} />
      </div>
    </div>
  );
};

export default MonteCarlo;
