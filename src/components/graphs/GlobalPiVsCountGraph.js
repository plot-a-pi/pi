import React from 'react';
import Scatterplot from './Scatterplot';
import { useFirestore } from '../../firebase/hooks';
import { globalStatsCollection } from '../../firebase/firebase';
import Styles from './Scatterplot.css';

const GlobalPiVsCountGraph = () => {
  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { piApproximationsArray: [], circumferenceMax: 50, diameterMax: 50 });

  const piApproximationsArray = stats.piApproximationsArray;
  const dataArray = piApproximationsArray.map((pi, i) => [i + 1, pi.toFixed(2)]);

  return (
    <>
      <Scatterplot className={Styles.global} data={dataArray} xMax={stats.count + 1} yMax={stats.mean + 1} />
    </>
  );
};

export default GlobalPiVsCountGraph;
