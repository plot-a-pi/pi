import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from './Scatterplot.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

const pointRadius = (length) => {
  return Math.max(1, 5 - (Math.floor(length / 100)));
};

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

const Scatterplot = ({ data, xMax, yMax }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

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
      .attr('cy', data => yScale(data[1]))
      .attr('r', pointRadius(data.length))
      // .attr('stroke', '#212e59')
      // .attr('stroke-width', '1')
      .style('fill', '#f5f5f5')
      .attr('opacity', 0.5)
      .on('mouseenter', function(value) {
        select(this)
          // .transition()
          // .duration(500)
          .attr('r', 10);
        svg
          .selectAll('.tooltip')
          .data([value])
          .join('text')
          .attr('class', 'tooltip')
          .attr('r', 10)
          .text('(' + value + ')')
          .attr('x', xScale(value[0]) + 5)
          .attr('y', yScale(value[1]) - 5)
          .style('fill', '#223493')
          .style('font-size', 'larger')
          .style('font-weight', 'bolder')
          .transition()
          .duration(500)
          .attr('y', yScale(value[1]) - 10);
        // .attr('opacity', 1);
      })
      .on('mouseleave', function(){
        select(this).attr('r', 5);
        svg.select('.tooltip').remove();
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
      // .attr('opacity', '1')
      .call(axisLeft(yScale));

  }, [data, dimensions]);

  return (
    <div className={Styles.container} ref={wrapperRef}>
      <svg className={Styles.svg} ref={svgRef}>
        <g className={'x-axis'}></g>
        <g className={'y-axis'}></g>
        <g className={'data'}></g>
      </svg>
    </div>
  );
};

Scatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired
};

export default Scatterplot;
