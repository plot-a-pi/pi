/* eslint-disable babel/no-invalid-this */
import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from './Scatterplot.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
// enables functionality in additional browsers
import ResizeObserver from 'resize-observer-polyfill';
import CSVButton from '../common/CSVButton';

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

const Scatterplot = ({ data, xMax, title, xLabel, yLabel }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${0.55 * width}px`);

    const pxX = width;
    const pxY = 1 / 3 * pxX;

    const pointSize = width / 500 + 1; 
    
    svg
      .attr('viewBox', `${-pxX * 0.18} ${-pxY * 0.22} ${pxX * 1.2} ${pxY * 1.5}`);

    const scX = scaleLinear()
      .domain([1, xMax + xMax / 30])
      .range([0, pxX]);

    const scY = scaleLinear()
      .domain([2, 4])
      .range([pxY, 0]);

    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', data => scX(data[0]))
      .attr('cy', data => scY(data[1]))
      .attr('r', pointSize)
      .style('fill', '#f5f5f5')
      .attr('opacity', 0.9)
      .on('mouseenter', function(datum){
        select(this)
          .attr('r', pointSize * 5);
        svg
          .selectAll('.tooltip')
          .data([datum])
          .join('text')
          .attr('class', 'tooltip')
          .attr('r', 10)
          .text('(' + datum + ')')
          .attr('stroke', '#f5f5f5')
          .attr('stroke-width', '.5')
          .style('fill', 'white')
          .style('font-size', '4.7vw')
          .style('font-weight', '900')
          .transition()
          .duration(500)
          .style('font-size', '5vw')
          .attr('x', '24vw')
          .attr('y', '6.5vw');

      })
      .on('mouseleave', function() {
        select(this)
          .transition()
          .duration(500)
          .attr('r', pointSize)
          .style('font-size', '5vw');
        svg.select('.tooltip').remove();
      });
      


    svg
      .select('.y-axis')
      .transition()
      .duration(1000)
      .call(axisLeft(scY).tickSize(pointSize * 3))
      .attr('font-size', '2vh');

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${pxY})`)
      .transition()
      .duration(1000)
      .call(axisBottom(scX).tickSize(pointSize * 3))
      .attr('font-size', '2vh');

    svg
      .select('.title')
      .attr('transform', `translate(${pxX / 2.25}, ${-pxY * 0.1})`)
      .attr('font-family', 'Arial')
      .attr('font-size', '4vw')
      .style('text-anchor', 'middle');

    svg
      .select('.x-label')
      .attr('transform', `translate(${pxX / 2}, ${pxY * 1.27})`)
      .attr('font-family', 'Arial')
      .attr('font-size', '3vw')
      .style('text-anchor', 'middle');

    svg
      .select('.y-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -pxX * 0.1)
      .attr('x', -pxY / 2)
      .attr('font-family', 'Arial')
      .attr('font-size', '3vw')
      .style('text-anchor', 'middle');

    svg
      .select('.x-axis')
      .selectAll('text')
      .attr('font-size', '3vw')
      .filter((d, i) => i % 2 === 0)
      .attr('visibility', 'hidden');

    svg
      .select('.y-axis')
      .selectAll('text')
      .attr('font-size', '3vw')
      .filter((d, i) => i % 2 === 1)
      .attr('visibility', 'hidden');

    svg
      .selectAll('.tick')
      .select('line')
      .attr('stroke-width', pointSize * 1);

  }, [data, dimensions]);

  return (
    <div className={Styles.container} ref={wrapperRef}>
      <svg className={Styles.svg} ref={svgRef}>
        <text className={'title'} fill='whitesmoke'>{title}</text>
        <g className={'x-axis'}></g>
        <text className={'x-label'} fill='whitesmoke'>{xLabel}</text>
        <g className={'y-axis'}></g>
        <text className={'y-label'} fill='whitesmoke'>{yLabel}</text>
        
        
      </svg>
      <CSVButton header1={xLabel} header2={yLabel} data={data} />
    </div>
  );
};

Scatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired
};

export default Scatterplot;
