import React, { useReducer } from 'react';
import MathJax from 'react-mathjax';
import styles from './MonteCarlo.css';
import Modal from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import MonteCarloControls from '../components/montecarlo/MonteCarloControls';
import ScatterplotPiApprox from '../components/graphs/ScatterplotPiApprox';
import { MonteCarloScatterplot } from '../components/graphs/MonteCarloScatterplot';
import monteCarloReducer from '../reducers/monteCarloReducer';
import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray, getYMin, getYMax, getCircleTotal } from '../selectors/monteCarloSelectors';
import { add1Dart, add10Darts, add100Darts, add1000Darts, clearDarts } from '../actions/monteCarloActions';

const MonteCarlo = () => {

  const [piState, dispatch] = useReducer(monteCarloReducer, { piApproximation: null, dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximationsArray: [], yMin: 2, yMax: 4 });

  const [showDerivationModal, toggleDerivationModal] = useModal();

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
  const yMin = getYMin(piState);
  const yMax = getYMax(piState);


  const derivation = ' \\frac{Darts \\, in \\, Circle}{Total \\, Darts} \\, \\approx \\, \\frac{Circle \\, Area}{Square \\, Area} \\, = \\, \\frac{\\pi r^2}{(2r)^2} \\, \\approx \\, \\frac{\\pi}{4}';
  const statsEquation = `\\pi \\, \\approx \\, 4 * \\frac {${circleTotal}}{${dartsTotal}} \\, = \\, ${piApproximation.toFixed(5)}`;

  const modalInstructions = (
    <div className={styles.modal}>
      <h3>Pi Approximation Derivation</h3>
      <br/>
      <MathJax.Provider >
        <MathJax.Node formula={derivation} style={{ 'font-size' : '12px', 'font-style': 'bold' }}/>
      </MathJax.Provider>
    </div>);

  return (
    <div className={styles.MonteCarlo}>
      <MonteCarloScatterplot data={dartsArray} />
      <MonteCarloControls actions={actions} />
      <MonteCarloScatterplot data={dartsArray} />
      <MonteCarloControls actions={actions} />
      <div className={styles.stats}>
        <div className={styles.dartTotals}>
          <p>Darts In Circle: <span>{circleTotal}</span></p>
          <p>Total Darts: <span>{dartsTotal}</span></p>
        </div>
        <div className={styles.formula}>
          <MathJax.Provider>
            <MathJax.Node formula={statsEquation} />
          </MathJax.Provider>
          <button className={styles.modalButton} type='button' onClick={() => toggleDerivationModal()}> ? </button>
        </div>
      </div>
      <Modal showModal={showDerivationModal} toggleModal={toggleDerivationModal} modalTitle={'Circumference'} modalInstructions={modalInstructions}>
      </Modal>
      <ScatterplotPiApprox data={numDartsVersusPiArray} xMax={dartsTotal} yMin={yMin} yMax={yMax} title={'Pi Approximation vs Total Darts'} xLabel='Darts' yLabel='Pi Approximation'/>
    </div>
  );
};

export default MonteCarlo;
