import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styles from './ScatterGraph.css';
import { createD3Scatterplot } from '../../d3/scatterplot';

const ScatterGraph = ({ data, xMax, yMax, xLabel, yLabel, title }) => {
  const [containerWidth, setContainerWidth] = useState(800);
  const [containerHeight, setContainerHeight] = useState(800);

  const d3Container = useRef(null);
  useEffect(
    () => {
      if(data && d3Container.current) {
        createD3Scatterplot(d3Container, data, xMax, yMax, xLabel, yLabel, title, containerWidth, containerHeight);
      }
    },
    [data, d3Container.current]);
  return (
    <svg
      className="d3-component"

      // these need to adjust based on media queries and page dependent:  home or big graph
      width={containerWidth}
      height={containerHeight}
      ref={d3Container}
    />
  );
};

ScatterGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired
};

export default ScatterGraph;
