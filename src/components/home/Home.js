import React from 'react';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CicumferenceVsDiameterWrapper';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import styles from './Home.css';
import { style } from 'd3';

const Home = () => {

  return (
    <div className={styles.home}>
      <section className={styles.graphs}>
        <CircumferenceVsDiameterWrapper />
        <div className={styles.global}>
          <GlobalPiVsCountGraph />
        </div>
      </section>
      <div className={styles.buttons}>
        <ButtonNav />
      </div>
    </div>
  );
};

export default Home;
