import React from 'react';
import Nav from '../common/Nav';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';
import GraphLabelWrapper from '../common/GraphLabelWrapper';

const Home = () => {

  return (
    <>
      <Nav />
      <GraphLabelWrapper title='globl' xLabel='Diameter' yLabel='Circumfrence'>
        <CircumferenceVsDiameterWrapper />
      </GraphLabelWrapper>
      <ButtonNav />
    </>
  );
};

export default Home;
