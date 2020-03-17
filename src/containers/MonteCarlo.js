import React, { useReducer } from 'react';
import styles from './MonteCarlo.css';
import MathJax from 'react-mathjax';
import MonteCarloControls from '../components/montecarlo/MonteCarloControls';
import PivsCountScatterplot from '../components/graphs/PivsCountScatterplot';
import MonteCarloStats from '../components/stats/MonteCarloStats';
import { MonteCarloDartBoard } from '../components/graphs/MonteCarloDartBoard';
import monteCarloReducer from '../reducers/monteCarloReducer';
import Modal from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import { getPiApproximation, getDartsTotal, getDartsArray, getNumDartsVersusPiArray, getCircleTotal } from '../selectors/monteCarloSelectors';
import { addDarts, clearDarts } from '../actions/monteCarloActions';

const MonteCarlo = () => {

  const [piState, dispatch] = useReducer(monteCarloReducer, { piApproximation: null, dartsTotal: 0, circleTotal: 0, dartsArray: [], piApproximationsArray: [] });
  const derivation = '\\frac{Circle \\, Area}{Square \\, Area} \\, = \\, \\frac{\\pi r^2}{(2r)^2} \\, \\approx \\, \\frac{Darts \\, in \\, Circle}{Total \\, Darts} \\, \\approx \\,  \\frac{\\pi}{4}';

  const [showDerivationModal, toggleDerivationModal] = useModal();

  const modalInstructions = (
    <div className={styles.modal}>
      <MathJax.Provider >
        <MathJax.Node className={styles.derivation} formula={derivation} style={{ 'fontSize' : '2vw', 'fontStyle': 'bold' }}/>
      </MathJax.Provider>
    </div>);

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

  return (
    <div className={styles.MonteCarlo}>
      <div className={styles.dartsAndControls}>
        <div className={styles.dartBoard}>
          <MonteCarloDartBoard data={dartsArray} />
        </div>
        <div className={styles.controls}>
          <h3 className={styles.addDarts}>Add Darts</h3>
          <MonteCarloControls actions={actions} />
        </div>
      </div>
      <button className={styles.modalButton} type='button' onClick={() => toggleDerivationModal()}> Pi Approximation Derivation </button>
      <div>
        <MonteCarloStats piApproximation={piApproximation} dartsTotal={dartsTotal} circleTotal={circleTotal} />
      </div>
      <div className={styles.pivsCountScatterplot}>
        <PivsCountScatterplot data={numDartsVersusPiArray} title={'Pi Approximation vs Total Darts'} xLabel='Darts' yLabel='Pi Approximation'/>
      </div>
      <Modal showModal={showDerivationModal} toggleModal={toggleDerivationModal} modalTitle={'Circumference'} modalInstructions={modalInstructions}>
      </Modal>
    </div>
  );
};

export default MonteCarlo;
