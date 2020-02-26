import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from './Scatterplot.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

export const MonteCarloScatterplot = ({ data, xMax, yMax }) => {

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

  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${width}px`);


    const xScale = scaleLinear()
      .domain([0, xMax])
      .range([0, width]);
    
    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([width, 0]);
      
    svg
      .selectAll('rect')
      .remove();
      
    svg
      .selectAll('circle')
      .remove();
      
    svg
      .select('.title')
      .select('text')
      .remove();
    svg
      .select('.x-label')
      .select('text')
      .remove();
    svg
      .select('.y-label')
      .select('text')
      .remove();
      
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', width)
      .style('fill', 'rgb(109, 152, 160)')
      .style('opacity', 0.25);
      
    svg
      .append('circle')
      .attr('cx', data => xScale(0.5))
      .attr('cy', data => yScale(0.5))
      .attr('r', width / 2)
      .style('fill', 'rgb(109, 121, 160)')
      .style('opacity', 0.5);
      
    svg
      .selectAll('.points')
      .data(data)
      .join('circle')
      .attr('cx', data => xScale(data[0]))
      .attr('cy', data => yScale(data[1]))
      .attr('r', 4)
      .attr('class', 'points')
      .attr('stroke', 'rgb(21, 27, 49)')
      .attr('stroke-width', '2')
      .style('fill', 'rgb(58, 78, 153)');
      
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${width})`)
      .call(axisBottom(xScale));
      
    svg
      .select('.y-axis')
      .call(axisLeft(yScale));

    svg.select('.title')
      .append('text')
      .attr('transform', 'translate(' + (xScale(xMax) / 2) + ' ,' + -2 + ')')
      .style('text-anchor', 'middle')
      .text('Monte Carlo');

    svg.select('.x-label')
      .append('text')
      .attr('x', xScale(xMax / 2))
      .attr('y', 50 + yScale(yMax / 100))
      .style('text-anchor', 'middle')
      .text('x');
    
    svg.select('.y-label')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50 + yScale(yMax) / 10)
      .attr('x', 0 - yScale(yMax / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('y');
      
  }, [data, dimensions]);


  return (
    <div className={Styles.container} ref={wrapperRef}>
      <svg className={Styles.svg} ref={svgRef}>
        <g className={'title'}></g>
        <g className={'x-label'}></g>
        <g className={'x-axis'}></g>
        <g className={'y-label'}></g>
        <g className={'y-axis'}></g>
        <g className={'data'}></g>
      </svg>
    </div>
  );
};

MonteCarloScatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired
};

