import React from 'react';
import Header from '../common/Header';
import Nav from '../common/Nav';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';

const Home = () => {

  return (
    <>
      <Nav />
      <Header />
      <CircumferenceVsDiameterWrapper />
      <ButtonNav />
    </>
  );
};

export default Home;
