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

const ScatterplotPiApprox = ({ data, xMax, yMax, title, xLabel, yLabel }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const wrapper = select(wrapperRef.current);
    wrapper.style('height', `${1 / 2 * width}px`);

    const pxX = width;
    const pxY = 1 / 2 * pxX;
    
    svg
      .attr('viewBox', `0 ${-pxY * 0.2} ${pxX} ${pxY + pxY * 0.5}`);

    const scX = scaleLinear()
      .domain([0, xMax + xMax / 15])
      .range([0, pxX]);

    const scY = scaleLinear()
      .domain([0, yMax + yMax / 15])
      .range([pxY, 0]);

    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cy', data => scY(data[1]))
      .attr('r', 3)
      .style('fill', 'whitesmoke')
      .on('mouseenter', function(value) {
        select(this)
          .attr('r', 10);
        svg
          .selectAll('.tooltip')
          .data([value])
          .join('text')
          .attr('class', 'tooltip')
          .attr('r', 10)
          .text('(' + value + ')')
          .attr('x', scX(value[0]) + 5)
          .attr('y', scY(value[1]) - 5)
          .attr('stroke', '#212E59')
          .attr('stroke-width', '2')
          .style('fill', 'white')
          .style('font-size', '2em')
          .style('font-weight', '900')
          .transition()
          .duration(500)
          .attr('y', scY(value[1]) - 10);

      })
      .on('mouseleave', function(){
        select(this).attr('r', 3);
        svg.select('.tooltip').remove();
      })
      .transition()
      .duration(1000)
      .attr('cx', data => scX(data[0]));

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${pxY})`)
      .transition()
      .duration(1000)
      .call(axisBottom(scX))
      .attr('font-size', '1vh');

    svg
      .select('.y-axis')
      .transition()
      .duration(1000)
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
    </div>
  );
};

ScatterplotPiApprox.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  title: PropTypes.number.isRequired,
  xLabel: PropTypes.number.isRequired,
  yLabel: PropTypes.number.isRequired
};

export default ScatterplotPiApprox;
