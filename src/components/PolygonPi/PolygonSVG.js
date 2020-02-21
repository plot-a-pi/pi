import React from 'react';
import PropTypes from 'prop-types';
import styles from './PolygonSVG.css';

const PolygonSVG = ({ n }) => {
  const width = 400;
  const height = 400;
  const padding = 10;
  const transformPoint = ([x, y]) => [(x + 1) * width / 2 + padding, height - (y + 1) * height / 2 + padding];
  const points = [];
  for(let i = 0; i < n; i++) {
    points.push(transformPoint([Math.sin(2 * Math.PI * i / n), 
      Math.cos(2 * Math.PI * i / n)]));
  }
  return (
    <svg
      width={width + 2 * padding}
      height={height + 2 * padding}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx={width / 2 + padding} cy={height / 2 + padding} r={width / 2} className={styles.Circle} />
      <polygon points={points}
        className={styles.Polygon} />
    </svg>);
};

PolygonSVG.propTypes = {
  n: PropTypes.number.isRequired
};

export default PolygonSVG;
