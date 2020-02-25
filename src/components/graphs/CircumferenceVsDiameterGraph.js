import React from 'react';
import Styles from './Scatterplot.css';

const CircumferenceVsDiameterGraph = () => {
  

  return (
    <>
      <div className={Styles.container} style={{ marginBottom: '2em' }}>
        <svg className={Styles.svg}>
          <g className={'x-axis'}></g>
          <g className={'y-axis'}></g>
          <g className={'data'}></g>
        </svg>
      </div>
    </>
  );
};

export default CircumferenceVsDiameterGraph;

