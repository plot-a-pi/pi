import React from 'react';
import Scatterplot from './Scatterplot';
// import { useFirestore } from '../../firebase/hooks';
// import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';

const CircumferenceVsDiameterGraph = () => {
  let yMax = 20;
  let xMax = 20;
  let dataArray = [[10, 15], [5, 10], [15, 20]];
  // const data = useFirestore(globalDataCollection, []);
  // const stats = useFirestore(globalStatsCollection.doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 });
  // dataArray = (data.map(point => [point.circumference, point.diameter]));


  // xMax = stats.cicumferenceMax;
  // yMax = stats.diameterMax

  return (
    <>
      <Scatterplot data={dataArray} xMax={xMax} yMax ={yMax}/>
    </>
  );
};

export default CircumferenceVsDiameterGraph;
