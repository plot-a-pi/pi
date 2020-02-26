import React from 'react';
import Header from '../common/Header';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';
import Nav from '../common/Nav';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';

const Home = () => {

  return (
    <>
      <Header />
      <Nav />
      <CircumferenceVsDiameterWrapper />
      <ButtonNav />
    </>
  );
};

export default Home;
