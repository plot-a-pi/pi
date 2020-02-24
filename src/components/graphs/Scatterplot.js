import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Styles from './Scatterplot.css';
import { scaleLinear, select, axisBottom, axisLeft, zoom, zoomTransform } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

// set constant for other browsers

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

const Scatterplot = ({ data, xMax, yMax, title }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const [currentZoomState, setCurrentZoomState] = useState();

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    svg.append('text')
      .attr('text-anchor', 'middle')   
      .attr('x', width / 2)
      .attr('y', 30)
      .text(title);

    const xScale = scaleLinear()
      .domain([0, xMax])
      .range([0, width - 10]);

    if(currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      xScale.domain(newXScale.domain());
    }

    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([height - 10, 0]);

    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', data => xScale(data[0]))
      .attr('cy', data => yScale(data[1]))
      .attr('r', 1.5)
      .style('fill', '#000000');

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));

    svg
      .select('.y-axis')
      .call(axisLeft(yScale));

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([[-100, 0], [width + 100, height]]).on('zoom', () => {
      })
      .on('zoom', () => {
        const zoomState = zoomTransform(svg.node());
        setCurrentZoomState(zoomState);
      });
      
    svg.call(zoomBehavior);
    
  }, [data, dimensions, currentZoomState]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2em' }}>
      <svg className={Styles.svg} ref={svgRef}>
        <g className={'x-axis'}></g>
        <g className={'y-axis'}></g>
        <g className={'data'}></g>
      </svg>
    </div>
  );
};

// svg
//   .append('svg')
//   .attr('width', width + margin.left + margin.right)
//   .attr('height', height + margin.top + margin.bottom)
//   .append('g')
//   .attr('transform',
//     'translate(' + margin.left + ',' + margin.top + ')');
      
// svg.append('text')
//   .attr('text-anchor', 'middle')   
//   .attr('x', width / 2)
//   .attr('y', 30)
//   .text(title);
    
// // add x-axis label
// svg.append('text')
//   .attr('transform', 'translate(' + (width / 2) + ' ,' + (height + margin.bottom) + ')')
//   .style('text-anchor', 'middle')
//   .text(xLabel);

// // add y-axis label (rotated)
// svg.append('text')
//   .attr('transform', 'rotate(-90)')
//   .attr('y', 0 - margin.left)
//   .attr('x', 0 - (height / 2))
//   .attr('dy', '1em')
//   .style('text-anchor', 'middle')
//   .text(yLabel);

Scatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  xMax: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  // xLabel: PropTypes.string.isRequired,
  // yLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

//export default Scatterplot;
export default Scatterplot;
