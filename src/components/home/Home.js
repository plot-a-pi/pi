import React from 'react';
import Header from '../common/Header';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';

const Home = () => {

  return (
    <>
      <Header />
      <CircumferenceVsDiameterGraph />
      <ButtonNav />
    </>
  );
};

export default Home;
