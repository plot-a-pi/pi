import { useEmitEvent, useSocketState, useSocket } from 'react-socket-io-hooks';
import React, { useEffect } from 'react';
import CircumferenceVsDiameterGraph from '../graphs/CircumferenceVsDiameterGraph';
import CSVButton from '../common/CSVButton';
import graphContainerStyles from './CircumferenceVsDiameter.css';
import CvDGraphStats from './CvDGraphStats';


const CircumferenceVsDiameterWrapper = () => {
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

  const dataForCSV = points.map(datum => ([datum.diameter, datum.circumference]));
  
  return (
    <>
      <div className={graphContainerStyles.GraphGridMock}>
        <div className={graphContainerStyles.gridContainer}>
          <div className={graphContainerStyles.yLabel}>
            <p>Circumference (in)</p> 
          </div>
          <div className={graphContainerStyles.title}>
            <h2>Global Data for Circumference Vs Diameter</h2>
          </div>
          <div className={graphContainerStyles.graph}>
            <section>
              <CircumferenceVsDiameterGraph data={points} stats={stats} />
            </section>
          </div>
          <div className={graphContainerStyles.xLabel}>
            <p>Diameter (in)</p>
            <CSVButton  header1='Diameter' header2='Circumference' data={dataForCSV} />
          </div>
        </div>
      </div>      
      <CvDGraphStats stats={stats}/>
    </>
  );
};

export default CircumferenceVsDiameterWrapper;
