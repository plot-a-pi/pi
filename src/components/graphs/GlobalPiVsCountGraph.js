import React, { useEffect } from 'react';
import Scatterplot from './Scatterplot';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';

const GlobalPiVsCountGraph = () => {
  const emitGlobalStats = useEmitEvent('RETRIEVE_GLOBAL_STATS');
  const socket = useSocket();
  const { stats } = useSocketState();

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitGlobalStats();
    }

  }, [socket.connected]);

  const piApproximationsArray = stats.piApproximationArray;
  const dataArray = piApproximationsArray.map((pi, i) => [i + 1, pi.toFixed(2)]);

  return (
    <Scatterplot data={dataArray} xMax={stats.count + 1} yMin={1.5} yMax={stats.mean + 0.5} title={'Global Pi Approximation vs Count'} xLabel={'Count'} yLabel={'Pi Approximation'} />
  );
};

export default GlobalPiVsCountGraph;
