import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from './Scatterplot.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

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

const Scatterplot = ({ data, xMax, yMax, xLabel, yLabel, title }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;
    
    const removeLabelText = (svg, args) => {
      return args.map(arg => {
        svg.select(arg)
          .select('text')
          .remove();
      }); 
    };

    removeLabelText(svg, ['.y-label', '.x-label', '.title']);
        
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
      .attr('cy', data => yScale(data[1]))
      .attr('r', 5)
      .style('fill', 'orange')
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
          .transition()
          .duration(500)
          .attr('y', yScale(value[1]) - 10)
          .attr('opacity', 1);
        select(this)
          .transition()
          .duration(500)
          .attr('r', 10);
      })
      .on('mouseleave', function(){
        svg.select('.tooltip').remove();
        select(this).attr('r', 5);
      })
      .transition()
      .duration(1000)
      .attr('cx', data => xScale(data[0]));

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .transition()
      .duration(1000)
      .call(axisBottom(xScale));
      
    svg
      .select('.y-axis')
      .transition()
      .duration(1000)
      .attr('opacity', '1')
      .call(axisLeft(yScale));

    svg.select('.title')
      .append('text')
      .attr('transform', 'translate(' + (xScale(xMax) / 2) + ' ,' + -2 + ')')
      .style('text-anchor', 'middle')
      .text(title);

    svg.select('.x-label')
      .append('text')
      .attr('transform', 'translate(' + (xScale(xMax) / 2) + ' ,' + (yMax + yMax / 2.5) + ')')
      .style('text-anchor', 'middle')
      .text(xLabel);
    
    svg.select('.y-label')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50 + yScale(yMax) / 10)
      .attr('x', 0 - yMax / 1.5)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(yLabel);
    
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

Scatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  title: PropTypes.string
};

//export default Scatterplot;
export default Scatterplot;
