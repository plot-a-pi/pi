import React from 'react';
import CircumferenceVsDiameterWrapper from '../graphs/CicumferenceVsDiameterWrapper';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import styles from './Home.css';
import PiCrawler from '../common/PiCrawler';
import CSVButton from '../common/CSVButton';

const Home = () => {
  const [showIntroModal, toggleIntroModal] = useModal();


  return (
    <div className={styles.home}>
      <section className={styles.introduction}>
        <div className={styles.whatsThis}>
          <h3>What&apos;s this about...</h3>
          <button className={styles.modalButton} type='button' onClick={() => toggleIntroModal()}> ? </button>
        </div>
        <Modal showModal={showIntroModal} toggleModal={toggleIntroModal} modalTitle={'Diameter'} modalInstructions={'Would you like to contribute to pi?  Measure the circumference and diamter of a circular object and submit your measurements to improve our global approximation of pi.  How does the approximation change as more data is added?'} />
      </section>
      <section className={styles.graphs}>
        <CircumferenceVsDiameterWrapper />
        <div>
          <GlobalPiVsCountGraph />
        </div>
      </section>
      <PiCrawler />
    </div>
  );
};

export default Home;
