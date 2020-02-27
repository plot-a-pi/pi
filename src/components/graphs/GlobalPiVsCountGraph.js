import React, { useEffect } from 'react';
import Scatterplot from './Scatterplot';
import Styles from './Scatterplot.css';
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
    <>
      <Scatterplot className={Styles.global} data={dataArray} xMax={stats.count + 1} yMax={stats.mean + 1} />
    </>
  );
};

export default GlobalPiVsCountGraph;
