import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styles from './CircumferenceVsDiameterGraph.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

const CircumferenceVsDiameterGraph = ({ data, stats }) => {
  const userPointIds = JSON.parse(localStorage.getItem('my-point-ids'));
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);

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

  const dimensions = useResizeObserver(wrapperRef);
  let globalDataArray = [];
  let userDataPointsArray = [];

  if(!userPointIds){
    globalDataArray = data.map(point => [point.diameter, point.circumference]);
  }
  else {
    globalDataArray = data.filter(point=> (!userPointIds.includes(point.pointId))).map(point => [point.diameter, point.circumference]);
    userDataPointsArray = data.filter(point => userPointIds.includes(point.pointId)).map(point => [point.diameter, point.circumference]);
  }

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const xScale = scaleLinear()
      .domain([0, stats.diameterMax])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, stats.circumferenceMax])
      .range([height, 0]);

    svg
      .selectAll('.user-point')
      .data(userDataPointsArray)
      .join('circle')
      .attr('class', 'user-point')
      .attr('cx', userDataPointsArray => xScale(userDataPointsArray[0]))
      .attr('cy', userDataPointsArray => yScale(userDataPointsArray[1]))
      .attr('r', 50)
      .style('fill', '#FF0000');

    svg
      .selectAll('.global-point')
      .data(globalDataArray)
      .join('circle')
      .attr('class', 'global-point')
      .attr('cx', globalDataArray => xScale(globalDataArray[0]))
      .attr('cy', globalDataArray => yScale(globalDataArray[1]))
      .attr('r', 1.5)
      .style('fill', '#000000');

    svg
      .selectAll('line')
      .remove('line');  
    
    svg
      .append('line')
      .style('stroke', 'blue')
      .style('stroke-width', 5)
      .attr('x1', 0)
      .attr('y1', height)
      .attr('x2', xScale(stats.circumferenceMax / 3))
      .attr('y2', yScale(stats.circumferenceMax));

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));

    svg
      .select('.y-axis')
      .call(axisLeft(yScale));
      
    
  }, [dimensions, data, stats]);

  return (
    <>
      <div className={styles.container} ref={wrapperRef}>
        <svg className={styles.svg} ref={svgRef}>
          <g className={'title'}></g>
          <g className={'x-label'}></g>
          <g className={'x-axis'}></g>
          <g className={'y-label'}></g>
          <g className={'y-axis'}></g>
          <g className={'data'}></g>
        </svg>
      </div>
    </>
  );
};

CircumferenceVsDiameterGraph.propTypes = {
  data: PropTypes.array.isRequired,
  stats: PropTypes.object.isRequired
};

export default CircumferenceVsDiameterGraph;

