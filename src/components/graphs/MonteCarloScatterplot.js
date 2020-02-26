import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from './Scatterplot.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import CSVButton from '../common/CSVButton';

export const MonteCarloScatterplot = ({ data }) => {

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
    const circleDiameter = 1;

    const xScale = scaleLinear()
      .domain([0, circleDiameter + 0.1])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, circleDiameter + 0.1])
      .range([width, 0]);

    svg
      .selectAll('rect')
      .remove();

    svg
      .selectAll('circle')
      .remove();

    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', width * 0.09)
      .attr('width', width * 0.91)
      .attr('height', width * 0.91)
      .style('fill', 'rgb(109, 152, 160)')
      .attr('stroke', 'rgb(21, 27, 49)')
      .attr('stroke-width', '2');

    svg
      .append('circle')
      .attr('cx', data => xScale(circleDiameter / 2))
      .attr('cy', data => yScale(circleDiameter / 2))
      .attr('r', width * 0.91 / 2)
      .style('fill', 'rgb(109, 121, 160)')
      .attr('stroke', 'rgb(21, 27, 49)')
      .attr('stroke-width', '2');

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
    console.log(data);

  }, [data, dimensions]);

  return (
    <>
      <div className={Styles.container} ref={wrapperRef}>
        <svg className={Styles.svg} ref={svgRef}>
          <g className={'x-axis'}></g>
          <g className={'y-axis'}></g>
        </svg>
      </div>
      <CSVButton data={data} header1='x' header2='y'/>
    </>
  );
};

MonteCarloScatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired
};

