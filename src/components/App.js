import React from 'react';
import DataEntryForm from '../components/controls/DataEntryForm';
import Stats from '../components/home/Stats';
import CircumferenceVsDiameterGraph from '../components/graphs/CircumferenceVsDiameterGraph';
import GlobalPiVsCountGraph from './graphs/GlobalPiVsCountGraph';

export default function App() {
  return (
    <>
      <DataEntryForm />
      <Stats />
      <CircumferenceVsDiameterGraph />
      <GlobalPiVsCountGraph />
    </>
    
  );
}
