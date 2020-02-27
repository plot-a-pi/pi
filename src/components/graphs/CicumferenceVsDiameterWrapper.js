import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import React, { useEffect } from 'react';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';
import CSVButton from '../common/CSVButton';

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
      <CSVButton header1='Diameter' header2='Circumference' data={dataForCSV} />
      <div>
        <CircumferenceVsDiameterGraph data={points} stats={stats} xLabel='Diameter (cm)' yLabel='Circumference (cm)' title='Global Data for Circumference Vs. Diameter' />
      </div> 
    </>
  );
};

export default CircumferenceVsDiameterWrapper;
