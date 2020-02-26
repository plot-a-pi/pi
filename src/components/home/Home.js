import React from 'react';
import Header from '../common/Header';
import Nav from '../common/Nav';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';
import GraphLabelWrapper from '../common/GraphLabelWrapper';

const Home = () => {

  return (
    <>
      <Nav />
      <Header />
      <GraphLabelWrapper title='globl' xLabel='Diameter' yLabel='Circumfrence'>
        <CircumferenceVsDiameterGraph />
      </GraphLabelWrapper>
      <ButtonNav />
    </>
  );
};

export default Home;
