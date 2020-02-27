import React from 'react';
import Header from '../common/Header';
import Nav from '../common/Nav';
import ButtonNav from './ButtonNav';
import CircumferenceVsDiameterWrapper from '../graphs/CircumferenceVsDiameterWrapper';
import GraphLabelWrapper from '../common/GraphLabelWrapper';
import GlobalPiVsCountGraph from '../graphs/GlobalPiVsCountGraph';
import MonteCarlo from '../../containers/MonteCarlo';
import DataEntryForm from '../controls/DataEntryForm';

const Home = () => {

  return (
    <>
      <Nav />
      <Header />
<<<<<<< HEAD
      {/* <DataEntryForm />
      <GraphLabelWrapper title='Global' xLabel='Diameter' yLabel='Circumfrence'>
        <CircumferenceVsDiameterWrapper />
      </GraphLabelWrapper>
      <GraphLabelWrapper title='Global Mean' xLabel='Diameter' yLabel='Circumfrence'>
        <GlobalPiVsCountGraph />
      </GraphLabelWrapper> */}
      <MonteCarlo />

=======
      <CircumferenceVsDiameterWrapper />
>>>>>>> c0a3e0c8567f6ffca11722452da3ce01944a5e61
      <ButtonNav />
    </>
  );
};

export default Home;
