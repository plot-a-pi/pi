import React from 'react';
import Nav from '../common/Nav';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';
import GraphLabelWrapper from '../common/GraphLabelWrapper';
import Stats from './Stats';

const Home = () => {

  return (
    <>
      <Nav />
<<<<<<< HEAD
      <Header />
      <CircumferenceVsDiameterWrapper />
      <Stats />
=======
      <GraphLabelWrapper title='globl' xLabel='Diameter' yLabel='Circumfrence'>
        <CircumferenceVsDiameterWrapper />
      </GraphLabelWrapper>
>>>>>>> 16e375a876970f57b9263e8e65f3eea0ae51714e
      <ButtonNav />
    </>
  );
};

export default Home;
