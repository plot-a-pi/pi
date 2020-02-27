import React from 'react';
import styles from './GraphGridMock.css';

const GraphGridMock = () => {
   
  return (
    <>
      <div className={styles.GraphGridMock}>
        <div className={styles.gridContainer}>
          <div className={styles.yLabel}>
            <p>Y-Label</p> 
          </div>
          <div className={styles.title}>
            <h2>Title</h2>
          </div>
          <div className={styles.graph}>
            <section>
              GRAPH
            </section>
          </div>
          <div className={styles.xLabel}>
            <p>X-Label</p>
          </div>
        </div>
      </div>
    </>
  );
       
};


export default GraphGridMock;
