import React from 'react';
import styles from './GraphLabelWrapper.css';

const GraphLabelWrapper = ({ xLabel, yLabel, title, children }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.graph}>
        {children}
      </div>
      <h3 className={styles.x}>{xLabel}</h3>
      <div className={styles.left}>
        <h3 className={styles.y}>{yLabel}</h3>
      </div>
    </div>
  );

};
export default GraphLabelWrapper;
