import React, { useEffect } from 'react';
import Scatterplot from './Scatterplot';
import PropTypes from 'prop-types';
import { useFirestore } from '../../firebase/hooks';
import { sessionDataCollection } from '../../firebase/firebase';
import { useEmitEvent } from 'react-socket-io-hooks';

const SessionGraph = ({ match }) => {
  const { id } = match.params;

  const emitJoinSession = useEmitEvent('JOIN_SESSION');

  useEffect(() => {
    emitJoinSession(id);
  }, []);

  let yMax = 100;
  let xMax = 100;
  let dataArray = [];
  const data = useFirestore(sessionDataCollection.doc(id).collection(id), []);
  const stats = useFirestore(sessionDataCollection
    .doc(id)
    .collection('stats')
    .doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 }
  );

  dataArray = (data.map(point => [point.circumference, point.diameter]));

  xMax = stats.circumferenceMax;
  yMax = stats.diameterMax;

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
