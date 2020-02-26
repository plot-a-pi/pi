import React from 'react';
import { useFirestore } from '../../firebase/hooks';
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';

const CircumferenceVsDiameterWrapper = () => {
  const data = useFirestore(globalDataCollection, []);
  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 });

  return (
    <>
      <CircumferenceVsDiameterGraph data={data} stats={stats} xLabel='xlabel' yLabel='ylabel' title='titledyamic from home' />
    </>
  );
};

export default CircumferenceVsDiameterWrapper;
