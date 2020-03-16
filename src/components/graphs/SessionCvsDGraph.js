import React, { useEffect } from 'react';
import CvsDScatterplot from './CvsDScatterplot';
import PropTypes from 'prop-types';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';

const SessionCvsDGraph = ({ match }) => {
  const { id } = match.params;
  const socket = useSocket();

  const emitJoinSession = useEmitEvent('JOIN_SESSION');
<<<<<<< HEAD
  const emitSessionData = useEmitEvent('RETRIEVE_SESSION_DATA');
  const emitSessionStats = useEmitEvent('GET_SESSION_STATS');
  const { sessionData, sessionStats } = useSocketState();
=======
  const emitSessionData = useEmitEvent('GET_SESSION_DATA');
  const emitSessionStats = useEmitEvent('GET_SESSION_STATS');
  const { sessionData } = useSocketState();
>>>>>>> bba9d0539f0509cfab72c16cc4eb2c53abd03ca8

  useEffect(() => {

    if(socket.connected !== undefined) {
      emitJoinSession(id);
      emitSessionData(id);
      emitSessionStats(id);
    }

  }, [socket.connected]);

  if(!sessionData || !sessionData[0] || !sessionStats || !sessionStats.mean) return null;

  return (
    <CvsDScatterplot data={sessionData[0]} stats={sessionStats} title={'Class Circle Measurement Data'} xLabel={'Diameter (in)'} yLabel={'Circumference (in)'} />
  );

};
SessionCvsDGraph.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default SessionCvsDGraph;
