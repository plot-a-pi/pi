import React from 'react';
// import Header from '../common/Header';
// import Nav from '../common/Nav';
// import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';
import MonteCarlo from '../../containers/MonteCarlo';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import Styles from './Home.css';

//DON'T LET ME MERGE THESE HOME CHANGES!!!

const Home = () => {

  return (
    <>
      <div className={Styles.testStyling}>
        <CircumferenceVsDiameterWrapper />
        <MonteCarlo />
        <GlobalPiVsCountGraph />
      </div>
    </>
  );
};

export default Home;
