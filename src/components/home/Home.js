import React from 'react';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CicumferenceVsDiameterWrapper';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import styles from './Home.css';
import { style } from 'd3';

const Home = () => {

  return (
    <>
      <section className={styles.graphs}>
        <CircumferenceVsDiameterWrapper />
        <div className={styles.global}>
          <GlobalPiVsCountGraph />
        </div>
      </section>
      <ButtonNav />
    </>
  );
};

export default Home;
