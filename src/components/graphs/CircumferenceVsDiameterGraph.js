import React from 'react';
import Scatterplot from './Scatterplot';
import { useFirestore } from '../../firebase/hooks';
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';

const CircumferenceVsDiameterGraph = () => {
  let yMax = 100;
  let xMax = 100;
  let dataArray = [];
  const data = useFirestore(globalDataCollection, []);
  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 });
  dataArray = (data.map(point => [point.circumference, point.diameter]));

  xMax = stats.circumferenceMax;
  yMax = stats.diameterMax;

  return (
    <>
      <Scatterplot data={dataArray} xMax={xMax} yMax ={yMax} yLabel='hey' xLabel='heya' title='title'/>
    </>
  );
};

export default CircumferenceVsDiameterGraph;
