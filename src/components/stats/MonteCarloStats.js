import React from 'react';
import styles from './MonteCarloStats.css';
import PropTypes from 'prop-types';

const MonteCarloStats = ({ piApproximation, dartsTotal, circleTotal }) => {

  return (
    <>
      <div className={styles.MonteCarloStats}>
        <div className={styles.card}>
          <h2>Total Darts</h2>
          <h3>{dartsTotal}</h3>
        </div>
        <div className={styles.card}>
          <h2>Darts in Circle</h2>
          <h3>{circleTotal}</h3>
        </div>
        <div className={styles.card}>
          <h2>&pi; &asymp;</h2>
          <h3>{piApproximation.toFixed(4)}</h3>
        </div>
        <div className={styles.card}>
          <h2>% Error</h2>
          <h3>{(100 * Math.abs((Math.PI - piApproximation) / Math.PI)).toFixed(2)}</h3>
        </div>
      </div>
    </>
  );
};

MonteCarloStats.propTypes = {
  piApproximation: PropTypes.number.isRequired,
  dartsTotal: PropTypes.number.isRequired,
  circleTotal: PropTypes.number.isRequired
};

export default MonteCarloStats;
