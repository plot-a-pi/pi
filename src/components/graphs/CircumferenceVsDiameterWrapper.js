import React from 'react';
import { useFirestore } from '../../firebase/hooks';
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';

const CircumferenceVsDiameterWrapper = () => {
  const data = useFirestore(globalDataCollection, []);
  console.log(data, 'data response from firestore');
  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 });
  console.log(stats, 'stats response from database');

  return (
    <>
      <CircumferenceVsDiameterGraph data={data} stats={stats} />
    </>
  );
};

export default CircumferenceVsDiameterWrapper;
