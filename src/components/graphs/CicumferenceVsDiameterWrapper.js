import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import React, { useEffect } from 'react';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';
import CSVButton from '../common/CSVButton';
import graphContainerStyles from './CircumferenceVsDiameter.css';
import CvDGraphStats from './CvDGraphStats';


const CircumferenceVsDiameterWrapper = () => {
  const emitRetrievedDataPoints = useEmitEvent('RETRIEVE_DATA_POINTS');
  const emitGlobalStats = useEmitEvent('RETRIEVE_GLOBAL_STATS');
  const socket = useSocket();
  const { points } = useSocketState();
  const { stats } = useSocketState();

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitRetrievedDataPoints();
      emitGlobalStats();
    }
  }, [socket.connected]);

  const dataForCSV = points.map(datum => ([datum.diameter, datum.circumference]));
  
  return (
    <>
      <div className={graphContainerStyles.GraphGridMock}>
        <CircumferenceVsDiameterGraph data={points} stats={stats} />
        <CSVButton  header1='Diameter (in)' header2='Circumference (in)' data={dataForCSV} />
      </div>      
      <CvDGraphStats stats={stats}/>
    </>
  );
};

export default CircumferenceVsDiameterWrapper;
