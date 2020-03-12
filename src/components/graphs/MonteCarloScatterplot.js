import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { scaleLinear, select, axisBottom, axisLeft } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import styles from './MonteCarloScatterplot.css';

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

    svg
      .attr('viewBox', `${-width * 0.15} ${-width * 0.15} ${width * 1.2} ${width * 1.3}`);

    const xScale = scaleLinear()
      .domain([0, circleDiameter])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, circleDiameter])
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
      .attr('y', 0)
      .attr('width', width)
      .attr('height', width)
      .style('fill', '#7dc4b8')
      .style('opacity', 0.25)
      .attr('stroke', 'rgb(21, 27, 49)')
      .attr('stroke-width', '2');

    svg
      .append('circle')
      // eslint-disable-next-line no-unused-vars
      .attr('cx', data => xScale(circleDiameter / 2))
      // eslint-disable-next-line no-unused-vars
      .attr('cy', data => yScale(circleDiameter / 2))
      .attr('r', width / 2)
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
      .transition()
      .duration(1000)
      .call(axisBottom(xScale))
      .attr('font-size', '1vh');

    svg
      .select('.y-axis')
      .transition()
      .duration(1000)
      .call(axisLeft(yScale))
      .attr('font-size', '1vh');

    svg
      .select('.title')
      .attr('transform', `translate(${width / 2}, ${-width * 0.07})`)
      .attr('font-family', 'Arial')
      .attr('font-size', '3vw')
      .style('text-anchor', 'middle');

    svg
      .select('.x-label')
      .attr('transform', `translate(${width / 2}, ${width * 1.1})`)
      .attr('font-family', 'Arial')
      .attr('font-size', '2vw')
      .style('text-anchor', 'middle');

    svg
      .select('.y-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -width * 0.1)
      .attr('x', -width / 2)
      .attr('font-family', 'Arial')
      .attr('font-size', '2vw')
      .style('text-anchor', 'middle');



  }, [data, dimensions]);


  return (
    <>
      <div className={styles.container} ref={wrapperRef}>
        <svg className={styles.svg} ref={svgRef}>
          <text className={'title'} fill='#212E59'>Randomly Generated Darts</text>
          <g className={'x-axis'}></g>
          <text className={'x-label'} fill='#212E59'>x</text>
          <g className={'y-axis'}></g>
          <text className={'y-label'} fill='#212E59'>y</text>
        </svg>
      </div>
    </>
  );
};

MonteCarloScatterplot.propTypes = {
  data: PropTypes.array.isRequired
};

