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

const Scatterplot = ({ data, xMax, yMax }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const [currentZoomState, setCurrentZoomState] = useState();

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    if(!dimensions) return;

    const xScale = scaleLinear()
      .domain([0, xMax])
      .range([0, width]);

    if(currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      xScale.domain(newXScale.domain());
    }

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
      .duration(2000)
      .attr('cx', data => xScale(data[0]))




    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));

    svg
      .select('.y-axis')
      .transition()
      .duration(2000)
      .attr('opacity', '1')
      .call(axisLeft(yScale));


    const zoomBehavior = zoom()
      .scaleExtent([0, 5])
      .translateExtent([[0, 0], [width + 50, height]]).on('zoom', () => {
      })
      .on('zoom', () => {
        const zoomState = zoomTransform(svg.node());
        setCurrentZoomState(zoomState);
      });

    svg.call(zoomBehavior);

  }, [data, dimensions, currentZoomState]);

  return (
    <div className={Styles.container} ref={wrapperRef} style={{ marginBottom: '2em' }}>
      <svg className={Styles.svg} ref={svgRef}>
        <g className={'x-axis'}></g>
        <g className={'y-axis'}></g>
        <g className={'data'}></g>
      </svg>
    </div>
  );
};
// move this logic of axis labels and title to a graph container component to avoid re-render in different place

// add title

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
  yMax: PropTypes.number.isRequired
};

//export default Scatterplot;
export default Scatterplot;
