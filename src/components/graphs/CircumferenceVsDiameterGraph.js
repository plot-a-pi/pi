import React from 'react';
import Scatterplot from './Scatterplot';
import { useFirestore } from '../../firebase/hooks';
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';

const CircumferenceVsDiameterGraph = () => {
  let yMax = 100;
  let xMax = 100;
  let dataArray = [];
<<<<<<< HEAD
  const data = useFirestore(globalDataCollection, []);
  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 });
  dataArray = (data.map(point => [point.circumference, point.diameter]));

  xMax = stats.circumferenceMax;
  yMax = stats.diameterMax;

  return (
    <>
=======

  const data = useFirestore(globalDataCollection);
  const stats = useFirestore(globalStatsCollection);

  if(!data) return <h1>no data</h1>;
  dataArray = (data.map(point => [point.circumference, point.diameter]));

  if(stats && stats.circumferenceMax && stats.diameterMax) {
    xMax = stats.circumferenceMax;
    yMax = stats.diameterMax;
  }

  return (
    <>
      <h1>Graph</h1>
>>>>>>> 17f8788e90daa3251184ae79b46b10535343f2f7
      <Scatterplot data={dataArray} xMax={xMax} yMax ={yMax}/>
    </>
  );
};

<<<<<<< HEAD
export default CircumferenceVsDiameterGraph;
=======
export default CircumferenceVsDiameterGraph
;
>>>>>>> 17f8788e90daa3251184ae79b46b10535343f2f7
