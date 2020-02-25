import React from 'react';
import Scatterplot from './Scatterplot';
import { useFirestore } from '../../firebase/hooks';
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';

const CircumferenceVsDiameterGraph = () => {
  let yMax = 100;
  let xMax = 100;
  let dataArray = [];

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
      <Scatterplot data={dataArray} xMax={xMax} yMax ={yMax}/>
    </>
  );
};

export default CircumferenceVsDiameterGraph
;
