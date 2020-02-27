import React from 'react';
import MathJax from 'react-mathjax';
import styles from './CircumferenceVsDiameterGraph.css';
import PropTypes from 'prop-types';

const CvDGraphStats = ({ stats }) => {

  let statsEquation = '\\pi \\, \\approx \\, \\frac {}{}';

  if(!stats) return;
  else {statsEquation = `\\pi \\, \\approx \\, \\frac {c}{d} \\, \\approx \\, ${stats.mean}`;}
  
  
  return (
    <div className={styles.stats}>
      <h2>Total Points: <span>{stats.count}</span></h2>
      <MathJax.Provider>
        <div className={styles.stats}>
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
