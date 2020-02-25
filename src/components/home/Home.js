import React from 'react';
import Header from '../common/Header';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';

const Home = () => {

  return (
    <>
      <Header />
      <CircumferenceVsDiameterWrapper />
      <ButtonNav />
    </>
  );
};

export default Home;
