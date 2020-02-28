import React, { useEffect } from 'react';
import Scatterplot from './Scatterplot';
import PropTypes from 'prop-types';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';
import styles from '../graphs/CircumferenceVsDiameter.css';

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

  let yMax = sessionStats.circumferenceMax ? sessionStats.circumferenceMax : 100;
  let xMax = sessionStats.diameterMax ? sessionStats.diameterMax : 100;
  let dataArray = [];

  dataArray = (sessionData.map(point => [point.circumference, point.diameter]));
  return (
    <>
      <div className={styles.GraphGridMock}>
        <div className={styles.gridContainer}>
          <div className={styles.yLabel}>
            <p>Circumference</p> 
          </div>
          <div className={styles.title}>
            <h2>Title</h2>
          </div>
          <div className={styles.graph}>
            <section>
              <div className={styles.graphs}>
                <Scatterplot data={dataArray} xMax={xMax} yMax ={yMax}/>
              </div>
            </section>
          </div>
          <div className={styles.xLabel}>
            <p>Diameter</p>
          </div>
        </div>
      </div>
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
