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
<<<<<<< HEAD
      <CircumferenceVsDiameterGraph data={data} stats={stats} />
=======
      <CircumferenceVsDiameterGraph data={data} stats={stats} xLabel='xlabel' yLabel='ylabel' title='titledyamic from home' />
>>>>>>> 39bab41550944a6d2dd9e37646e9024a454dc99b
    </>
  );
};

export default CircumferenceVsDiameterWrapper;
