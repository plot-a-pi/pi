import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useFirestore } from '../../firebase/hooks';
import Styles from './Scatterplot.css';
import Scatterplot from './Scatterplot';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase';
import ResizeObserver from 'resize-observer-polyfill';

const CircumferenceVsDiameterGraph = () => {
  let dataArray = [];
  const data = useFirestore(globalDataCollection, []);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const stats = useFirestore(globalStatsCollection.doc('current-stats'), { circumferenceMax: 50, diameterMax: 50 });

  dataArray = (data.map(point => [point.circumference, point.diameter]));

  let xMax = stats.circumferenceMax;
  let yMax = stats.diameterMax;

  const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);
  
    useEffect(() => {
      const observeTarget = ref.current;
      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => setDimensions(entry.contentRect));
      });
      resizeObserver.observe(observeTarget);
      return () => {
        resizeObserver.unobserve(observeTarget);
      };
    }, [ref]);
    return dimensions;
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const xScale = scaleLinear()
      .domain([0, xMax])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', data => xScale(data[0]))
      .attr('cy', data => yScale(data[1]))
      .attr('r', 1.5)
      .style('fill', '#000000');

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));

    svg
      .select('.y-axis')
      .call(axisLeft(yScale));
      
    
  }, [data, dimensions]);

  return (
    <>
      <div className={Styles.container} ref={wrapperRef} style={{ marginBottom: '2em' }}>
        <svg className={Styles.svg} ref={svgRef}>
          <g className={'x-axis'}></g>
          <g className={'y-axis'}></g>
          <g className={'data'}></g>
        </svg>
      </div>
    </>
  );
};

CircumferenceVsDiameterGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired
};

export default CircumferenceVsDiameterGraph;

