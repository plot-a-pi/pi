import React from 'react';
import MathJax from 'react-mathjax';
import styles from './CvDGraphStats.css';
import PropTypes from 'prop-types';

const CvDGraphStats = ({ stats }) => {

  let statsEquation = '\\pi \\, \\approx \\, \\frac {}{}';

  if(!stats) return;

  if(stats.mean) {
    statsEquation = `\\pi \\, \\approx \\, \\frac {c}{d} \\, \\approx \\, ${stats.mean.toFixed(4)}`;
  }
  else {
    statsEquation = `\\pi \\, \\approx \\, \\frac {c}{d} \\, \\approx \\, ${stats.mean}`;
  }
  
  return (
    <div className={styles.CvDGraphStats}>
      <h3>Points: <span>{stats.count}</span></h3>
      <MathJax.Provider>
        <div className={styles.formula}>
          <MathJax.Node formula={statsEquation} />
        </div>
      </MathJax.Provider>
    </div>
  );
};

CvDGraphStats.propTypes = {
  stats: PropTypes.object.isRequired
};

export default CvDGraphStats;
