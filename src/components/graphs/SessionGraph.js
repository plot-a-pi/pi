import React, { useEffect } from 'react';
import Scatterplot from './Scatterplot';
import PropTypes from 'prop-types';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';

const SessionGraph = ({ match }) => {
  const { id } = match.params;
  const socket = useSocket();

  const emitJoinSession = useEmitEvent('JOIN_SESSION');
  const emitSessionData = useEmitEvent('GET_SESSION_DATA');
  const emitSessionStats = useEmitEvent('GET_SESSION_STATS');
  const { sessionData } = useSocketState();
  const { sessionStats } = useSocketState();

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitJoinSession(id);
      emitSessionData(id);
      emitSessionStats(id);
    }
  }, [socket.connected]);

  let yMax = 100;
  let xMax = 100;
  let dataArray = [];

  dataArray = (sessionData.map(point => [point.circumference, point.diameter]));

  xMax = sessionStats.circumferenceMax;
  yMax = sessionStats.diameterMax;

  return (
    <>
      <Scatterplot data={dataArray} xMax={xMax} yMax ={yMax}/>
    </>
  );
};

SessionGraph.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default SessionGraph;
