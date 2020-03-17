import React, { useEffect } from 'react';
import CvsDScatterplot from './CvsDScatterplot';
import PropTypes from 'prop-types';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';
import styles from './SessionCvsDGraph.css';

const SessionCvsDGraph = ({ match }) => {
  const { id } = match.params;
  const socket = useSocket();

  const emitJoinSession = useEmitEvent('JOIN_SESSION');
  const emitSessionData = useEmitEvent('RETRIEVE_SESSION_DATA');
  const emitSessionStats = useEmitEvent('GET_SESSION_STATS');
  const { sessionData, sessionStats } = useSocketState();

  useEffect(() => {

    if(socket.connected !== undefined) {
      emitJoinSession(id);
      emitSessionData(id);
      emitSessionStats(id);
    }

  }, [socket.connected]);

  if(!sessionData || !sessionData[0] || !sessionStats || !sessionStats.mean) return null;

  return (
    <div className={styles.SessionCvsDGraph}>
      <CvsDScatterplot data={sessionData[0]} stats={sessionStats} title={'Class Circle Measurement Data'} xLabel={'Diameter (in)'} yLabel={'Circumference (in)'} line={false} />
    </div>
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
