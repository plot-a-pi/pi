import React, { useReducer } from 'react';
import MathJax from 'react-mathjax';
import styles from './MonteCarlo.css';
import Modal from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import MonteCarloControls from '../components/montecarlo/MonteCarloControls';
import PivsCountScatterplot from '../components/graphs/PivsCountScatterplot';
import { MonteCarloDartBoard } from '../components/graphs/MonteCarloDartBoard';
import monteCarloReducer from '../reducers/monteCarloReducer';
import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray, getCircleTotal } from '../selectors/monteCarloSelectors';
import { addDarts, clearDarts } from '../actions/monteCarloActions';

const MonteCarlo = () => {

  const [piState, dispatch] = useReducer(monteCarloReducer, { piApproximation: null, dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximationsArray: [] });

  const [showDerivationModal, toggleDerivationModal] = useModal();

  const actions = [
    { name: 'ADD_1_DART', text: '1', actionCreator: () => dispatch(addDarts(1)) },
    { name: 'ADD_10_DARTS', text: '10', actionCreator: () => dispatch(addDarts(10)) },
    { name: 'ADD_100_DARTS', text: '100', actionCreator: () => dispatch(addDarts(100)) },
    { name: 'ADD_1000_DARTS', text: '1000', actionCreator: () => dispatch(addDarts(1000)) },
    { name: 'CLEAR_DARTS', text: 'Reset', actionCreator: () => dispatch(clearDarts()) }
  ];

  const piApproximation = getPiApproximation(piState);
  const dartsTotal = getDartsTotal(piState);
  const circleTotal = getCircleTotal(piState);
  const dartsArray = getDartsArray(piState);
  const numDartsVersusPiArray = getNumDartsVersusPiArray(piState);

  const derivation = ' \\frac{Darts \\, in \\, Circle}{Total \\, Darts} \\, \\approx \\, \\frac{Circle \\, Area}{Square \\, Area} \\, = \\, \\frac{\\pi r^2}{(2r)^2} \\, \\approx \\, \\frac{\\pi}{4}';
  const statsEquation = `\\pi \\, \\approx \\, 4 * \\frac {${circleTotal}}{${dartsTotal}} \\, = \\, ${piApproximation.toFixed(5)}`;

  const modalInstructions = (
    <div className={styles.modal}>
      <h3>Pi Approximation Derivation</h3>
      <br/>
      <MathJax.Provider >
        <MathJax.Node formula={derivation} style={{ 'fontSize' : '12px', 'fontStyle': 'bold' }}/>
      </MathJax.Provider>
    </div>);

  return (
    <div className={styles.MonteCarlo}>
      <div className={styles.dartBoard}>
        <MonteCarloDartBoard data={dartsArray} />
      </div>
      <h3>Add Darts</h3>
      <div className={styles.controls}>
        <MonteCarloControls actions={actions} />
      </div>
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
      <div className={styles.pivsCountScatterplot}>
        <PivsCountScatterplot data={numDartsVersusPiArray} title={'Pi Approximation vs Total Darts'} xLabel='Darts' yLabel='Pi Approximation'/>
      </div>
    </div>
  );
};

export default MonteCarlo;
