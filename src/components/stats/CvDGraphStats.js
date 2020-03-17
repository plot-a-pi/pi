import React from 'react';
import styles from './CvDGraphStats.css';
import PropTypes from 'prop-types';

const CvDGraphStats = ({ stats }) => {

  if(!stats || !stats.mean) return null;

  return (
    <div className={styles.CvDGraphStats}>
      <div className={styles.card}>
        <h2>Points</h2>
        <h3>{stats.count}</h3>
      </div>
      <div className={styles.card}>
        <h2>&pi; &asymp;</h2>
        <h3>{stats.mean.toFixed(3)}</h3>
      </div>
      <div className={styles.card}>
        <h2>Error</h2>
        <h3>{(100 * Math.abs(Math.PI - stats.mean) / Math.PI).toFixed(3)}%</h3>
      </div>
    </div>
  );
};

CvDGraphStats.propTypes = {
  stats: PropTypes.object.isRequired
};

export default CvDGraphStats;
