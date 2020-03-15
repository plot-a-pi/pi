import React, { useEffect } from 'react';
import CvsDScatterplot from './CvsDScatterplot';
import PropTypes from 'prop-types';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';

const SessionCvsDGraph = ({ match }) => {
  const { id } = match.params;
  const socket = useSocket();

  const emitJoinSession = useEmitEvent('JOIN_SESSION');
  const emitSessionData = useEmitEvent('GET_SESSION_DATA');
  const emitSessionStats = useEmitEvent('GET_SESSION_STATS');
  const { sessionData } = useSocketState();
  console.log({ sessionData });

  useEffect(() => {

    if(socket.connected !== undefined) {
      emitJoinSession(id);
      emitSessionData(id);
      emitSessionStats(id);
    }

  }, [socket.connected]);

  const dataArray = (sessionData.map(point => [point.circumference, point.diameter]));

  return (
    <CvsDScatterplot data={dataArray} title={'Class Circle Measurement Data'} xLabel={'Diameter (in)'} yLabel={'Circumference (in)'} />
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
