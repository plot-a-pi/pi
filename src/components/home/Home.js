import React from 'react';
import Header from '../common/Header';
import Nav from '../common/Nav';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';
import GraphLabelWrapper from '../common/GraphLabelWrapper';
import Stats from './Stats';
import Seed from '../common/Seed';

const Home = () => {

  return (
    <>
      <Nav />
      <Header />
      <CircumferenceVsDiameterWrapper />
      <Stats />
      <ButtonNav />
    </>
  );
};

export default Home;
