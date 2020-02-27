import React, { useEffect } from 'react';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';

const Stats = () => {
  const emitGlobalStats = useEmitEvent('RETRIEVE_GLOBAL_STATS');
  const socket = useSocket();
  const { stats } = useSocketState();

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitGlobalStats();
    }

  }, [socket.connected]);
  
  if(!stats) return <p>Loading...</p>;

  return (
    <>
      <h2>Sample Size:</h2>
      <p>{stats.count}</p>
      <h2>Pi Approximation:</h2>
      <p>{stats.mean}</p>
    </>
  );
};

export default Stats;
