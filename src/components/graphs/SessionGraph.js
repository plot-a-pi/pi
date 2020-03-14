import React, { useEffect, useState } from 'react';
//import Scatterplot from './Scatterplot';
import PropTypes from 'prop-types';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';

const SessionGraph = ({ match }) => {
  const { id } = match.params;
  const [xMax, setXMax] = useState(100);
  const [yMax, setYMax] = useState(100);
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

  useEffect(() => {
    if(!sessionStats?.circumferenceMax){
      setXMax(100);
      setYMax(100);
    } else {
      setXMax(sessionStats?.circumferenceMax),
      setYMax(sessionStats?.diameterMax);
    }
  }, [sessionStats]);

  let dataArray = [];

  dataArray = (sessionData.map(point => [point.circumference, point.diameter]));
  return (<></>
  //<Scatterplot data={dataArray} xMax={xMax} yMin={0} yMax ={yMax} title={'Class Circle Measurement Data'} xLabel={'Diameter (in)'} yLabel={'Circumference (in)'} />
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
