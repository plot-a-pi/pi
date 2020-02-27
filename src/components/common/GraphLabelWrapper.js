import React from 'react';
import PropTypes from 'prop-types';
import styles from './GraphLabelWrapper.css';

const GraphLabelWrapper = ({ xLabel, yLabel, title, children }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.x}>{xLabel}</h3>
      <div className={styles.left}>
        <h3 className={styles.y}>{yLabel}</h3>
      </div>
    </div>
  );

};

GraphLabelWrapper.propTypes = {
  xLabel : PropTypes.string,
  yLabel : PropTypes.string,
  title : PropTypes.string,
  children : PropTypes.node,
};


export default GraphLabelWrapper;
