import React from 'react';
import styles from './GraphGridMock.css';

const GraphGridMock = () => {
   
  return (
    <div className={styles.GraphGridMock}>
      <div className={styles.gridContainer}>
        <div className={styles.yLabel}>
          <h2>Y-Label</h2> 
        </div>
        <div className={styles.title}>
          <h1>Title</h1>
        </div>
        <div className={styles.graph}>
          <section>
            Graph
          </section>
        </div>
        <div className={styles.xLabel}>
          <h2>X-Label</h2>
        </div>
      </div>
    </div>
  );
       
};


export default GraphGridMock;
