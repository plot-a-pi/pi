import React, { useEffect } from 'react';
import styles from './Home.css';
import PiCrawler from '../common/PiCrawler';
import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import CvsDScatterplot from '../graphs/CvsDScatterplot';
import CvDGraphStats from '../stats/CvDGraphStats';
import PivsCountScatterplot from '../graphs/PivsCountScatterplot';

const Home = () => {

  const emitRetrievedDataPoints = useEmitEvent('RETRIEVE_DATA_POINTS');
  const emitGlobalStats = useEmitEvent('RETRIEVE_GLOBAL_STATS');
  const socket = useSocket();
  const { stats } = useSocketState();
  const { points } = useSocketState();

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitRetrievedDataPoints();
      emitGlobalStats();
    }

  }, [socket.connected]);    

  const piApproximationsArray = stats.piApproximationArray;
  const dataArray = piApproximationsArray.map((pi, i) => [i + 1, pi]);
  
  return (
    <>
      <div className={styles.Home}>
        <div className={styles.leftWide}>
          <CvsDScatterplot data={points} stats={stats} title={'Global Circle Measurements'} line={true} /> 
        </div>
        <div className={styles.rightWide}>
          <div className={styles.stats}>
            <CvDGraphStats stats={stats}/>
          </div>
          <div className={styles.pivscount}>
            <PivsCountScatterplot data={dataArray} title={'Global Pi Approximation vs Count'} xLabel={'Count'} yLabel={'Pi Approximation'} />
          </div>
        </div>
      </div>
      <div className={styles.piCrawler}>
        <PiCrawler />
      </div>
    </>
  );
};

export default Home;
