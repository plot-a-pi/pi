import React from 'react';
import { useFirestore } from '../../firebase/hooks';
import { globalStatsCollection } from '../../firebase/firebase';

const Stats = () => {

  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { count: 0, mean: 'NA' });
  
  return (
    <>
      <h2>Sample Size:</h2>
      <p>{stats.count}</p>
      <h2>Pi Approximation:</h2>
      <p>{stats.mean}</p>
    </>
  );
};

export default Stats;
