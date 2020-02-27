  
import React from 'react';
import { useFirestore } from '../../firebase/hooks';
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';
import CSVButton from '../common/CSVButton';

const CircumferenceVsDiameterWrapper = () => {
  const data = useFirestore(globalDataCollection, []);
  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 });
  const dataForCSV = data.map(datum => ([datum.diameter, datum.circumference]));
  console.log(dataForCSV);
  return (
    <>
      <CSVButton header1='Diameter' header2='Circumference' data={dataForCSV} />
      <div>
        <CircumferenceVsDiameterGraph data={data} stats={stats} xLabel='Diameter (cm)' yLabel='Circumference (cm)' title='Global Data for Circumference Vs. Diameter' />
      </div>
    </>
  );
};

export default CircumferenceVsDiameterWrapper;
