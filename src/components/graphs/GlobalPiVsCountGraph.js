import React, { useEffect } from 'react';
import Scatterplot from './Scatterplot';
import Styles from './Scatterplot.css';
import { useEmitEvent, useSocket, useSocketState } from 'react-socket-io-hooks';
import GraphGridStyles from './GlobalPiVsCountGrid.css';

const GlobalPiVsCountGraph = () => {
  const emitGlobalStats = useEmitEvent('RETRIEVE_GLOBAL_STATS');
  const socket = useSocket();
  const { stats } = useSocketState();

  useEffect(() => {
    if(socket.connected !== undefined) {
      emitGlobalStats();
    }

  }, [socket.connected]);

  const piApproximationsArray = stats.piApproximationArray;
  const dataArray = piApproximationsArray.map((pi, i) => [i + 1, pi.toFixed(2)]);

  return (
    <>
      <div className={GraphGridStyles.GraphGridStyles}>
        <div className={GraphGridStyles.gridContainer}>
          <div className={GraphGridStyles.yLabel}>
            <p>Pi Approximation</p> 
          </div>
          <div className={GraphGridStyles.title}>
            <h2>Global Pi Approximation vs Count</h2>
          </div>
          <div className={GraphGridStyles.graph}>
            <section>
              <Scatterplot className={Styles.global} data={dataArray} xMax={stats.count + 1} yMax={stats.mean + 1} />
            </section>
          </div>
          <div className={GraphGridStyles.xLabel}>
            <p>Count</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalPiVsCountGraph;
