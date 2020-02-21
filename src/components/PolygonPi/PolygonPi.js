import React, { useState } from 'react';
import PolygonSVG from './PolygonSVG';
import styles from './PolygonPi.css';

const PolygonPi = () => {
  const [n, setN] = useState(6);
  // Kinda cheating to use actual π to calculate approximate π, but I'm not telling.
  const approximatePi = n * Math.sin(Math.PI / n);

  const handleSidesChange = (value) => {
    value = Number(value);
    setN((prevN) => {
      if(value < 3) {
        return prevN;
      }
      return value;
    });
  };

  return (
    <section className={styles.PolygonPi}>
      <PolygonSVG n={n} />
      <p>Number of sides: <input type="number" 
        value={n} 
        onChange={({ target }) => handleSidesChange(target.value)} /></p>
      <p>Perimeter of Polygon: {(2 * approximatePi).toFixed(8)}</p>
      <p>Approximation of <span className={styles.Pi}>π</span>: {approximatePi.toFixed(8)}</p>
      <p>Error: {(Math.PI - approximatePi).toFixed(8)}</p>
    </section>
  );
};

export default PolygonPi;
