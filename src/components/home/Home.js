import React, { useEffect } from 'react';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import styles from './Home.css';
import PiCrawler from '../common/PiCrawler';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import CvsDScatterplot from '../graphs/CvsDScatterplot';
import CvDGraphStats from '../graphs/CvDGraphStats';
import PivsCountScatterplot from '../graphs/PivsCountScatterplot';

const Home = () => {

  const emitRetrievedDataPoints = useEmitEvent('RETRIEVE_DATA_POINTS');
  const emitGlobalStats = useEmitEvent('RETRIEVE_GLOBAL_STATS');
  const socket = useSocket();
  const { points } = useSocketState();
  const { stats } = useSocketState();
  const [showIntroModal, toggleIntroModal] = useModal();

  const modalInstructions = (
    <div className={styles.modal}>
      <h3>Would you like to contribute to pi?</h3>
      <br/>
      <p>Measure the circumference and diamter of a circular object and submit your measurements to improve our global approximation of pi.</p>
      <br/>
      <p>How does the approximation change as more data is added?</p>
    </div>);

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitRetrievedDataPoints();
      emitGlobalStats();
    }
  }, [socket.connected]);    

  const piApproximationsArray = stats.piApproximationArray;
  const dataArray = piApproximationsArray.map((pi, i) => [i + 1, pi]);
  
  return (
    <div className={styles.Home}>
      <section className={styles.introduction}>
        <div className={styles.whatsThis}>
          <h3>What&apos;s this about...</h3>
          <button className={styles.modalButton} type='button' onClick={() => toggleIntroModal()}> ? </button>
        </div>
        <Modal showModal={showIntroModal} toggleModal={toggleIntroModal} modalTitle={'Diameter'} modalInstructions={modalInstructions} />
      </section>
      <CvsDScatterplot className={styles.graphA} data={points} stats={stats} title={'Global Circle Measurements'} xLabel='Diameter (in)' yLabel={'Circumference (in)'} /> 
      <CvDGraphStats className={stats} stats={stats}/>
      <PivsCountScatterplot className={styles.graphB} data={dataArray} title={'Global Pi Approximation vs Count'} xLabel={'Count'} yLabel={'Pi Approximation'} />
      <PiCrawler className={styles.piCrawler} />
    </div>
  );
};

export default Home;
