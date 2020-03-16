import React, { useEffect } from 'react';
import styles from './Home.css';
import PiCrawler from '../common/PiCrawler';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import CvsDScatterplot from '../graphs/CvsDScatterplot';
import CvDGraphStats from '../graphs/CvDGraphStats';
import PivsCountScatterplot from '../graphs/PivsCountScatterplot';

const Home = () => {

  const emitRetrievedDataPoints = useEmitEvent('RETRIEVE_DATA_POINTS');
  const emitGlobalStats = useEmitEvent('RETRIEVE_GLOBAL_STATS');
  const socket = useSocket();
  const { points } = useSocketState();
  const { stats } = useSocketState();

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitRetrievedDataPoints();
      emitGlobalStats();
    }

  }, [socket.connected]);    

  const piApproximationsArray = stats.piApproximationArray;
  const dataArray = piApproximationsArray.map((pi, i) => [i + 1, pi]);
  
  return (
    <div className={styles.Home}>
      <CvsDScatterplot className={styles.graphA} data={points} stats={stats} title={'Global Circle Measurements'} xLabel='Diameter (in)' yLabel={'Circumference (in)'} /> 
      <CvDGraphStats className={stats} stats={stats}/>
      <PivsCountScatterplot className={styles.graphB} data={dataArray} title={'Global Pi Approximation vs Count'} xLabel={'Count'} yLabel={'Pi Approximation'} />
      <PiCrawler className={styles.piCrawler} />
    </div>
  );
};

export default Home;
