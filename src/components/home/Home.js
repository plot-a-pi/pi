import React from 'react';
import ButtonNav from '../common/ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CicumferenceVsDiameterWrapper';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import styles from './Home.css';

const Home = () => {

  return (
    <div className={styles.home}>
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
