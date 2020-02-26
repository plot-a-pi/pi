import React, { useEffect } from 'react';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';

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

  if(!stats) return <p>Loading...</p>;

  return (
    <div>
      <CircumferenceVsDiameterGraph data={points} stats={stats} xLabel='Diameter (cm)' yLabel='Circumference (cm)' title='Global Data for Circumference Vs. Diameter' />
    </div>
  );
};

export default CircumferenceVsDiameterWrapper;
