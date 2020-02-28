import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styles from './CircumferenceVsDiameterGraph.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import { useSocketState } from 'react-socket-io-hooks';

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
    globalDataArray = data.filter(point=> (!userPointIds.includes(point.pointId))).map(point => [point.diameter.toFixed(2), point.circumference.toFixed(2)]);
    userDataPointsArray = data.filter(point => userPointIds.includes(point.pointId)).map(point => [point.diameter.toFixed(2), point.circumference.toFixed(2)]);
  }

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${2 / 3 * width}px`);

    const lineEndpoint = stats.mean < stats.circumferenceMax / stats.diameterMax ? [stats.diameterMax, 3 * stats.diameterMax] : [stats.circumferenceMax / 3, stats.circumferenceMax];

    const xScale = scaleLinear()
      .domain([0, stats.diameterMax])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, stats.circumferenceMax])
      .range([height, 0]);

    svg
      .selectAll('line')
      .remove('line');

    svg
      .append('line')
      .style('stroke', 'blue')
      .style('stroke-width', 2)
      .attr('x1', 0)
      .attr('y1', height)
      .attr('x2', xScale(lineEndpoint[0]))
      .attr('y2', yScale(lineEndpoint[1]));


    svg
      .selectAll('.global-point')
      .data(globalDataArray)
      .join('circle')
      .attr('class', 'global-point')
      .attr('cy', globalDataArray => yScale(globalDataArray[1]))
      .attr('r', 5)
      .style('fill', '#223493')
      .attr('opacity', 0.8)
      .on('mouseenter', function(value) {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join('text')
          .attr('class', 'tooltip')
          .attr('r', 10)
          .text('(' + value + ')')
          .attr('x', xScale(value[0]) + 5)
          .attr('y', yScale(value[1]) - 5)
          .style('fill', '#f5f5f5')
          .style('font-size', 'larger')
          .style('font-weight', 'bolder')
          .transition()
          .duration(500)
          .attr('y', yScale(value[1]) - 10);
        // .attr('opacity', 1);
        select(this)
          // .transition()
          // .duration(500)
          .attr('r', 10);
      })
      .on('mouseleave', function(){
        select(this).attr('r', 5);
        svg.select('.tooltip').remove();
      })
      .transition()
      .duration(2000)
      .attr('cx', globalDataArray => xScale(globalDataArray[0]))
      .attr('cy', globalDataArray => yScale(globalDataArray[1]));

    svg
      .selectAll('.user-point')
      .data(userDataPointsArray)
      .join('circle')
      .attr('class', 'user-point')
      .attr('r', 5)
      .style('fill', '#f5f5f5')
      .attr('opacity', 0.8)
      .on('mouseenter', function(value) {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join('text')
          .attr('class', 'tooltip')
          .attr('r', 10)
          .text('(' + value + ')')
          .attr('x', xScale(value[0]) + 5)
          .attr('y', yScale(value[1]) - 5)
          .style('fill', '#f5f5f5')
          .style('font-size', 'larger')
          .style('font-weight', 'bolder')
          .transition()
          .duration(500)
          .attr('y', yScale(value[1]) - 10);
        // .attr('opacity', 1);
        select(this)
          .transition()
          .duration(500)
          .attr('r', 10);
      })
      .on('mouseleave', function(){
        select(this).attr('r', 5);
        svg.select('.tooltip').remove();
      })
      .transition()
      .delay(1500)
      .duration(1500)
      .attr('cx', userDataPointsArray => xScale(userDataPointsArray[0]))
      .attr('cy', userDataPointsArray => yScale(userDataPointsArray[1]));

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));

    svg
      .select('.y-axis')
      .call(axisLeft(yScale));

    
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
  stats: PropTypes.object.isRequired,
};

export default CircumferenceVsDiameterGraph;
