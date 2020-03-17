import React from 'react';
import MathJax from 'react-mathjax';
import styles from './CvDGraphStats.css';
import PropTypes from 'prop-types';

const CvDGraphStats = ({ stats }) => {

  const statsEquation = '\\pi \\, \\approx \\, \\frac {c}{d} \\';

  if(!stats || !stats.mean) return null;

  return (
    <MathJax.Provider>
      <div className={styles.CvDGraphStats}>
        <div className={styles.card}>
          <h2>Points</h2>
          <h3>{stats.count}</h3>
        </div>
        <div className={styles.card}>
          <h2>
            <MathJax.Node className={styles.formula} formula={statsEquation} />
          </h2>
          <h3>{stats.mean.toFixed(3)}</h3>
        </div>
        <div className={styles.card}>
          <h2>Error</h2>
          <h3>{(100 * Math.abs(Math.PI - stats.mean) / Math.PI).toFixed(3)}%</h3>
        </div>
      </div>
    </MathJax.Provider>
  );
};

CvDGraphStats.propTypes = {
  stats: PropTypes.object.isRequired
};

export default CvDGraphStats;
