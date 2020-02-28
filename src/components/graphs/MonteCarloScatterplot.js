import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from '../../containers/MonteCarlo.css';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

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

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${width}px`);


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
      .style('fill', '#7dc4b8')
      .style('opacity', 0.25)
      .attr('stroke', 'rgb(21, 27, 49)')
      .attr('stroke-width', '2');

    svg
      .append('circle')
      .attr('cx', data => xScale(circleDiameter / 2))
      .attr('cy', data => yScale(circleDiameter / 2))
      .attr('r', width * 0.91 / 2)
      .style('fill', '#a4a6c9')
      .style('opacity', 0.5)
      .attr('stroke', 'rgb(21, 27, 49)')
      .attr('stroke-width', '2');

    svg
      .selectAll('.points')
      .data(data)
      .join('circle')
      .attr('cx', data => xScale(data[0]))
      .attr('cy', data => yScale(data[1]))
      .attr('r', 3)
      .attr('class', 'points')
      .attr('stroke', '#212e59')
      .attr('stroke-width', '1')
      .style('fill', '#223493');

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${width})`)
      .call(axisBottom(xScale));

    svg
      .select('.y-axis')
      .call(axisLeft(yScale));

  }, [data, dimensions]);


  return (
    <>
      <div className={Styles.container} ref={wrapperRef}>
        <svg className={Styles.svg} ref={svgRef}>
          <g className={'x-axis'}></g>
          <g className={'y-axis'}></g>
        </svg>
      </div>
    </>
  );
};

MonteCarloScatterplot.propTypes = {
  data: PropTypes.array.isRequired
};

