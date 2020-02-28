import React from 'react';
import ButtonNav from '../common/ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CicumferenceVsDiameterWrapper';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import styles from './Home.css';

const Home = () => {
  const [showIntroModal, toggleIntroModal] = useModal();


  return (
    <div className={styles.home}>
      <section className={styles.introduction}>
        <h2>What`&apos;`s this about?</h2>
        <button className={styles.modalButton} type='button' onClick={() => toggleIntroModal()}> ? </button>
        <Modal showModal={showIntroModal} toggleModal={toggleIntroModal} modalTitle={'Diameter'} modalInstructions={'Would you like to contribute to pi?  Measure the circumference and diamter of a circular object and submit your measurements to improve our global approximation of pi.  How does the approximation change as more data is added?'} />


      </section>
      <section className={styles.graphs}>
        <CircumferenceVsDiameterWrapper />
        <div>
          <GlobalPiVsCountGraph />
        </div>
      </section>
    </div>
  );
};

export default Home;
