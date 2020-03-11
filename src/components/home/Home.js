import React, { useEffect } from 'react';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import styles from './Home.css';
import PiCrawler from '../common/PiCrawler';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';
import CvDGraphStats from '../graphs/CvDGraphStats';

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
  
  return (
    <div className={styles.Home}>
      <section className={styles.introduction}>
        <div className={styles.whatsThis}>
          <h3>What&apos;s this about...</h3>
          <button className={styles.modalButton} type='button' onClick={() => toggleIntroModal()}> ? </button>
        </div>
        <Modal showModal={showIntroModal} toggleModal={toggleIntroModal} modalTitle={'Diameter'} modalInstructions={modalInstructions} />
      </section>
      <CircumferenceVsDiameterGraph className={styles.graphA} data={points} stats={stats} /> 
      <CvDGraphStats className={stats} stats={stats}/>
      <GlobalPiVsCountGraph className={styles.graphB} />
      <PiCrawler className={styles.piCrawler} />
    </div>
  );
};

export default Home;
