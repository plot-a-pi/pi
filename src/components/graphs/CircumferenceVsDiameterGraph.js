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
    globalDataArray = data.filter(point=> (!userPointIds.includes(point.pointId))).map(point => [point.diameter.toFixed(2), point.circumference.toFixed(2)]);
    userDataPointsArray = data.filter(point => userPointIds.includes(point.pointId)).map(point => [point.diameter.toFixed(2), point.circumference.toFixed(2)]);
  }

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const pxX = width;
    const pxY = 2 / 3 * pxX;

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${pxY}px`);

    svg
      .attr('viewBox', `0 ${-pxY * 0.2} ${pxX} ${pxY + pxY * 0.5}`);

    const lineEndpoint = stats.mean < stats.circumferenceMax / stats.diameterMax ? [stats.diameterMax, stats.mean * stats.diameterMax] : [stats.circumferenceMax / stats.mean, stats.circumferenceMax];

    const scX = scaleLinear()
      .domain([0, stats.diameterMax + stats.diameterMax / 50])
      .range([0, pxX]);

    const scY = scaleLinear()
      .domain([0, stats.circumferenceMax + stats.diameterMax / 50])
      .range([pxY, 0]);

    svg
      .selectAll('line')
      .remove('line');

    svg
      .append('line')
      .style('stroke', 'blue')
      .style('stroke-width', 2)
      .attr('x1', 0)
      .attr('y1', height)
      .attr('x2', scX(lineEndpoint[0]))
      .attr('y2', scY(lineEndpoint[1]));


    svg
      .selectAll('.global-point')
      .data(globalDataArray)
      .join('circle')
      .attr('class', 'global-point')
      .attr('cy', globalDataArray => scY(globalDataArray[1]))
      .attr('r', 4)
      .style('fill', '#223493')
      .attr('opacity', 0.8)
      .on('mouseenter', function(value) {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join('text')
          .attr('class', 'tooltip')
          .attr('r', 8)
          .text('(' + value + ')')
          .attr('x', scX(value[0]) + 5)
          .attr('y', scY(value[1]) - 5)
          .attr('stroke', 'white')
          .attr('stroke-width', '.5')
          .style('fill', '#212E59')
          .style('font-size', 'x-large')
          .style('font-weight', '900')
          .transition()
          .duration(500)
          .attr('y', scY(value[1]) - 10);
        select(this)
          .attr('r', 8);
      })
      .on('mouseleave', function(){
        select(this).attr('r', 4);
        svg.select('.tooltip').remove();
      })
      .transition()
      .duration(2000)
      .attr('cx', globalDataArray => scX(globalDataArray[0]))
      .attr('cy', globalDataArray => scY(globalDataArray[1]));

    svg
      .selectAll('.user-point')
      .data(userDataPointsArray)
      .join('circle')
      .attr('class', 'user-point')
      .attr('r', 8)
      .style('fill', '#99CCFF')
      .attr('opacity', 0.8)
      .on('mouseenter', function(value) {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join('text')
          .attr('class', 'tooltip')
          .text('(' + value + ')')
          .attr('x', scX(value[0]) + 5)
          .attr('y', scY(value[1]) - 5)
          .attr('stroke', 'white')
          .attr('stroke-width', '.5')
          .style('fill', '#212E59')
          .style('font-size', 'x-large')
          .style('font-weight', '900')
          .transition()
          .duration(500)
          .attr('y', scY(value[1]) - 10);
        select(this)
          .attr('r', 12);
      })
      .on('mouseleave', function(){
        select(this).attr('r', 8);
        svg.select('.tooltip').remove();
      })
      .transition()
      .delay(1500)
      .duration(1500)
      .attr('cx', userDataPointsArray => scX(userDataPointsArray[0]))
      .attr('cy', userDataPointsArray => scY(userDataPointsArray[1]));

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(scX));

    svg
      .select('.y-axis')
      .call(axisLeft(scY));

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(scX))
      .attr('font-size', '1vh');

    svg
      .select('.y-axis')
      .call(axisLeft(scY))
      .attr('font-size', '1vh');

    svg
      .select('.title')
      .attr('transform', `translate(${pxX / 2}, ${-pxY * 0.07})`)
      .attr('font-family', 'Arial')
      .attr('font-size', '3vw')
      .style('text-anchor', 'middle');

    svg
      .select('.x-label')
      .attr('transform', `translate(${pxX / 2}, ${pxY + pxY * 0.2})`)
      .attr('font-family', 'Arial')
      .attr('font-size', '2vw')
      .style('text-anchor', 'middle');

    svg
      .select('.y-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -pxX * 0.1)
      .attr('x', -pxY / 2)
      .attr('font-family', 'Arial')
      .attr('font-size', '2vw')
      .style('text-anchor', 'middle');



  }, [dimensions, data, stats]);

  return (
    <>
      <div className={styles.container} ref={wrapperRef}>
        <svg className={styles.svg} ref={svgRef}>
          <text className={'title'} fill='#212E59'>Global Circle Measurement Data</text>
          <g className={'x-axis'}></g>
          <text className={'x-label'} fill='#212E59'>Diameter (in)</text>
          <g className={'y-axis'}></g>
          <text className={'y-label'} fill='#212E59'>Circumference (in)</text>
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
